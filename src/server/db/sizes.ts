import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getSizes = cache(
  () => {
    const productCategory = db.size.findMany();
    return productCategory;
  },
  ["getSizes"],
  { revalidate: 50 }
);
