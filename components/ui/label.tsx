import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-body-16 mb-2 block text-[#3e3422]", className)} {...props} />;
}

