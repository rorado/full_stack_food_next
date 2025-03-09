import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const categoryByProduct = cache(
  () => {
    const productCategory = db.category.findMany({
      include: {
        products: {
          include: {
            extra: true,
            category: true,
            size: true,
          },
        },
      },
    });
    return productCategory;
  },
  ["categoryByProduct"],
  { revalidate: 50 }
);
