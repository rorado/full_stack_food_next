import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const sizes = await db.size.findMany();

  return NextResponse.json(sizes);
}
