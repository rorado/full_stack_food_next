import Title from "@/components/titles";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import AddToCardButton from "../_components/AddToCardButton";
import { categoryByProduct } from "@/server/db/productsByCategories";
import { getSizes } from "@/server/db/sizes";

const Menu = async () => {
  const products = await categoryByProduct();
  const sizes = await getSizes();

  return (
    <main className="px-6 md:px-12 lg:px-20 py-14 bg-gradient-to-b from-background to-background/90 space-y-28">
      {products.map((category, idx) => (
        <section key={idx} className="scroll-mt-24">
          {/* Category Title */}
          <h2 className="text-primary text-center text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md mb-10">
            {category.name}
          </h2>

          {/* Product Grid */}
          <div className="container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.products.map((item, idx) => (
              <div
                key={idx}
                className="group bg-card/90 backdrop-blur-lg border border-border/30 p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl pointer-events-none" />

                {/* Image */}
                <div className="h-[180px] flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-inner transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={item.image ?? "/assets/default-product.png"}
                    alt={item.name}
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                </div>

                {/* Content */}
                <div className="mt-6 flex flex-col gap-4 h-full">
                  {/* Title + Price */}
                  <div className="flex justify-between items-start">
                    <Title
                      title={item.name}
                      className="text-lg md:text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-300"
                    />
                    <span className="text-primary font-extrabold text-xl md:text-2xl tracking-tight drop-shadow-sm">
                      {formatCurrency(item.basePrice)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 min-h-[52px]">
                    {item.description}
                  </p>

                  {/* Add to Cart Button */}
                  <div className="mt-auto pt-2">
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
      ))}
    </main>
  );
};

export default Menu;
