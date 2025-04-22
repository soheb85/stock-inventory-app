import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/mongoose";
import Stock from "../../models/Stock";
import TotalStock from "../../models/TotalStock";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { items, status } = body;

    const newStock = new Stock({ items, status });
    await newStock.save();

    for (const [item, quantity] of Object.entries(items)) {
      const existing = await TotalStock.findOne({ item });

      if (existing) {
        existing.totalQuantity += quantity;
        await existing.save();
      } else {
        await TotalStock.create({ item, totalQuantity: quantity });
      }
    }

    return NextResponse.json({ message: "Stock added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving stock:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

