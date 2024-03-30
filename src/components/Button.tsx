import { ComponentProps } from "react";
import cn from "../utils/cn";

type ButtonVariant = "accent" | "water" | "nature" | "fire";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
}

const buttonVariant: Record<ButtonVariant, string> = {
  accent:
    "bg-accent-color/10 text-accent-color hover:bg-accent-color/15 active:bg-accent-color/20",
  water:
    "bg-blue-500/10 text-blue-500 hover:bg-blue-500/15 active:bg-blue-500/20",
  nature:
    "bg-green-500/10 text-green-500 hover:bg-green-500/15 active:bg-green-500/20",
  fire: "bg-red-500/10 text-red-500 hover:bg-red-500/15 active:bg-red-500/20",
};

const Button = ({
  className,
  variant = "accent",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "text-sm font-semibold py-0.5 px-4 rounded duration-300",
        buttonVariant[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
