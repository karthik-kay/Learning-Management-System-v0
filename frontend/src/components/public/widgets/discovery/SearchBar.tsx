"use client";

import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function SearchBar({
  value,
  onValueChange,
  placeholder = "Search",
  label = "Search",
  className,
}: SearchBarProps) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{label}</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
      <input
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white pl-11 pr-11 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#38A3A5] focus:ring-4 focus:ring-[#38A3A5]/10"
      />
      {value && (
        <button
          type="button"
          onClick={() => onValueChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-[#64748B] hover:bg-[#F1F5F9]"
        >
          <X className="size-4" />
        </button>
      )}
    </label>
  );
}
