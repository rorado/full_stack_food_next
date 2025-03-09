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

const Login = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log("Form submitted with values:", data);
  };

  return (
    <section className="container section-gap">
      <div>
        <p className="text-muted-foreground text-center">Check out</p>
        <h2 className="text-primary text-center text-3xl font-[700]">Login</h2>
      </div>
      {/* <div className="bg-red-800"> */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full lg:w-2/3 space-y-5 mx-auto"
        >
          <FormItem>
            <FormLabel>username</FormLabel>
            <FormControl>
              <Input
                placeholder="enter you name"
                {...methods.register("name", {
                  required: "Name is required",
                })}
              />
            </FormControl>
            <FormMessage>{methods.formState.errors.name?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>password*</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your password"
                type="password"
                {...methods.register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one letter, one number, and one special character",
                  },
                })}
              />
            </FormControl>

            <FormMessage>
              {methods.formState.errors.password?.message}
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

export default Login;
