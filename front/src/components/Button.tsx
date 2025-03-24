import { ComponentProps } from "react";
import { Spinner } from "./Spinner";
import { cn } from "../app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
}
export function Button({
  className,
  isLoading,
  disabled,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        variant === "danger" && "bg-red-900 hover:bg-red-800",
        variant === "ghost" &&
          "bg-transparent  hover:bg-gray-800/5 text-gray-800 border border-gray-900",

        className
      )}
    >
      {!isLoading && children}
      {isLoading && (
        <span className="flex items-center justify-center">
          <Spinner className="w-6 h-6" />
        </span>
      )}
    </button>
  );
}
