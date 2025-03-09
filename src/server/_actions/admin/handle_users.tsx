"use server";

import { UserRole } from "@/constants/enum";
import { db } from "@/lib/prisma";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

export const usersDelet = async (userEmails: string[]) => {
  const session = await getServerSession(authOptions);

  try {
    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (user?.role != UserRole.ADMIN) {
      return {
        status: 409,
        message: "you are not admin",
      };
    }

    if (!userEmails || userEmails.length === 0) {
      return { status: 400 };
    }

    await db.user.deleteMany({
      where: { email: { in: userEmails } },
    });
  } catch {
    return { status: 500 };
  }
};

export const userDelet = async (userEmail: string) => {
  const session = await getServerSession(authOptions);

  try {
    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (user?.role != UserRole.ADMIN) {
      return {
        status: 409,
        message: "you are not admin",
      };
    }

    await db.user.delete({
      where: { email: userEmail },
    });
  } catch {
    return { status: 500 };
  }
};
