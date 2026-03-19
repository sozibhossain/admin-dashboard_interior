import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "text-body-16 flex h-11 w-full rounded-md border border-[#8a6500]/45 bg-[#f8f3e8] px-3 py-2 text-[#2f2615] placeholder:text-[#736756] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a6500]/40",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

