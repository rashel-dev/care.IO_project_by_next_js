import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import { sendInvoiceEmail } from "@/lib/email";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { serviceId, serviceName, duration, location, totalCost } = await req.json();

    await dbConnect();

    // Convert userId to ObjectId if it's a string
    let userId: mongoose.Types.ObjectId;
    try {
      userId = new mongoose.Types.ObjectId(session.user.id);
    } catch (error) {
      // If conversion fails, try to find user by email and use their _id
      const User = (await import("@/models/User")).default;
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      userId = user._id as mongoose.Types.ObjectId;
    }

    const newBooking = new Booking({
      userId: userId,
      serviceId,
      serviceName,
      duration,
      location,
      totalCost,
      status: 'Confirmed', // Mark as paid/confirmed when payment button is clicked
    });

    await newBooking.save();

    // Send invoice email
    if (session.user.email) {
      try {
        await sendInvoiceEmail(session.user.email, newBooking);
      } catch (err) {
        console.error("Email error:", err);
      }
    }

    return NextResponse.json({ message: "Booking created successfully", booking: newBooking }, { status: 201 });
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      await dbConnect();
  
      // Convert userId to ObjectId if it's a string
      let userId: mongoose.Types.ObjectId;
      try {
        userId = new mongoose.Types.ObjectId(session.user.id);
      } catch (error) {
        // If conversion fails, try to find user by email and use their _id
        const User = (await import("@/models/User")).default;
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
          return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        userId = user._id as mongoose.Types.ObjectId;
      }
  
      const bookings = await Booking.find({ userId: userId }).sort({ createdAt: -1 });
  
      return NextResponse.json(bookings);
    } catch (error: any) {
      return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
    }
  }
