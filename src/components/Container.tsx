import classNames from "classnames";
import { ComponentProps, ReactNode } from "react";

interface ContainerProps extends ComponentProps<"div"> {
  children: ReactNode;
}

const Container = ({ className, children, ...rest }: ContainerProps) => {
  return (
    <div className={classNames("container mx-auto", className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
