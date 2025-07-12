import { RootState } from "@/reduxt/store";
import { ProductType } from "@/types/TypesModuls";
import { Extra } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type cartItem = {
  id: string;
  name: string;
  image?: string;
  basePrice: number;
  quantity: number;
  size?: ProductType["size"];
  extra?: Extra[];
};

type cartState = {
  items: cartItem[];
};
const initialItems = localStorage.getItem("cartItems");

const initialState: cartState = {
  items: initialItems ? JSON.parse(initialItems) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<cartItem>) {
      const product = state.items.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.items = [...state.items, action.payload];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeProductFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (product) => product.id != action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    emptyCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addProductToCart, removeProductFromCart, emptyCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItem = (state: RootState) => state.cart.items;
