import ContactPage from "@/components/contact/Contact";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Contact = async () => {
  const locale = await getCurrentLocale();
  const { ContactUs } = await getTrans(locale);
  return (
    <div>
      <ContactPage translate={ContactUs} />
    </div>
  );
};

export default Contact;
