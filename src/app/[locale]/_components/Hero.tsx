import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/enum";
import { Locale } from "@/i18n.config";
import { Forward } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Iprop {
  translate: {
    title: string;
    description: string;
    actions: {
      orderNow: string;
      learnMore: string;
    };
  };
  locale: Locale;
}

const Hero = ({ translate, locale }: Iprop) => {
  return (
    <section
      className="container section-gap flex flex-col-reverse lg:flex-row 
        justify-between gap-9 items-center"
    >
      <div className="m-auto lg:m-0">
        <h2 className="font-roboto font-[700] text-4xl text-center lg:text-start">
          {translate.title}
        </h2>
        <p className="text-[#424242] my-6 text-center lg:text-start max-w-[600px]">
          {/* {translate.description} */}
          test500
        </p>
        <div className="flex gap-5 items-center justify-center lg:justify-start">
          <Link href={`${locale}/${Routes.MENU}`}>
            <Button className="rounded-full">
              {translate.actions.orderNow}
              <Forward />
            </Button>
          </Link>
          <Link
            href={`${locale}/${Routes.ABOUT}`}
            className="flex gap-1 font-roboto font-[600] text-xl item-center cursor-pointer"
          >
            <h2>{translate.actions.learnMore}</h2> <Forward />
          </Link>
        </div>
      </div>
      <div>
        <div className="relative mx-auto w-72 h-72">
          <Image
            src="/assets/pizza.png"
            alt="Pizza"
            fill
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
