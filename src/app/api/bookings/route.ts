import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import { sendInvoiceEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { serviceId, serviceName, duration, location, totalCost } = await req.json();

    await dbConnect();

    const newBooking = new Booking({
      userId: session.user.id,
      serviceId,
      serviceName,
      duration,
      location,
      totalCost,
      status: 'Pending',
    });

    await newBooking.save();

    // Send invoice email asynchronously
    if (session.user.email) {
      sendInvoiceEmail(session.user.email, newBooking).catch(err => console.error("Email error:", err));
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
  
      const bookings = await Booking.find({ userId: session.user.id }).sort({ createdAt: -1 });
  
      return NextResponse.json(bookings);
    } catch (error: any) {
      return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
    }
  }
