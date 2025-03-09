import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const categories = cache(
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
