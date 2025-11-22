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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/size`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch sizes");
  }
  const sizes: ProductType["size"][] = await res.json();

  return (
    <section className="section-gap">
      <div>
        <p className="text-muted-foreground text-center">Check out</p>
        <h2 className="text-primary text-center text-3xl font-[700]">
          {translate.title}
        </h2>
      </div>
      <div className="container flex gap-10 items-center flex-wrap w-full mt-9">
       {bestSallers.map((item, idx) => (
        <div
          key={idx}
          className="group bg-gray-100 hover:bg-white px-5 py-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-full max-w-sm mx-auto"
        >
          {/* Image */}
          <div className="h-[160px] flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-inner transition-transform duration-300 group-hover:scale-105">
            <Image
              src={item.image ?? "/assets/default-product.png"}
              alt={item.name}
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          {/* Content */}
          <div className="mt-5 flex flex-col gap-3">
            {/* Title + Price */}
            <div className="flex justify-between items-start">
              <Title
                title={item.name}
                className="text-lg md:text-xl font-bold text-foreground truncate max-w-[70%]"
              />
              <span className="text-primary font-extrabold text-lg md:text-xl">
                {formatCurrency(item.basePrice)}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2 min-h-[48px]">
              {item.description}
            </p>

            {/* Add to Cart Button */}
            <div className="mt-3">
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
