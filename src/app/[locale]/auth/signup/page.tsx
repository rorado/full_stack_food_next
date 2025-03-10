import Link from "@/components/link";
import { Pages, Routes } from "@/constants/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import SignupForm from "./_components/SignupForm";
import getTrans from "@/lib/translation";

async function SingIn() {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  return (
    <section className="elemnts-flex h-[100vh] w-full">
      <main
        className="py-8 px-2 md:px-12 w-[95%] lg:w-fit bg-gray-50
	      flex flex-col items-center drop-shadow-xl rounded-lg space-y-8"
      >
        <div>
          <h2 className="text-2xl font-semibold text-center text-black mb-4">
            {translation.Auth.register.title}
          </h2>
        </div>

        <SignupForm translate={translation} />

        <div>
          <p className="mt-2 text-accent text-sm text-gray-500">
            {translation.Auth.register.authPrompt.message}
            <Link
              href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
              className="text-black px-1 hover:underline hover:text-primary"
            >
              {translation.Auth.register.authPrompt.loginLinkText}
            </Link>
          </p>
        </div>
      </main>
    </section>
  );
}

export default SingIn;
