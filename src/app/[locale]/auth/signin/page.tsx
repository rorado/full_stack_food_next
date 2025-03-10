import Link from "@/components/link";
import { Pages, Routes } from "@/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import Signin_form from "./_components/Signin";

async function Signin() {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);

  return (
    <section className="elemnts-flex h-[100vh] w-full">
      <main
        className="py-8  px-2 md:px-12 w-[95%] lg:w-fit bg-gray-50
	  flex flex-col items-center drop-shadow-xl rounded-lg space-y-8"
      >
        <div>
          <h2 className="text-2xl font-semibold text-center text-black mb-4">
            {translation.Auth.login.title}
          </h2>
        </div>
        <Signin_form translate={translation} locale={locale} />
        <div>
          <p className="mt-2 text-accent text-sm text-gray-500">
            {translation.Auth.login.authPrompt.message}
            <Link
              href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
              className="text-black px-1 hover:underline hover:text-primary"
            >
              {translation.Auth.login.authPrompt.signUpLinkText}
            </Link>
          </p>
        </div>
      </main>
    </section>
  );
}

export default Signin;
