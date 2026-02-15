import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { sendInvoiceEmail } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret as string);
  } catch (err: any) {
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata) {
      await dbConnect();
      
      const newBooking = new Booking({
        userId: metadata.userId,
        serviceId: metadata.serviceId,
        serviceName: metadata.serviceName,
        duration: {
          type: metadata.durationType,
          value: Number(metadata.durationValue),
        },
        location: {
          division: metadata.division,
          district: metadata.district,
          city: metadata.city,
          area: metadata.area,
          address: metadata.address,
        },
        totalCost: Number(metadata.totalCost),
        status: 'Confirmed', // Payment successful, so mark as confirmed
      });

      await newBooking.save();

      // Send invoice email
      const user = await User.findById(metadata.userId);
      if (user && user.email) {
        await sendInvoiceEmail(user.email, newBooking);
      }
    }
  }

  return NextResponse.json({ received: true });
}
