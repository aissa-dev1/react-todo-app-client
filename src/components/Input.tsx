import { ComponentProps } from "react";
import cn from "../utils/cn";

interface InputProps extends ComponentProps<"input"> {}

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={cn(
        "bg-page outline-none border-none py-0.5 px-2 rounded",
        className
      )}
      {...rest}
    />
  );
};

export default Input;
