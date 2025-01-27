import CartPage from "@/components/cart/CartPage";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Cart = async () => {
  const locale = await getCurrentLocale();
  const { Cart } = await getTrans(locale);
  return (
    <div>
      <CartPage translate={Cart} />
    </div>
  );
};

export default Cart;
