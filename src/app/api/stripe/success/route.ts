import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import User from "@/models/User";
import { sendInvoiceEmail } from "@/lib/email";

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

export async function GET(req: NextRequest, _context: { params: Promise<Record<string, never>> }) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/my-bookings?status=missing_session", url.origin));
  }

  try {
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.redirect(new URL("/my-bookings?status=unpaid", url.origin));
    }

    const metadata = checkoutSession.metadata;
    if (!metadata) {
      return NextResponse.redirect(new URL("/my-bookings?status=no_metadata", url.origin));
    }

    await dbConnect();

    let userId: mongoose.Types.ObjectId;
    try {
      userId = new mongoose.Types.ObjectId(metadata.userId as string);
    } catch {
      const user = await User.findOne({ email: checkoutSession.customer_details?.email });
      if (!user) {
        return NextResponse.redirect(new URL("/my-bookings?status=user_not_found", url.origin));
      }
      userId = user._id as mongoose.Types.ObjectId;
    }

    const newBooking = new Booking({
      userId,
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
      status: "Confirmed",
    });

    await newBooking.save();

    const user = await User.findById(userId);
    if (user?.email) {
      sendInvoiceEmail(user.email, newBooking).catch((err) => console.error("Email error:", err));
    }

    return NextResponse.redirect(new URL("/my-bookings?status=success", url.origin));
  } catch (error: any) {
    console.error("Stripe success handler error:", error);
    return NextResponse.redirect(new URL("/my-bookings?status=error", url.origin));
  }
}

