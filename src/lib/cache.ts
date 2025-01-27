/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type Callback = (...args: any[]) => Promise<any>;

export const cache = <T extends Callback>(
  cb: T,
  keyPart: string[],
  options: { revalidate?: number | false; tags?: string[] }
) => {
  return nextCache(reactCache(cb), keyPart, options);
};
