import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const product = await db.product.findMany({
    include: {
      size: true,
      extra: true,
      category: true,
    },
  });

  return NextResponse.json(product);
}
