import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27' as any,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { service, bookingData } = await req.json();

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.title,
              description: `${bookingData.durationValue} ${bookingData.durationType} of care`,
              images: [`${process.env.NEXTAUTH_URL}${service.image}`],
            },
            unit_amount: bookingData.totalCost * 100, // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/my-bookings?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/service/${service.id}`,
      metadata: {
        userId: session.user.id,
        serviceId: service.id,
        serviceName: service.title,
        durationValue: bookingData.durationValue,
        durationType: bookingData.durationType,
        division: bookingData.division,
        district: bookingData.district,
        city: bookingData.city,
        area: bookingData.area,
        address: bookingData.address,
        totalCost: bookingData.totalCost,
      },
    });

    return NextResponse.json({ id: checkoutSession.id, url: checkoutSession.url });
  } catch (err: any) {
    console.error("Stripe session error:", err);
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
  }
}
