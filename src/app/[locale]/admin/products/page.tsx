import { DataTableProducts } from "@/components/admin/products/productsTable";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import React from "react";

const page = async () => {
  const locale = await getCurrentLocale();
  const translate = await getTrans(locale);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`);
  const product = await res.json();

  return (
    <section className="w-full">
      <div>
        <h2 className="text-primary text-center text-3xl font-[700]">
          {translate.Admin.Products.title}
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
