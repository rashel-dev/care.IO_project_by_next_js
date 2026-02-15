import mongoose, { Schema, Model } from "mongoose";

export interface IBooking {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  serviceId: string;
  serviceName: string;
  duration: {
    type: 'hours' | 'days';
    value: number;
  };
  location: {
    division: string;
    district: string;
    city: string;
    area: string;
    address: string;
  };
  totalCost: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt?: string;
  updatedAt?: string;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },
    duration: {
      type: {
        type: String,
        enum: ['hours', 'days'],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    location: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      area: { type: String, required: true },
      address: { type: String, required: true },
    },
    totalCost: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
