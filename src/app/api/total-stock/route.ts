import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongoose"; // or "@/lib/mongoose" if that's your file
import TotalStock from "../../models/TotalStock";

export async function GET() {
  try {
    await connectDB();

    const totals = await TotalStock.find({});
    return NextResponse.json({ totals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching total stock:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}