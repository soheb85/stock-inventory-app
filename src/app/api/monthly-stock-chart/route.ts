import { connectDB } from "@/lib/mongoose";
import Stock from "../../models/Stock";
import PartnerTransaction from "../../models/Invoices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const allStocks = await Stock.find({});
  const allOutTxns = await PartnerTransaction.find({});

  const monthlyData: { [key: string]: { IN: number; OUT: number } } = {};

  // Handle Stock IN
  for (const stock of allStocks) {
    if (stock.status !== "IN") continue;

    const date = new Date(stock.createdAt);
    const month = date.toLocaleString("default", { month: "long", year: "numeric" });

    const quantity = Array.from(stock.items.values()).reduce((a, b) => a + b, 0);

    if (!monthlyData[month]) {
      monthlyData[month] = { IN: 0, OUT: 0 };
    }

    monthlyData[month].IN += quantity;
  }

  // Handle Stock OUT from Partner Transactions
  for (const txn of allOutTxns) {
    const date = new Date(txn.date); // Use txn.date field
    const month = date.toLocaleString("default", { month: "long", year: "numeric" });

    const quantity = txn.items.reduce((sum: number, item: any) => sum + item.quantity, 0);

    if (!monthlyData[month]) {
      monthlyData[month] = { IN: 0, OUT: 0 };
    }

    monthlyData[month].OUT += quantity;
  }

  // Prepare final chart data
  const chartData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    IN: data.IN,
    OUT: data.OUT
  }));

  return NextResponse.json(chartData);
}
