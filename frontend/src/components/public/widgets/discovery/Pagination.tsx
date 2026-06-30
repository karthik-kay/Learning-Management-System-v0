"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter(
      (candidate) =>
        candidate === 1 ||
        candidate === totalPages ||
        Math.abs(candidate - page) <= 1,
    )
    .reduce<Array<number | "ellipsis">>((items, candidate, index, source) => {
      if (index > 0 && candidate - Number(source[index - 1]) > 1) {
        items.push("ellipsis");
      }
      items.push(candidate);
      return items;
    }, []);

  return (
    <nav
      aria-label="Reviews pagination"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>

      {pages.map((candidate, index) =>
        candidate === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-sm text-[#94A3B8]"
          >
            …
          </span>
        ) : (
          <Button
            key={candidate}
            type="button"
            size="sm"
            variant={candidate === page ? "default" : "outline"}
            aria-current={candidate === page ? "page" : undefined}
            onClick={() => onPageChange(candidate)}
            className={cn(
              "min-w-9",
              candidate === page &&
                "bg-[#0F172A] text-white hover:bg-[#1E293B]",
            )}
          >
            {candidate}
          </Button>
        ),
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
