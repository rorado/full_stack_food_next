"use client";
import { Pages, Routes } from "@/constants/enum";
import Link from "../../link";
import { Button } from "../../ui/button";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";

interface Iprop {
  translate: {
    menu: string;
    about: string;
    contact: string;
    login: string;
  };
}

const Navbar = ({ translate }: Iprop) => {
  const { locale } = useParams();
  const pathname = usePathname();

  const links = [
    { href: Routes.MENU, title: translate.menu },
    { href: Routes.ABOUT, title: translate.about },
    { href: Routes.CONTACT, title: translate.contact },
    { href: `${Routes.AUTH}/${Pages.LOGIN}`, title: translate.login },
  ];

  const [openNav, setOpenNav] = useState(false);
  const toogleNav = () => {
    setOpenNav((prev) => !prev);
  };

  const Icon = openNav ? X : AlignJustify;

  return (
    <div>
      {/* large screens*/}
      <ul className="hidden lg:flex gap-8 items-center">
        {links.map((item, idx) => (
          <li key={idx}>
            <Link
              href={`${item.href}`}
              className={`text-[21px] hover:text-primary ${
                pathname.startsWith(`/${locale}/${item.href}`)
                  ? "text-primary underline"
                  : "text-accent"
              }`}
            >
              {item.href == `${Routes.AUTH}/${Pages.LOGIN}` ? (
                <Button className="rounded-full h-10 text-[20px] px-6 py-2">
                  {item.title}
                </Button>
              ) : (
                <div>{item.title}</div>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <Button
        onClick={toogleNav}
        className="lg:hidden cursor-pointer rounded-full"
      >
        <Icon />
      </Button>
      {/* small screens */}
      <div
        className={` fixed right-0 top-18 h-[100vh] min-w-full
		    lg:hidden ${openNav ? "translate-y-0" : "translate-y-[-200vw]"}
     	transition-transform duration-500 bg-background -z-40`}
      >
        <ul className="mt-20 flex flex-col gap-8 items-center">
          {links.map((item, idx) => (
            <li key={idx} className="mt-3">
              <Link
                href={`${item.href}`}
                className={`text-[21px] hover:text-primary ${
                  pathname.startsWith(`/${locale}/${item.href}`)
                    ? "text-primary underline"
                    : "text-accent"
                }`}
              >
                {item.href == `${Routes.AUTH}/${Pages.LOGIN}` ? (
                  <Button className="rounded-full text-[20px] px-6 py-2">
                    {item.title}
                  </Button>
                ) : (
                  <div>{item.title}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
