import mongoose, { Schema } from "mongoose";

// Define the stock schema
const stockSchema = new Schema(
  {
    items: {
      type: Map,
      of: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['IN', 'OUT'],
      required: true,
      default: 'IN'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Create the Stock model
const Stock = mongoose.models.Stock || mongoose.model('Stock', stockSchema);

export default Stock;
