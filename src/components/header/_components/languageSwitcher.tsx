"use client";

import { Button } from "@/components/ui/button";
import { Languages } from "@/constants/enum";
import { useParams, usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  console.log("patname:", pathname);
  console.log("local:", locale);

  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <div className="flex mx-2">
      {locale === Languages.ARABIC ? (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ENGLISH)}
          className="hover:bg-slate-100"
        >
          English
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ARABIC)}
          className="hover:bg-slate-100"
        >
          العربية
        </Button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
