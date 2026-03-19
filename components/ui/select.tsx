import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "text-body-16 flex h-11 w-full rounded-md border border-[#8a6500]/45 bg-[#f8f3e8] px-3 py-2 text-[#2f2615] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a6500]/40",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

