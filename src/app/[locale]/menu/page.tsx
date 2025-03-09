import Title from "@/components/titles";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import AddToCardButton from "../_components/AddToCardButton";
import { categoryByProduct } from "@/server/db/productsByCategories";
import { getSizes } from "@/server/db/sizes";

const Menu = async () => {
  const products = await categoryByProduct();
  const sizes = await getSizes();
  // console.log(categories);
  return (
    <main>
      {products.map((caterory, idx) => {
        return (
          <section key={idx} className="section-gap">
            <div>
              <h2 className="text-primary text-center text-3xl font-[700]">
                {caterory.name}
              </h2>
            </div>
            <div className="container flex gap-10 flex-wrap w-full mt-9">
              {caterory.products.map((item, idx) => (
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
                        sizeLable={item.size!}
                        id={item.id}
                        extras={item.extra}
                        sizes={sizes}
                        imageSrc={item.image ?? "/assets/default-product.png"}
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
      })}
    </main>
  );
};

export default Menu;
