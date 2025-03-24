import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, leftIcon, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className="relative">
        <input
          {...props}
          name={name}
          ref={ref}
          id={inputId}
          className={cn(
            "w-full pl-2 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent",
            {
              "pl-10": leftIcon,
              "!border-red-900": error,
              "focus:ring-0": error,
            },
            className
          )}
          placeholder={placeholder}
        />
        {leftIcon && (
          <div
            className={cn(
              "absolute inset-y-0 left-0  pl-3 flex items-center pointer-events-none text-gray-300 ",
              {
                "bottom-6": error,
              }
            )}
          >
            {leftIcon}
          </div>
        )}
        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-700">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
