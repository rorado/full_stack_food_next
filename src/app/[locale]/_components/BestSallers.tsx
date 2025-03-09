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
  const res = await fetch("http://localhost:3000/api/product/size");

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
            className="bg-secondary hover:bg-background px-4 py-6 rounded-xl w-full max-w-96 m-auto 
            hover:drop-shadow-xl cursor-pointer transition-all duration-300 ease-in-out transform 
            hover:-translate-y-1 hover:scale-105"
          >
            <div className="min-h-[150px] flex">
              <Image
                src={item.image ?? "/assets/default-product.png"}
                alt={item.name}
                width={150}
                height={150}
                className="mx-auto"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mt-2 mb-5">
                <Title title={item.name} />
                <h6 className="text-secondary-foreground">
                  {formatCurrency(item.basePrice)}
                </h6>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-secondary-foreground font-roboto truncate-paragraph-2 h-[52px]">
                  {item.description}
                </p>
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
