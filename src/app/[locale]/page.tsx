// import Image from "next/image";

import BestSallers from "./_components/BestSallers";
import Hero from "./_components/Hero";
import ContactPage from "@/components/contact/Contact";
import AboutPage from "@/components/about/About";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

export default async function Home() {
  const locale = await getCurrentLocale();
  const { Home, AboutUs, ContactUs } = await getTrans(locale);
  return (
    <div>
      <Hero translate={Home.Hero} />
      <BestSallers translate={Home.BestSellers} />
      <AboutPage translate={AboutUs} />
      <ContactPage translate={ContactUs} />
    </div>
  );
}
