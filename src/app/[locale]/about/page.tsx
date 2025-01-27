import AboutPage from "@/components/about/About";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const About = async () => {
  const locale = await getCurrentLocale();
  const { AboutUs } = await getTrans(locale);

  return (
    <div>
      <AboutPage translate={AboutUs} />
    </div>
  );
};

export default About;
