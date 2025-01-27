import { Routes } from "@/constants/enum";
import Link from "../link";
import Navbar from "./_components/Navbar";
import CatButton from "./_components/CartButton";
import LanguageSwitcher from "./_components/languageSwitcher";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Header = async () => {
  const locale = await getCurrentLocale();

  const {Navigition} = await getTrans(locale);
  return (
    <header>
      <div
        className="container   fixed z-50  bg-background 
          top-0 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex justify-between shadow-inner h-full py-5 px-3 bg-background ">
          <Link
            href={Routes.ROOT}
            className="text-3xl m-0 text-primary font-[900] font-serif"
          >
            🍕 Pizza
          </Link>
          <div className="flex items-center">
            <Navbar translate={Navigition}/>
            <CatButton />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
