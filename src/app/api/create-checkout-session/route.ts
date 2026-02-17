import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth";

import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key, {
    typescript: true,
  });
}

export async function POST(req: NextRequest, _context: { params: Promise<Record<string, never>> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      serviceId,
      serviceName,
      serviceImage,
      duration,
      location,
      totalCost,
    } = body;

    if (!serviceId || !serviceName || !duration || !location || !totalCost) {
      return NextResponse.json({ message: "Missing booking/payment data" }, { status: 400 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: "Base URL is not configured" }, { status: 500 });
    }

    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
              description: `${duration.value} ${duration.type} of care`,
              images: serviceImage ? [`${baseUrl}${serviceImage}`] : undefined,
            },
            unit_amount: Math.round(Number(totalCost) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/booking/${serviceId}`,
      metadata: {
        userId: session.user.id,
        serviceId,
        serviceName,
        durationType: duration.type,
        durationValue: String(duration.value),
        division: location.division,
        district: location.district,
        city: location.city,
        area: location.area,
        address: location.address,
        totalCost: String(totalCost),
      },
    });

    return NextResponse.json({ id: checkoutSession.id, url: checkoutSession.url }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}

