"use server";

import { UserRole } from "@/constants/enum";
import { getImageUrl } from "@/lib/getImageUrl";
import { db } from "@/lib/prisma";
import { authOptions } from "@/server/auth";
import { ProductType } from "@/types/TypesModuls";
import { getServerSession } from "next-auth";

export const productsDelet = async (prouctsIds: string[]) => {
  const session = await getServerSession(authOptions);

  try {
    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (user?.role != UserRole.ADMIN) {
      return {
        status: 409,
        message: "you are not admin",
      };
    }

    if (!prouctsIds || prouctsIds.length === 0) {
      return { status: 400 };
    }

    await db.product.deleteMany({
      where: { id: { in: prouctsIds } },
    });
  } catch {
    return { status: 500 };
  }
};

export const productDelet = async (productId: string) => {
  const session = await getServerSession(authOptions);

  try {
    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (user?.role != UserRole.ADMIN) {
      return {
        status: 409,
        message: "you are not admin",
      };
    }

    await db.product.delete({
      where: { id: productId },
    });
  } catch {
    return { status: 500 };
  }
};

export const addOrEditProduct = async (
  formData: ProductType,
  IsCreate: boolean
) => {
  const session = await getServerSession(authOptions);

  console.log(formData);

  const categoriesId = formData.category.map((val) => ({ id: val.id }));
  const extrasId = formData.extra.map((val) => ({ id: val.id }));

  if (!formData.sizeId) {
    return { status: 401, message: "size is required" };
  }

  try {
    let imageUrl;
    if (
      typeof formData?.image == "string" ||
      typeof formData?.image == "undefined"
    ) {
      imageUrl = formData?.image;
    } else {
      if (formData?.image)
        imageUrl = (await getImageUrl(formData.image as File)) || undefined;
    }
    if (IsCreate) {
      if (!session?.user || session?.user.role == UserRole.USER) {
        return {
          status: 401,
          message: "You must to be admin to continue",
        };
      }

      const IsCreatedProduct = await db.product.create({
        data: {
          name: formData.name,
          description: formData.description,
          image: imageUrl ?? null,
          order: formData.order,
          price: formData.price,
          basePrice: formData.basePrice,
          sizeId: formData.sizeId,
          category: {
            connect: categoriesId,
          },
          extra: {
            connect: extrasId,
          },
        },
      });

      return {
        status: 201,
        message: "Product IsCreated successfully",
        user: {
          id: IsCreatedProduct.id,
          name: IsCreatedProduct.name,
        },
      };
    } else {
      const product = await db.product.findUnique({
        where: {
          id: formData?.id,
        },
      });
      if (!product) {
        return {
          status: 409,
          message: "product not found",
          formData,
        };
      }
      const updatedProduct = await db.product.update({
        where: {
          id: product.id,
        },
        data: {
          name: formData.name,
          description: formData.description,
          image: imageUrl ?? null,
          order: formData.order,
          price: formData.price,
          basePrice: formData.basePrice,
          sizeId: formData.sizeId,
          category: {
            set: categoriesId,
          },
          extra: {
            set: extrasId,
          },
        },
      });

      return {
        status: 201,
        message: "Update successfully",
        product: {
          updatedProduct,
        },
      };
    }
  } catch {
    return {
      status: 500,
      message: "unexpected error",
    };
  }
};
