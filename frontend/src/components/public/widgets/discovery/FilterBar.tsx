import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_14px_45px_rgba(15,23,42,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
