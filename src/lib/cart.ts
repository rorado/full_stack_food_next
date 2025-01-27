import { cartItem } from "@/reduxt/features/cart/cartSlice";

export const findProductInCart = (
  cartProducts: cartItem[],
  productID: string
) => {
  return Boolean(cartProducts.find((product) => product.id === productID));
};
