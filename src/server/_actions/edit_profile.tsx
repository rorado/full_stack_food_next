"use server";

import { UserRole } from "@/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getImageUrl } from "@/lib/getImageUrl";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { updateProfileSchema } from "@/validation/profile";
import { signOut } from "next-auth/react";

export const editProfile = async (isAdmin: boolean, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = updateProfileSchema(translations).safeParse(formData);

  const data = result.data;
  console.log(formData, result.error);

  try {
    const user = await db.user.findUnique({
      where: {
        id: data?.id,
      },
    });
    if (!user) {
      await signOut();
      return {
        status: 409,
        message: translations.Messages.userNotFound,
        formData,
      };
    }

    let imageUrl;
    if (typeof data?.image == "string" || typeof data?.image == "undefined") {
      imageUrl = data?.image;
    } else {
      imageUrl = (await getImageUrl(data?.image as File)) || undefined;
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...data,
        image: imageUrl,
        role: isAdmin ? UserRole.ADMIN : UserRole.USER,
      },
    });

    return {
      status: 201,
      message: translations.Messages.updateUserSucess,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch {
    return {
      status: 500,
      message: translations.Messages.unexpectedError,
    };
  }
};
