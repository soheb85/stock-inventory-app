// /app/api/transactions/route.ts

import { connectDB } from "@/lib/mongoose";
import Stock from "../../models/Stock";
import PartnerTransaction from "../../models/Invoices";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const inStocks = await Stock.find({ status: "IN" }).sort({ createdAt: 1 });
  const outTxns = await PartnerTransaction.find({}).sort({ date: 1 });

  let allTransactions: any[] = [];

  // 🟢 Process IN Stocks
  inStocks.forEach((stock, index) => {
    const items = Object.fromEntries(stock.items);
    allTransactions.push({
      invoice: `INV${String(index + 1).padStart(3, "0")}`,
      partner: "Added Stock",
      date: stock.createdAt,
      items,
      status: "IN",
    });
  });

  const offset = inStocks.length;

  // 🔴 Process OUT Transactions
  outTxns.forEach((txn, index) => {
    const items: any = {};
    txn.items.forEach((item: any) => {
      items[item.item] = item.quantity;
    });

    allTransactions.push({
      invoice: `INV${String(offset + index + 1).padStart(3, "0")}`,
      partner: txn.partner?.name || "Unknown",
      date: txn.date,
      items,
      status: "OUT",
    });
  });

  // 📅 Sort All By Date
  allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json(allTransactions);
}
