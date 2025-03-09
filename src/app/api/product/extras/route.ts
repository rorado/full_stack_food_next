import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const extras = await db.extra.findMany();

  return NextResponse.json(extras);
}
