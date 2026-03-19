import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-[#8a6500]/35 bg-[#f3ebde]/70", className)}>
      {children}
    </div>
  );
}

