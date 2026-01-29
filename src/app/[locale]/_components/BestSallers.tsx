import Image from "next/image";
import { formatCurrency } from "../../../utils/formatCurrency";
import Title from "@/components/titles";
import AddToCardButton from "./AddToCardButton";
import { ProductType } from "@/types/TypesModuls";
import { getProduct } from "@/server/db/Product";

interface Iprop {
  translate: {
    title: string;
  };
}

const BestSallers = async ({ translate }: Iprop) => {
  const bestSallers = await getProduct();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/size`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch sizes");
  }
  const sizes: ProductType["size"][] = await res.json();

  return (
    <section className="section-gap mt-30">
      {/* Section header */}
      <div className="mb-10 text-center">
        <p className="text-muted-foreground">Check out</p>
        <h2 className="text-primary text-3xl font-bold">{translate.title}</h2>
      </div>

      {/* Products grid */}
      <div
        className="container mx-auto grid gap-8 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3"
      >
        {bestSallers.map((item, idx) => (
          <div
            key={idx}
            className="
              flex flex-col
              rounded-2xl
              border border-border
              bg-background
              p-4
              transition
              hover:shadow-lg
              hover:scale-105
              cursor-pointer
            "
          >
            {/* Image */}
            <div className="aspect-square rounded-xl bg-muted flex items-center justify-center">
              <Image
                src={item.image ?? "/assets/default-product.png"}
                alt={item.name}
                width={300}
                height={300}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="mt-4 flex flex-col gap-2 flex-1">
              {/* Title */}
              <Title title={item.name} />

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>

              {/* Price + Button */}
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="text-lg font-bold text-foreground">
                  {formatCurrency(item.basePrice)}
                </span>

                <AddToCardButton
                  sizeLable={item.size as ProductType["size"]}
                  id={item.id}
                  extras={item.extra}
                  sizes={sizes}
                  imageSrc={item.image!}
                  title={item.name}
                  description={item.description}
                  basePrice={item.basePrice}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSallers;
