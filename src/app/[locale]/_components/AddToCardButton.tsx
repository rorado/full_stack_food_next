"use client";

import { Button } from "@/components/ui/button";
import { DialogDemo } from "../../../components/shared/Dialog";
import Image from "next/image";
import Title from "@/components/titles";
import { useState, useMemo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Extra } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/reduxt/hooks";
import {
  addProductToCart,
  selectCartItem,
} from "@/reduxt/features/cart/cartSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { findProductInCart } from "@/lib/cart";
import { ProductType } from "@/types/TypesModuls";

interface Iprop {
  id: string;
  imageSrc: string;
  title: string;
  description: string | null;
  basePrice: number;
  sizes: ProductType["size"][];
  sizeLable: ProductType["size"];
  extras: Extra[];
}

const AddToCardButton = ({
  id,
  imageSrc,
  title,
  description,
  basePrice,
  sizes,
  sizeLable,
  extras,
}: Iprop) => {
  const [selectedSize, setSelectedSize] =
    useState<ProductType["size"]>(sizeLable);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const cart = useAppSelector(selectCartItem);

  const [productQuantity, setProductQuantity] = useState<number>(1);

  const dispath = useAppDispatch();

  const totalPrice = useMemo(() => {
    const sizePrice =
      sizes.find((size) => size.name === selectedSize.name)?.price || 0;
    const extrasPrice = selectedExtras.reduce(
      (total, extra) =>
        total + (extras.find((item) => item.name === extra.name)?.price || 0),
      0
    );
    return basePrice + sizePrice + extrasPrice;
  }, [basePrice, selectedSize, selectedExtras, sizes, extras]);

  const handleExtraToggle = (extra: Extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra)
        ? prev.filter((item) => item !== extra)
        : [...prev, extra]
    );
  };

  const handleproductAddCart = () => {
    dispath(
      addProductToCart({
        name: title,
        basePrice: totalPrice,
        image: imageSrc,
        quantity: productQuantity,
        size: selectedSize,
        extra: selectedExtras,
        id: id,
      })
    );
  };

  const Requantity = () => {
    return setProductQuantity(1);
  };

  return (
    <DialogDemo
      helperFuncion={Requantity}
      mainButton={<Button className="rounded-full px-5">Add To Cart</Button>}
      confirmButton={
        <Button type="button" onClick={handleproductAddCart}>
          {findProductInCart(cart, id)
            ? `Add quantity ${productQuantity}`
            : `Add To Cart ${formatCurrency(totalPrice * productQuantity)}`}
        </Button>
      }
      title={
        <div>
          <Image
            src={imageSrc ?? "/assets/default-product.png"}
            alt={title}
            width={150}
            height={150}
            className="mx-auto"
          />
          <Title title={title} size="lg" styles="text-center" />
        </div>
      }
      description={description || ""}
    >
      <div className="space-y-2">
        <Title size="md" title="Pick your size" styles="text-center" />
        <RadioGroup value={selectedSize.name}>
          {sizes.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2 border p-2 cursor-pointer"
              onClick={() => setSelectedSize(item)}
            >
              <RadioGroupItem value={item.name} id={`size-${idx}`} />
              <Label htmlFor={`size-${idx}`} className="cursor-pointer text-lg">
                {item.name} + ({formatCurrency(item.price)})
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="space-y-2 mt-4 mb-2">
        <Title size="md" title="Any Extra" styles="text-center" />
        {extras.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 border p-2 cursor-pointer"
            onClick={() => {
              handleExtraToggle(item);
            }}
          >
            <Checkbox
              id={`extra-${idx}`}
              checked={selectedExtras.includes(item)}
              onCheckedChange={() => handleExtraToggle(item)}
            />
            <Label
              htmlFor={`extra-${idx}`}
              className="cursor-pointer text-[19px] font-roboto"
            >
              {item.name} +({formatCurrency(item.price)})
            </Label>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <h2 className="text-xl font-[700] mr-3">Quantity: </h2>
        <div className="flex  items-center gap-2">
          <Button
            disabled={productQuantity <= 1}
            className="p-[0.5px] rounded-full bg-slate-400 h-6 hover:bg-slate-500"
            onClick={() => setProductQuantity((prev) => (prev -= 1))}
          >
            <ChevronLeft />
          </Button>
          <h5 className="text-xl font-bold">{productQuantity}</h5>
          <Button
            className="p-[0.5px] rounded-full bg-slate-400 h-6 hover:bg-slate-500"
            onClick={() => setProductQuantity((prev) => (prev += 1))}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </DialogDemo>
  );
};

export default AddToCardButton;
