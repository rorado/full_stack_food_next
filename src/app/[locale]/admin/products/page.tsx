import { DataTableProducts } from "@/components/admin/products/productsTable";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getProduct } from "@/server/db/Product";
import React from "react";

const page = async () => {
  const product = await getProduct();
  const locale = await getCurrentLocale();
  const translate = await getTrans(locale);

  return (
    <section className="w-full">
      <div>
        <h2 className="text-primary text-center text-3xl font-[700]">
          Products
        </h2>
      </div>
      <div className="mx-5">
        <DataTableProducts
          data={product}
          locale={locale}
          translate={translate}
        />
      </div>
    </section>
  );
};

export default page;
