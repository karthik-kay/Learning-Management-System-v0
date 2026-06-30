import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";

import { BlogPostListItem } from "@/types";
import { cn } from "@/lib/utils";

export type BlogCardVariant = "default" | "large" | "compact";

interface BlogCardProps {
  post: BlogPostListItem;
  variant?: BlogCardVariant;
  className?: string;
}

function formatPublishedDate(value: string | null) {
  if (!value) return "Recently published";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogCard({
  post,
  variant = "default",
  className,
}: BlogCardProps) {
  const compact = variant === "compact";
  const large = variant === "large";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#38A3A5]/50 hover:shadow-[0_24px_70px_rgba(34,87,122,0.12)]",
        compact && "grid min-h-[190px] grid-cols-[minmax(0,1fr)_120px]",
        large && "h-full",
        className,
      )}
    >
      {!compact && (
        <Link
          href={`/blog/${post.slug}`}
          aria-label={`Read ${post.title}`}
          className={cn(
            "block overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#22577A] to-[#38A3A5]",
            large ? "h-72 lg:h-80" : "h-52",
          )}
        >
          <div
            role="img"
            aria-label=""
            className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
            style={
              post.cover_image_url
                ? { backgroundImage: `url("${post.cover_image_url}")` }
                : undefined
            }
          />
        </Link>
      )}

      <div
        className={cn(
          "flex min-w-0 flex-col",
          compact ? "p-5" : "p-6",
          large && "lg:p-7",
        )}
      >
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold">
          {post.category && (
            <span className="rounded-full bg-[#E6FFFA] px-3 py-1 text-[#22577A]">
              {post.category.name}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-[#64748B]">
            <Clock3 className="size-3.5" />
            {post.reading_time_minutes || 1} min read
          </span>
        </div>

        <Link href={`/blog/${post.slug}`} className="focus:outline-none">
          <h2
            className={cn(
              "font-bold leading-tight tracking-tight text-[#0F172A] transition group-hover:text-[#22577A]",
              compact ? "line-clamp-2 text-lg" : "line-clamp-2 text-xl",
              large && "text-2xl lg:text-3xl",
            )}
          >
            {post.title}
          </h2>
        </Link>

        {!compact && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#64748B]">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#334155]">
              {post.author_name || "LearnerSlate Editorial"}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <CalendarDays className="size-3.5" />
              {formatPublishedDate(post.published_at)}
            </p>
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-[#38A3A5] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {compact && (
        <Link
          href={`/blog/${post.slug}`}
          aria-label={`Read ${post.title}`}
          className="overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#22577A] to-[#38A3A5]"
        >
          <div
            role="img"
            aria-label=""
            className="h-full min-h-[190px] w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
            style={
              post.cover_image_url
                ? { backgroundImage: `url("${post.cover_image_url}")` }
                : undefined
            }
          />
        </Link>
      )}
    </article>
  );
}
