import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

async function resolveUserObjectId(session: any): Promise<mongoose.Types.ObjectId> {
  // Prefer session.user.id when it's a Mongo ObjectId string
  if (session?.user?.id) {
    try {
      return new mongoose.Types.ObjectId(session.user.id);
    } catch {
      // fall through
    }
  }

  // Fallback: find by email
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser?._id) {
    throw new Error("User not found");
  }

  return dbUser._id as mongoose.Types.ObjectId;
}

export async function GET(_req: NextRequest, _context: { params: Promise<Record<string, never>> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const userId = await resolveUserObjectId(session);

    const user = await User.findById(userId).select("name email image nid contact role");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, _context: { params: Promise<Record<string, never>> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : undefined;
    const image = typeof body?.image === "string" ? body.image.trim() : undefined;
    const nid = typeof body?.nid === "string" ? body.nid.trim() : undefined;
    const contact = typeof body?.contact === "string" ? body.contact.trim() : undefined;

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    // Basic validation / limits
    if (name.length > 80) {
      return NextResponse.json({ message: "Name is too long" }, { status: 400 });
    }
    if (image && image.length > 500) {
      return NextResponse.json({ message: "Image URL is too long" }, { status: 400 });
    }
    if (nid && nid.length > 50) {
      return NextResponse.json({ message: "NID is too long" }, { status: 400 });
    }
    if (contact && contact.length > 30) {
      return NextResponse.json({ message: "Contact is too long" }, { status: 400 });
    }

    await dbConnect();
    const userId = await resolveUserObjectId(session);

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        name,
        image: image || undefined,
        nid: nid || undefined,
        contact: contact || undefined,
      },
      { new: true, runValidators: true }
    ).select("name email image nid contact role");

    if (!updated) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated", user: updated });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}

