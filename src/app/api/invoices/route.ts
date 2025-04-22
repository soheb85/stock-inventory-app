import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import PartnerTransaction from "../../models/Invoices";
import StockModel from "../../models/TotalStock"; // Your stock model
import PartnerModel from "../../models/Partners";

export async function GET() {
  await connectDB();
  const transactions = await PartnerTransaction.find();
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
    await connectDB();
    const { partner, items } = await req.json();
  
    // Generate TID
    const count = await PartnerTransaction.countDocuments();
    const tid = `TXN${String(count + 1).padStart(2, "0")}`;
  
    // Deduct stock for each item
    for (const { item, quantity } of items) {
      await StockModel.updateOne(
        { item },
        { $inc: { totalQuantity: -quantity } }
      );
    }
  
    // Save transaction
    const newTxn = await PartnerTransaction.create({
      tid,
      partner,
      items,
    });
  
    return NextResponse.json({
      success: true,
      tid,
      partner: partner.name || partner.pid || partner, // optional: return readable name
      items: items.map(({ item, quantity }) => ({ item, quantity })),
    });
  }
  