import mongoose, { Schema, Model } from "mongoose";

// IUser Interface

export interface IUser{
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  image?: string;
  password?: string;
  nid?: string;
  contact?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//  User Schema
 
const UserSchema: Schema<IUser> = new Schema(
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
      required: false, // Optional for OAuth (Google) users
      select: false,  // Security: Don't include password in queries by default
    },
    nid: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// User Model

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
