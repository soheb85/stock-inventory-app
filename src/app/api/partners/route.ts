// app/api/partners/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose'; // ← make sure you have db setup
import PartnerModel from '../../models/Partners';

export async function GET() {
  await connectDB();
  const partners = await PartnerModel.find();
  console.log("Partners fetched from DB:", partners);
  return NextResponse.json(partners);
}

export async function POST(request: Request) {
  await connectDB();
  const data = await request.json();

  const partners = await PartnerModel.find();
  const pid = `PTN${String(partners.length + 1).padStart(2, '0')}`;

  const newPartner = await PartnerModel.create({
    pid,
    name: data.name,
  });

  return NextResponse.json(newPartner);
}
