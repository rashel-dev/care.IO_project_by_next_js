import mongoose, { connect } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Mongo uri is not found");
}

// global is used here to maintain a cached connection across hot reloads
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Connects to MongoDB using Mongoose. If a connection already exists, it returns the existing connection.

const dbConnect = async () => {
  if (cached.conn) {
    console.log("database is connected using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("database is connecting");
    cached.promise = connect(MONGO_URI).then(c => c.connection);
  }

  try {
    console.log("database is connecting");
    cached.conn = await cached.promise;
    console.log("database is connected");
  } catch (error) {
    console.log("database connection error");
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
