// models/TotalStock.ts
import mongoose, { Schema } from "mongoose";

const totalStockSchema = new Schema({
  item: { type: String, required: true, unique: true },
  totalQuantity: { type: Number, required: true },
});

const TotalStock = mongoose.models.TotalStock || mongoose.model("TotalStock", totalStockSchema);

export default TotalStock;