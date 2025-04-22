import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Stock from "../../models/Stock";
import PartnerTransaction from "../../models/Invoices";
import TotalStock from "../../models/TotalStock"; // Import the TotalStock model

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Step 1: Calculate totalIn from Stock collection (based on status "IN")
    const allStocks = await Stock.find({});
    let totalIn = 0;

    for (const stock of allStocks) {
      const quantities = Array.from(stock.items.values()).reduce((a, b) => a + b, 0);
      if (stock.status === "IN") {
        totalIn += quantities;
      }
    }

    // Step 2: Get the total stock quantities for each item
    const totalStocks = await TotalStock.find({});
    const totalStockMap = totalStocks.reduce((map, stock) => {
      map[stock.item] = stock.totalQuantity;
      return map;
    }, {}); // This will map each item to its totalQuantity

    // Step 3: Calculate totalOut by summing quantities from PartnerTransaction
    let totalOut = 0;

    const transactions = await PartnerTransaction.find({});
    for (const txn of transactions) {
      for (const item of txn.items) {
        totalOut += item.quantity;
      }
    }

    // Step 4: Calculate remaining stock for each item
    

    return NextResponse.json({
      totalIn,
      totalOut,
      
    });
  } catch (error) {
    console.error("Error calculating totals:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}



