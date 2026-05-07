import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);