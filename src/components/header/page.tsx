import { Routes } from "@/constants/enum";
import Link from "../link";
import Navbar from "./_components/Navbar";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const Header = async () => {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const { Navigition } = await getTrans(locale);
  return (
    <header>
      <div
        className="container fixed z-50 bg-background 
          top-0 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex justify-between shadow-inner h-full py-5 px-3 bg-background">
          <Link
            href={`${Routes.ROOT}${locale}`}
            className="text-3xl m-0 text-primary font-[900] font-serif"
          >
            🍕 Pizza
          </Link>
          <div className="flex items-center flex-1">
            <div className="flex-1">
              <Navbar translate={Navigition} initialSession={initialSession} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
