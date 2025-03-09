"use client";

import { AlertDialogDemo } from "@/components/shared/Alert";
import { Button } from "@/components/ui/button";
import { Languages } from "@/constants/enum";
import {
  emptyCart,
  removeProductFromCart,
  selectCartItem,
} from "@/reduxt/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/reduxt/hooks";
import { formatCurrency } from "@/utils/formatCurrency";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const delevry = 7;

interface Iprop {
  translate: {
    size: string;
    empty: string;
    subTotal: string;
    delivery: string;
    total: string;
  };
}

const ProductsCart = ({ translate }: Iprop) => {
  const { locale } = useParams();

  const cart = useAppSelector(selectCartItem);
  const dispatch = useAppDispatch();
  const totalPrice = cart.reduce(
    (total, item) => total + item.basePrice * item.quantity,
    0
  );

  const handleRemoveproductCart = (id: string) => {
    return () => {
      dispatch(removeProductFromCart(id));
    };
  };
  const handleCleareCart = () => {
    dispatch(emptyCart());
  };

  const isRtl = locale == Languages.ARABIC;

  return (
    <section className="section-gap space-y-6">
      {cart.length > 0 ? (
        <div className="mb-14">
          <AlertDialogDemo
            handeSave={() => handleCleareCart()}
            buttonAction={
              <Button>
                {translate.empty} <Trash2 size={19} />
              </Button>
            }
            title="Empty cart"
            descreption={`Are you shure you want empty cart`}
          />
        </div>
      ) : undefined}

      {cart.map((item, idx) => {
        return (
          <div key={idx} className="flex justify-between">
            <div className="flex justify-between">
              <Image
                className="rounded-full"
                src={item.image!}
                width={100}
                height={80}
                alt="pizza"
              />
              <div className={`m${isRtl ? "r" : "l"}-4`}>
                <h2 className="text-xl font-[700]">{item.name}</h2>
                <div className="text-[#979696de] flex justify-between">
                  <p>
                    {translate.size}
                    <span
                      className={`m${
                        isRtl ? "r" : "l"
                      }-1 lowercase first-letter:uppercase font-[800]`}
                    >
                      {item.size?.name}
                    </span>
                  </p>
                  <span>x{item.quantity}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-[700]">
                {formatCurrency(item.basePrice * item.quantity)}
              </h2>
              <AlertDialogDemo
                handeSave={handleRemoveproductCart(item.id)}
                buttonAction={
                  <div className="bg-[#e0e0e0de] p-1.5 cursor-pointer w-fit rounded-full">
                    <Trash2 size={19} />
                  </div>
                }
                title="Delet Product"
                descreption={`Are you shure you want delete ${item.name} this product from cart`}
              />
            </div>
          </div>
        );
      })}
      <div className="flex items-end flex-col space-y-[0.5px] mt-6">
        <div className="flex items-center">
          <h2 className="text-[#383838de] text-lg mr-1">
            {translate.subTotal}
          </h2>
          <h2 className="text-sm font-[700] mr-2">
            {formatCurrency(totalPrice)}
          </h2>
        </div>
        <div className="flex items-center">
          <h2 className="text-[#383838de] text-lg mr-1">
            {translate.delivery}
          </h2>
          <h2 className="text-sm font-[700] mr-2">{formatCurrency(delevry)}</h2>
        </div>
        <div className="flex items-center">
          <h2 className="text-[#383838de] text-lg mr-1">{translate.total}</h2>
          <h2 className="text-sm font-[700] mr-2">
            {formatCurrency(totalPrice + delevry)}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ProductsCart;
