"use client";

import { Pages, Routes } from "@/constants/enum";
import { Button } from "../../ui/button";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import CartButton from "./CartButton";
import LanguageSwitcher from "./languageSwitcher";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useCLientSession } from "@/hooks/useCLientSession";
import { Translations } from "@/types/translations";
import Link from "next/link";

interface NavbarProps {
  translate: Translations["Navigition"];
  initialSession: Session | null;
}

const Navbar = ({ translate, initialSession }: NavbarProps) => {
  const { data: session } = useCLientSession(initialSession);
  const { locale } = useParams();
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => setOpenNav((prev) => !prev);

  const navLinks = [
    { href: `/${locale}/${Routes.MENU}`, title: translate.menu },
    { href: `/${locale}/${Routes.ABOUT}`, title: translate.about },
    { href: `/${locale}/${Routes.CONTACT}`, title: translate.contact },
    ...(session
      ? [{ href: `/${locale}/${Routes.PROFILE}`, title: translate.profile }]
      : []),
    ...(session?.user?.role == "ADMIN"
      ? [{ href: `/${locale}/${Routes.ADMIN}`, title: translate.admin }]
      : []),
  ];

  return (
    <nav>
      {/* Large screens */}
      <div className="flex w-full items-center">
        <div className="flex-1 flex justify-center">
          <ul className="hidden lg:flex gap-8 items-center">
            {navLinks.map(({ href, title }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-[21px] hover:text-primary ${
                    pathname.startsWith(href)
                      ? "text-primary underline"
                      : "text-gray-800"
                  }`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {session?.user ? (
          <div className="hidden lg:block">
            <Button
              className="rounded-full h-10 text-[20px] px-6 py-2"
              onClick={() =>
                signOut({ callbackUrl: `/${locale}`, redirect: true })
              }
            >
              signOut
            </Button>
          </div>
        ) : (
          <div className="hidden lg:flex gap-3 items-center">
            <Link
              href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
              className={`text-[21px] hover:text-primary ${
                pathname === `/${locale}/${Routes.AUTH}/${Pages.LOGIN}`
                  ? "text-primary underline"
                  : "text-gray-800"
              }`}
            >
              {translate.login}
            </Link>
            <Link href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}>
              <Button className={`rounded-full h-10 text-[20px] px-6 py-2`}>
                {translate.register}
              </Button>
            </Link>
          </div>
        )}

        <CartButton />

        <Button
          onClick={toggleNav}
          className="lg:hidden cursor-pointer rounded-full mx-3 hover:bg-primary-foreground"
        >
          {openNav ? <X /> : <AlignJustify />}
        </Button>

        <div className="hidden lg:flex gap-2">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Small screens */}
      <div
        className={`fixed right-0 top-18 h-[100vh] w-full lg:hidden 
          ${openNav ? "translate-y-0" : "-translate-y-full"} 
          transition-transform duration-500 bg-background -z-40`}
      >
        <ul className="mt-20 flex flex-col gap-8 items-center">
          {navLinks.map(({ href, title }) => (
            <li key={href} className="mt-3">
              <Link
                href={href}
                className={`text-[21px] hover:text-primary ${
                  pathname === href ? "text-primary underline" : ""
                }`}
                onClick={toggleNav}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        {session?.user ? (
          <div className="flex justify-center items-center">
            <Button
              className="rounded-full h-10 text-[20px] px-6 py-2"
              onClick={() => signOut()}
            >
              signOut
            </Button>
          </div>
        ) : (
          <div className="flex lg:hidden flex-col gap-3 items-center my-4">
            <Link
              href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
              className={`text-[21px] hover:text-primary ${
                pathname === `/${locale}/${Routes.AUTH}/${Pages.LOGIN}`
                  ? "text-primary underline"
                  : ""
              }`}
              onClick={toggleNav}
            >
              {translate.login}
            </Link>
            <Link
              href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
              onClick={toggleNav}
            >
              <Button className={`rounded-full h-10 text-[20px] px-6 py-2`}>
                {translate.register}
              </Button>
            </Link>
          </div>
        )}
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
