/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../ui/loader";
import { Translations } from "@/types/translations";
import { useState } from "react";
import { useCLientSession } from "@/hooks/useCLientSession";
import { editProfile } from "@/server/_actions/edit_profile";
import { Pencil } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { UserRole } from "@/constants/enum";
import { Checkbox } from "../ui/checkbox";
import { User } from "@prisma/client";

interface Iprop {
  translate: Translations["Profile"];
  initialSession?: Session | null;
  userUpdate?: User;
}

const ProfileForm = ({ translate, initialSession, userUpdate }: Iprop) => {
  const { data: session, update } = useCLientSession(initialSession);
  const imageUserProfile = userUpdate ? userUpdate.image : session?.user.image;

  const [image, setImage] = useState<string | undefined>(
    imageUserProfile || undefined
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    userUpdate
      ? userUpdate?.role == UserRole.ADMIN
      : session?.user?.role == UserRole.ADMIN
  );

  const methods = useForm({
    defaultValues: {
      name: userUpdate?.name || session?.user.name,
      email: userUpdate?.email || session?.user.email,
      city: userUpdate?.city || session?.user.city,
      phone: userUpdate?.phone || session?.user.phone,
      postalCode: userUpdate?.postalCode || session?.user.postalCode,
    },
  });

  const {
    // handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const handleEmailInput = session?.user?.role == UserRole.ADMIN;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleconvertRole = () => {
    setIsAdmin((prev) => !prev);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      let currentImage: string | undefined | File = userUpdate?.image ?? image;
      if (imageFile) {
        currentImage = imageFile;
      }

      const res = await editProfile(isAdmin, {
        ...data,
        image: currentImage,
        id: userUpdate?.id || session?.user.id,
      });

      if (res?.status != 201) {
        toast({
          title: res.message,
          className: "text-red-400",
        });
      }
      if (res?.status == 201) {
        toast({
          title: res.message,
          className: "text-green-400",
        });
        await update();
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-5 mt-14">
      <div className="mx-auto lg:mx-10">
        <div className="relative w-[200px] h-[200px]">
          <Image
            src={image ?? "/assets/defaultImage.png"}
            width="200"
            height="200"
            className="rounded-full object-contain w-[200px] h-[200px]"
            alt="user Image"
          />
          <div
            className="p-2 absolute right-0 bg-gray-100 hover:bg-gray-200 bottom-0
            rounded-full cursor-pointer"
          >
            <label htmlFor="image-upload" className="cursor-pointer">
              <Pencil />
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageChange}
              name="image"
            />
          </div>
        </div>
      </div>
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full lg:min-w-[500px] space-y-5"
          >
            {/* Name Field */}
            <FormItem>
              <FormLabel>{translate.form.name.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={translate.form.name.placeholder}
                  type="text"
                  {...methods.register("name", {
                    minLength: {
                      value: 3,
                      message: translate.form.name.validation.required,
                    },
                  })}
                />
              </FormControl>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </FormItem>

            {/* Email Field */}
            <FormItem>
              <FormLabel>
                {translate.form.email.label}
                <span className="text-[red]">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={translate.form.email.placeholder}
                  readOnly={!handleEmailInput}
                  className={`${handleEmailInput ? "" : "input-readOnly"} `}
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </FormControl>
            </FormItem>

            {/* Phone Field */}
            <FormItem>
              <FormLabel>{translate.form.phone.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={translate.form.phone.placeholder}
                  type="text"
                  {...methods.register("phone", {
                    minLength: {
                      value: 10,
                      message: translate.form.phone.validation.invalid,
                    },
                  })}
                />
              </FormControl>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.phone?.message}</p>
              )}
            </FormItem>

            {/* City Field */}
            <FormItem>
              <FormLabel>{translate.form.city.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={translate.form.city.placeholder}
                  type="text"
                  {...methods.register("city", {
                    minLength: {
                      value: 3,
                      message: translate.form.city.validation.required,
                    },
                  })}
                />
              </FormControl>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.city?.message}</p>
              )}
            </FormItem>

            {/* Postal Code Fjield */}
            <FormItem>
              <FormLabel>{translate.form.postalCode.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={translate.form.postalCode.placeholder}
                  type="string"
                  {...methods.register("postalCode", {
                    minLength: {
                      value: 3,
                      message: translate.form.postalCode.validation.required,
                    },
                  })}
                />
              </FormControl>
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.postalCode?.message}
                </p>
              )}
            </FormItem>

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

            {/* Submit Button */}
            <Button className="mt-5 w-full" disabled={isLoading} type="submit">
              {isLoading ? <Loader /> : translate.submit}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileForm;
