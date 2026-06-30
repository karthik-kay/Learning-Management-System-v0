"use client";

import { LoaderCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LoadMoreProps {
  onClick: () => void;
  remaining: number;
  loading?: boolean;
  label?: string;
  noun?: string;
}

export function LoadMore({
  onClick,
  remaining,
  loading = false,
  label = "Load more articles",
  noun = "article",
}: LoadMoreProps) {
  if (remaining <= 0) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        type="button"
        size="lg"
        variant="outline"
        disabled={loading}
        onClick={onClick}
        className="border-[#CBD5E1] bg-white px-7 text-[#0F172A] hover:border-[#38A3A5] hover:bg-[#F0FDFA]"
      >
        {loading ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
        {label}
      </Button>
      <p className="text-xs text-[#64748B]">
        {remaining} {remaining === 1 ? noun : `${noun}s`} remaining
      </p>
    </div>
  );
}
