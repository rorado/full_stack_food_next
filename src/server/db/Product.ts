import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getProduct = cache(
  () => {
    const bestSallers = db.product.findMany({
      include: {
        size: true,
        extra: true,
        category: true,
      },
    });
    return bestSallers;
  },
  ["get_product"],
  { revalidate: 60 }
);
