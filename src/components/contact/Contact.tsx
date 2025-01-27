"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, FormProvider } from "react-hook-form";

interface Iprop {
  translate: {
    title: string;
    name: {
      label: string;
      input: string;
    };
    email: {
      label: string;
      input: string;
    };
    message: {
      label: string;
      input: string;
    };
  };
}

const ContactPage = ({ translate }: Iprop) => {
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
    <section className="container section-gap">
      <div>
        <p className="text-muted-foreground text-center">Check out</p>
        <h2 className="text-primary text-center text-3xl font-[700]">
          {translate.title}
        </h2>
      </div>
      {/* <div className="bg-red-800"> */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full lg:w-2/3 space-y-5 mx-auto"
        >
          <FormItem>
            <FormLabel>{translate.name.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={translate.name.input}
                {...methods.register("name", {
                  required: "Name is required",
                })}
              />
            </FormControl>
            <FormMessage>{methods.formState.errors.name?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>{translate.email.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={translate.email.input}
                type="email"
                {...methods.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </FormControl>
            <FormMessage>{methods.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>{translate.message.label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={translate.message.input}
                rows={5}
                {...methods.register("message", {
                  required: "Message is required",
                })}
                style={{ resize: "none" }}
              />
            </FormControl>
            <FormMessage>
              {methods.formState.errors.message?.message}
            </FormMessage>
          </FormItem>

          <Button className="mt-5 w-full" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
      {/* </div> */}
    </section>
  );
};

export default ContactPage;
