"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";

interface Iprop {
  translate: {
    title: string;
    phone: {
      label: string;
      input: string;
    };
    streetAddress: {
      label: string;
      input: string;
    };
    postalCode: {
      label: string;
      input: string;
    };
    city: {
      label: string;
      input: string;
    };
    country: {
      label: string;
      input: string;
    };
    submit: {
      name: string;
    };
  };
}

const CheckoutForm = ({ translate }: Iprop) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log("Form submitted with values:", data);
  };
  return (
    <section className="section-gap w-full bg-[#ededed73] p-5 rounded-md">
      <div>
        <h2 className="text-3xl font-[700]">{translate.title}</h2>
      </div>
      {/* <div className="bg-red-800"> */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full mt-4 space-y-5 "
        >
          <FormItem>
            <FormLabel>{translate.phone.label}</FormLabel>
            <FormControl>
              <Input placeholder={translate.phone.input} />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>
              {translate.streetAddress.label}{" "}
              <span className="text-[red]">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder={translate.streetAddress.input} />
            </FormControl>
            <FormMessage>{methods.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <div className="flex justify-between gap-2">
            <FormItem className="flex-1">
              <FormLabel>
                {translate.postalCode.label}
                <span className="text-[red]">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={translate.postalCode.input} />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.email?.message}
              </FormMessage>
            </FormItem>
            <FormItem className="flex-1">
              <FormLabel>
                {translate.city.input} <span className="text-[red]">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={translate.city.input} />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.email?.message}
              </FormMessage>
            </FormItem>
          </div>

          <FormItem>
            <FormLabel>
              {translate.country.label} <span className="text-[red]">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder={translate.country.input} />
            </FormControl>
            <FormMessage>{methods.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <Button className="mt-5 w-full" type="submit">
            {translate.submit.name}
          </Button>
        </form>
      </FormProvider>
      {/* </div> */}
    </section>
  );
};

export default CheckoutForm;
