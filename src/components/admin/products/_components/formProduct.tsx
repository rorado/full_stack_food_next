/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

import { Translations } from "@/types/translations";
import { useEffect, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { ProductType } from "@/types/TypesModuls";
import { Textarea } from "@/components/ui/textarea";
import { addOrEditProduct } from "@/server/_actions/admin/handleProducts";
import { formatCurrency } from "@/utils/formatCurrency";
import { RevalidatePath } from "@/lib/revalidePath";
import { Pages, Routes } from "@/constants/enum";

interface Iprop {
  translate?: Translations["Profile"];
  product?: ProductType;
}

const ProductForm = ({ product }: Iprop) => {
  const categoriesProduct = product?.category ?? [];
  const extrasProduct = product?.extra ?? [];
  const size = product?.size;

  const [image, setImage] = useState<string | undefined>(
    product?.image || undefined
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ProductType["category"]>([]);
  const [extras, setextras] = useState<ProductType["extra"] | string>([]);
  const [sizes, setSizes] = useState<ProductType["size"][]>();

  const [priceProductwithEx, setpriceProduct] = useState<number>(0);

  const [selectedCategoriesValues, setSelectedCategoriesValues] = useState<
    ProductType["category"] | string
  >(categoriesProduct.map((val: any) => val));

  const [selectedExttraValues, setSelectedExttraValues] = useState<
    ProductType["extra"] | string
  >(extrasProduct.map((val) => val));

  const [selectedSizeValues, setSelectedSizeValues] = useState<
    ProductType["size"] | null
  >(size ?? null);

  const toggleCategorySelection = (value: { id: string; name: string }) => {
    setSelectedCategoriesValues((prev) => {
      if (Array.isArray(prev)) {
        const exist = prev.some((val) => val.id === value.id);
        return exist ? prev.filter((v) => v.id !== value.id) : [...prev, value];
      }
      return [];
    });
  };
  const toggleExtrasSelection = (value: {
    id: string;
    name: string;
    price: number;
  }) => {
    const { price } = value;
    setSelectedExttraValues((prev) => {
      if (Array.isArray(prev)) {
        const exist = prev.some((val) => val.id === value.id);

        const newSelect = exist
          ? prev.filter((v) => v.id !== value.id)
          : [...prev, value];

        setpriceProduct((prevPrice) =>
          prev.includes(value) ? prevPrice - price : prevPrice + price
        );

        return newSelect;
      }
      return [];
    });
  };
  const toggleSizeSelection = (value: ProductType["size"]) => {
    const { price } = value;
    setSelectedSizeValues(value);
    setpriceProduct((prev) => prev + price);
  };

  const methods = useForm({
    defaultValues: {
      name: product?.name,
      basePrice: product?.basePrice || 0,
      description: product?.description,
      order: product?.order,
    },
  });

  const {
    watch,
    formState: { errors },
  } = methods;

  const currentbasePrice = Number(watch("basePrice")) + priceProductwithEx;

  useEffect(() => {
    fetch("http://localhost:3000/api/product/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });

    fetch("http://localhost:3000/api/product/extras")
      .then((res) => res.json())
      .then((data) => setextras(data || "don't find extra"));

    fetch("http://localhost:3000/api/product/size")
      .then((res) => res.json())
      .then((data) => setSizes(data));
  }, []);

  useEffect(() => {
    const priceExtras = Array.isArray(selectedExttraValues)
      ? selectedExttraValues.reduce((acc, curr) => acc + curr.price, 0)
      : 0;
    setpriceProduct(priceExtras + (size?.price ?? 0));
  }, [selectedExttraValues, size]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const revalidePath = async () => {
    try {
      await RevalidatePath(`${Routes.ADMIN}/${Pages.PRODUCTS}`);
    } catch {
      alert("Enexpected Error");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      let currentImage: string | undefined | File = product?.image ?? image;
      if (imageFile) {
        currentImage = imageFile;
      }

      const Productdata = {
        ...data,
        id: product?.id,
        image: currentImage,
        price: priceProductwithEx + Number(data.basePrice),
        basePrice: Number(data.basePrice),
        order: 50,
        category: selectedCategoriesValues,
        extra: selectedExttraValues,
        sizeId: selectedSizeValues?.id,
      };

      const res = await addOrEditProduct(Productdata, !product?.id);

      if (res?.status != 201) {
        toast({
          title: res.message,
          className: "text-red-400",
        });
      }
      if (res?.status == 201) {
        toast({
          title: res.message,
          className: "text-green-400",
        });
        await revalidePath();
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-5 mt-14">
      <div className="mx-auto lg:mx-10">
        <div className="relative w-[200px] h-[200px]">
          <Image
            src={image ?? "/assets/default-product.png"}
            width="200"
            height="200"
            className="rounded-full object-contain w-[200px] h-[200px]"
            alt="user Image"
          />
          <div
            className="p-2 absolute right-0 bg-gray-100 hover:bg-gray-200 bottom-0
            rounded-full cursor-pointer"
          >
            <label htmlFor="image-upload" className="cursor-pointer">
              <Pencil />
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageChange}
              name="image"
            />
          </div>
        </div>
      </div>
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full lg:min-w-[500px] space-y-5"
          >
            {/* Name Field */}
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="poroduct name"
                  type="text"
                  {...methods.register("name", {
                    minLength: {
                      value: 3,
                      message: "the min char is 3",
                    },
                  })}
                />
              </FormControl>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </FormItem>

            {/* Price Field */}
            <FormItem>
              <FormLabel>Base price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Base price"
                  type="number"
                  {...methods.register("basePrice", {
                    required: "Base price is required",
                    min: {
                      value: 1,
                      message: "Base price must be greater 0",
                    },
                  })}
                />
              </FormControl>

              {errors.basePrice && (
                <p className="text-red-500 text-sm">
                  {errors.basePrice?.message}
                </p>
              )}
            </FormItem>

            {/* description field */}
            <FormField
              name="bio"
              render={() => (
                <FormItem>
                  <FormLabel>Descreption</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add description"
                      className="resize-none"
                      {...methods.register("description")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <h3>total price: </h3>
              <p>{formatCurrency(currentbasePrice)}</p>
            </div>

            <div className="flex justify-between flex-wrap">
              {/* categories choices  */}
              <div className="mt-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <h3 className="text-gray-950">
                      {Array.isArray(selectedCategoriesValues) &&
                      selectedCategoriesValues.length > 0
                        ? selectedCategoriesValues.map((val) => val.name + ", ")
                        : " chose you ctegories"}
                    </h3>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0
                      ? categories.map((value) => (
                          <div
                            key={value.id}
                            onClick={() => toggleCategorySelection(value)}
                          >
                            <div className="flex justify-between px-4 py-2 border-gray-200 border-b-2">
                              {value.name}
                              {typeof selectedCategoriesValues !== "string"
                                ? selectedCategoriesValues.some(
                                    (val) => val.id == value.id
                                  ) && <Check className="h-4 w-4" />
                                : undefined}
                            </div>
                          </div>
                        ))
                      : "loading..."}
                  </SelectContent>
                </Select>
              </div>

              {/* Extras choices */}
              <div className="mt-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <h3>
                      {Array.isArray(selectedExttraValues) &&
                      selectedExttraValues.length > 0
                        ? selectedExttraValues.map((val) => val.name + ", ")
                        : " chose extra"}
                    </h3>
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(extras) && extras.length > 0
                      ? extras.map((value) => (
                          <div
                            key={value.id}
                            onClick={() => toggleExtrasSelection(value)}
                          >
                            <div className="flex justify-between px-4 py-2 border-gray-200 border-b-2">
                              {value.name}
                              {typeof selectedExttraValues !== "string"
                                ? selectedExttraValues.some(
                                    (val) => val.id == value.id
                                  ) && <Check className="h-4 w-4" />
                                : undefined}
                            </div>
                          </div>
                        ))
                      : "loading..."}
                  </SelectContent>
                </Select>
              </div>

              {/* Size choices */}
              <div className="mt-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <h3>
                      {selectedSizeValues?.name
                        ? selectedSizeValues.name
                        : " chose size"}
                    </h3>
                  </SelectTrigger>
                  <SelectContent>
                    {sizes && sizes.length > 0
                      ? sizes.map((value) => (
                          <div
                            key={value.id}
                            onClick={() => toggleSizeSelection(value)}
                          >
                            <div className="flex justify-between px-4 py-2 border-gray-200 border-b-2">
                              {value.name}
                              {selectedSizeValues
                                ? selectedSizeValues?.id == value.id && (
                                    <Check className="h-4 w-4" />
                                  )
                                : undefined}
                            </div>
                          </div>
                        ))
                      : "loading..."}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Submit Button */}
            <Button className="mt-5 w-full" disabled={isLoading} type="submit">
              {isLoading ? <Loader /> : "submit"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProductForm;
