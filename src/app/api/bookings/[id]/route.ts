import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
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

    const booking = await Booking.findOne({ _id: id, userId: userId });

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { status } = await req.json();

    if (status !== 'Cancelled') {
         return NextResponse.json({ message: "Invalid status update" }, { status: 400 });
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

    const booking = await Booking.findOneAndUpdate(
      { _id: id, userId: userId },
      { status: 'Cancelled' },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking cancelled successfully", booking });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
