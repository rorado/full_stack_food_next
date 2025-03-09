/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface IProp {
  label?: string;
  placeholder?: string;
  error?: string;
}

const PasswordField = ({
  label = "Enter you password",
  placeholder = "Password",
  error,
  ...rest
}: IProp) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem>
      <FormLabel>
        {label} <span className="text-[red]">*</span>
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className="pr-10"
            {...rest}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </FormControl>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </FormItem>
  );
};

export default PasswordField;
