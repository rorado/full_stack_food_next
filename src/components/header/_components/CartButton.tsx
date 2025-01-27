"use client";
import { ShoppingCart } from "lucide-react";
import Link from "../../link";
import { Routes } from "@/constants/enum";
import { useSelector } from "react-redux";
import { selectCartItem } from "@/reduxt/features/cart/cartSlice";

const CatButton = () => {
  const cart = useSelector(selectCartItem);
  return (
    <Link href={Routes.CART}>
      <div className="relative cursor-pointer mx-4">
        {cart.length > 0 ? (
          <span className="absolute -top-3 -right-2 px-2 py-0.5 bg-red-500 text-white text-sm font-bold rounded-full shadow-md">
            {cart.length}
          </span>
        ) : undefined}

        <ShoppingCart size={30} strokeWidth={2} className="text-gray-700" />
      </div>
    </Link>
  );
};

export default CatButton;
