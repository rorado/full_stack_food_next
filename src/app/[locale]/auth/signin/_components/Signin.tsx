"use client";

import PasswordField from "@/components/shared/PasswordField";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/ui/loader";
import { Translations } from "@/types/translations";
import { Locale } from "@/i18n.config";
import { Routes } from "@/constants/enum";

interface Iprop {
  translate: Translations;
  locale: Locale;
}

const Signin_form = ({ translate, locale }: Iprop) => {
  const [error, setError] = useState<Record<string, string[]> | string>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast({
            title: responseError,
            className: "text-destructive",
          });
        }
      }

      if (res?.ok) {
        toast({
          title: translate.Messages.loginSuccessful,
          className: "text-green-400",
        });
        router.replace(`/${locale}/${Routes.PROFILE}`);
      }
    } catch {
      console.log("res");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full lg:min-w-[500px] space-y-5"
      >
        {/* Email Field */}
        <FormItem>
          <FormLabel>
            {translate.Auth.login.email.label}
            <span className="text-[red]">*</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder={translate.Auth.login.email.placeholder}
              type="email"
              {...methods.register("email", { required: "Email is required" })}
            />
          </FormControl>
          {typeof error === "object" && error.email && (
            <p className="text-red-500 text-sm">{error.email[0] as string}</p>
          )}
        </FormItem>

        {/* Password Field */}
        <PasswordField
          {...methods.register("password", {
            required: "Password is required",
          })}
          label={translate.Auth.login.password.label}
          placeholder={translate.Auth.login.email.placeholder}
          error={
            typeof error === "object" && error.password
              ? (error.password[0] as string)
              : undefined
          }
        />

        {/* Submit Button */}
        <Button className="mt-5 w-full" disabled={isLoading} type="submit">
          {isLoading ? <Loader /> : translate.Auth.login.submit}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Signin_form;
