"use server";

import bcrypt from "bcrypt";
import { Locale } from "@/i18n.config";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { loginSchema, signupSchema } from "@/validation/auth";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { UserRole } from "@/constants/enum";

export const login = async (
  credentials: Record<"email" | "password", string> | undefined,
  locale: Locale
) => {
  const translations = await getTrans(locale);
  const result = loginSchema(translations).safeParse(credentials);
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      return { message: translations.Messages.userNotFound, status: 401 };
    }
    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(
      result.data.password,
      hashedPassword
    );
    if (!isValidPassword) {
      return {
        message: translations.Messages.incorrectPassword,
        status: 401,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      status: 200,
      message: translations.Messages.loginSuccessful,
    };
  } catch {
    return {
      status: 500,
      message: translations.Messages.unexpectedError,
    };
  }
};

export const signup = async (formData: unknown, isAdmin: boolean) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = signupSchema(translations).safeParse(formData);
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (user) {
      return {
        status: 409,
        message: translations.Messages.userAlreadyExists,
        formData,
      };
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
        role: isAdmin ? UserRole.ADMIN : UserRole.USER,
      },
    });

    return {
      status: 201,
      message: translations.Messages.accountCreated,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch {
    return {
      status: 500,
      message: translations.Messages.unexpectedError,
    };
  }
};
