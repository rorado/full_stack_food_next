"use client";

import { useAppSelector } from "@/reduxt/hooks";
import CheckoutForm from "./_components/CheckoutForm";
import ProductsCart from "./_components/ProductsCart";
import { selectCartItem } from "@/reduxt/features/cart/cartSlice";

interface Iprop {
  translate: {
    title: string;
    cartProducts: {
      size: string;
      empty: string;
      subTotal: string;
      delivery: string;
      total: string;
    };
    checkout: {
      title: string;
      phone: {
        label: string;
        input: string;
      };
      streetAddress: {
        label: string;
        input: string;
      };
      postalCode: {
        label: string;
        input: string;
      };
      city: {
        label: string;
        input: string;
      };
      country: {
        label: string;
        input: string;
      };
      submit: {
        name: string;
      };
    };
    catrEmpty: {
      title: string;
    };
  };
}

const CartPage = ({ translate }: Iprop) => {
  const cart = useAppSelector(selectCartItem);

  return (
    <main>
      <section className="section-gap ">
        <div>
          <h2 className="text-primary text-center text-3xl font-[700]">
            {translate.title}
          </h2>
        </div>
        {cart.length > 0 ? (
          <div className="container flex flex-col lg:flex-row justify-between gap-5">
            <div className="flex-1">
              <ProductsCart translate={translate.cartProducts} />
            </div>
            <div className="flex-1">
              <CheckoutForm translate={translate.checkout} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <h2 className="text-2xl text-center mt-48 tracking-[0.1rem] font-[800]">
              {translate.catrEmpty.title}
            </h2>
          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;
