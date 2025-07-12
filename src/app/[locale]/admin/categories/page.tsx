import { DataTableCategories } from "@/components/admin/categories/categoriesTable";
// import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import React from "react";

const page = async () => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/categories`
  );
  const data = await categories.json();

  const locale = await getCurrentLocale();
  const translate = await getTrans(locale);

  return (
    <section className="w-full">
      <div>
        <h2 className="text-primary text-center text-3xl font-[700]">
          {translate.Admin.Categories.title}
        </h2>
      </div>
      <div className="mx-5">
        <DataTableCategories
          data={data}
          locale={locale}
          translate={translate}
        />
      </div>
    </section>
  );
};

export default page;
