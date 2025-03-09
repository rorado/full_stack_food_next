"use client";

import PasswordField from "@/components/shared/PasswordField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Pages, Routes, UserRole } from "@/constants/enum";
import { toast } from "@/hooks/use-toast";
import { useCLientSession } from "@/hooks/useCLientSession";
import { signup } from "@/server/_actions/auth";
import { Translations } from "@/types/translations";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface Iprop {
  translate: Translations;
}

const SignupForm = ({ translate }: Iprop) => {
  const { data: session } = useCLientSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { locale } = useParams();
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;

  const password = watch("password");

  const handleconvertRole = () => {
    setIsAdmin((prev) => !prev);
  };

  const onSubmit = async (data: unknown) => {
    setIsLoading(true);

    try {
      const res = await signup(data, isAdmin);
      if (res.message) {
        toast({
          title: res.message,
          className: res.status == 201 ? "text-green-400" : "text-destructive",
        });
      }
      if (res.status == 201) {
        router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
      } else {
        console.log("User", res);
      }
    } catch {
      console.log("User don't registered");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:min-w-[500px] space-y-5"
      >
        {/* Name Field */}
        <FormItem>
          <FormLabel>{translate.Auth.register.name.placeholder}</FormLabel>
          <FormControl>
            <Input
              placeholder={translate.Auth.register.name.placeholder}
              {...register("name", { required: "Name is required" })}
            />
          </FormControl>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </FormItem>

        {/* Email Field */}
        <FormItem>
          <FormLabel>
            {translate.Auth.register.email.label}
            <span className="text-[red]">*</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder={translate.Auth.register.email.placeholder}
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
          </FormControl>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </FormItem>

        <PasswordField
          label={translate.Auth.register.password.label}
          placeholder={translate.Auth.register.password.placeholder}
          {...register("password", {
            minLength: {
              value: 6,
              message: translate.Validation.passwordMinLength,
            },
          })}
          error={errors.password?.message}
        />

        <PasswordField
          label={translate.Auth.register.confirmPassword.label}
          placeholder={translate.Auth.register.confirmPassword.placeholder}
          {...register("confirmPassword", {
            required: translate.Validation.confirmPasswordRequired,
            validate: (value) =>
              value === password || translate.Validation.passwordMismatch,
          })}
          error={errors.confirmPassword?.message}
        />

        {session?.user?.role == UserRole.ADMIN && (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isAdmin}
              id="Admin"
              onClick={handleconvertRole}
            />
            <label
              htmlFor="Admin"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Admin
            </label>
          </div>
        )}

        <Button className="mt-5 w-full" type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : translate.Auth.register.submit}
        </Button>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
