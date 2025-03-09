import { db } from "@/lib/prisma";

export const getAllusers = async () => {
  return await db.user.findMany();
};
