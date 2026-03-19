import { cn } from "@/lib/utils";

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const safe = Math.max(0, Math.min(100, value || 0));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-4 w-full overflow-hidden rounded-full bg-[#e9dfcf]">
        <div className="h-full rounded-full bg-[#8a6500]" style={{ width: `${safe}%` }} />
      </div>
      <span className="text-body-16 text-[#4a3a13]">{safe}%</span>
    </div>
  );
}

