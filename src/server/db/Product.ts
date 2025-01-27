import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getBestProduct = cache(
  () => {
    const bestSallers = db.product.findMany({
      include: {
        size: true,
        extra: true,
      },
    });
    return bestSallers;
  },
  ["best_selers"],
  { revalidate: 60 }
);
