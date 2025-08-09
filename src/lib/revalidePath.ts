"use server";

import { revalidatePath } from "next/cache";
import { getCurrentLocale } from "./getCurrentLocale";

export async function RevalidatePath(path: string) {
  const locale = await getCurrentLocale();
  revalidatePath(`${locale}/${path}`);
  return { success: true, path: `${locale}/${path}` };
}
