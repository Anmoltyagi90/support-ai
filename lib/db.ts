import mongoose from "mongoose";

const mongo_Url = process.env.MONGODB_URL;

if (!mongo_Url) {
  throw new Error("MONGODB_URL not found");
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDb = async () => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(mongo_Url)
      .then((mongoose) => mongoose.connection);
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.conn;
};

export default connectDb;