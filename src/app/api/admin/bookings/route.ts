import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
