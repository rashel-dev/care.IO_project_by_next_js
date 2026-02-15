import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  image?: string;
  password?: string;
  nid?: string;
  contact?: string;
  role: "user" | "admin";
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    nid: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
