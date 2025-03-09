import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const categories = await db.category.findMany({
    include: {
      products: true,
    },
  });

  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }

    const existingCategory = await db.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    }

    const newCategory = await db.category.create({
      data: { name },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { categoryId } = body;
  try {
    if (!categoryId) {
      return NextResponse.json(
        { message: "category id is required" },
        { status: 400 }
      );
    }
    const existingCategory = await db.category.findFirst({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 }
      );
    }

    const DeletCategory = await db.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json(DeletCategory, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Network error" }, { status: 500 });
  }
}
