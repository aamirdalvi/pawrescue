import React from "react";
import { clsx } from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
}

export default function Container({
  children,
  className,
  clean = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx(!clean && "container-width", className)}
      {...props}
    >
      {children}
    </div>
  );
}
