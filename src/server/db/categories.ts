import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getProductsByCategory = cache(
  () => {
    const productCategory = db.category.findMany({
      include: {
        products: {
          include: {
            size: true,
            extra: true,
          },
        },
      },
    });
    return productCategory;
  },
  ["categories"],
  { revalidate: 2 }
);
