import React from "react";
import { cn } from "@/lib/utils"; // Make sure this utility is available

function Skeleton(props) {
  const { className, ...rest } = props;

  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...rest}
    />
  );
}

export { Skeleton };
