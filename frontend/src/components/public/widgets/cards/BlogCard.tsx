import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { PublicChip } from "@/components/public/widgets/foundation";
import { cn } from "@/lib/utils";
import { BlogPostListItem } from "@/types";

export type BlogCardVariant = "default" | "featured" | "compact";

interface BlogCardProps {
  className?: string;
  post: BlogPostListItem;
  variant?: BlogCardVariant;
}

function formatPublishedDate(value: string | null) {
  if (!value) return "Recently published";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function BlogCard({
  className,
  post,
  variant = "default",
}: BlogCardProps) {
  const href = `/blog/${post.slug}`;
  const author = post.author_name || "LearnerSlate Editorial";
  const compact = variant === "compact";
  const featured = variant === "featured";

  return (
    <Card
      data-slot="blog-card"
      className={cn(
        "h-full gap-0 rounded-2xl border-public-neutral-200 bg-white p-[22px] py-[22px]",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        "transition-[border-color,box-shadow] hover:border-public-teal-200 hover:shadow-sm",
        featured &&
          "border-public-blue-800 bg-public-blue-900 p-6 py-6 hover:border-public-teal-500",
        compact && "min-h-0 p-4 py-4",
        className,
      )}
    >
      <article className="flex min-w-0 flex-1 flex-col">
        <Link
          href={href}
          aria-label={`Read ${post.title}`}
          className={cn(
            "group/blog-link min-w-0 flex-1 rounded-[10px] outline-none",
            compact
              ? "grid h-full grid-cols-[minmax(132px,36%)_minmax(0,1fr)] gap-4"
              : "flex flex-col",
            "text-public-blue-900 visited:text-public-blue-700",
            "hover:text-public-teal-800 active:text-public-teal-900 active:opacity-90",
            featured &&
              "text-white visited:text-public-blue-200 hover:text-public-teal-200 active:text-public-teal-100",
            "focus-visible:ring-[3px] focus-visible:ring-public-teal-100",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          )}
        >
          <div
            className={cn(
              "block w-full overflow-hidden rounded-[10px] bg-public-teal-50",
              compact
                ? "h-full min-h-[168px]"
                : featured
                  ? "mb-5 aspect-[21/10]"
                  : "mb-3.5 aspect-video",
            )}
          >
            <span
              aria-hidden="true"
              className="block size-full bg-cover bg-center transition-transform duration-500 ease-out group-hover/blog-link:scale-[1.03] group-hover/blog-link:opacity-95 group-active/blog-link:scale-[1.01] group-active/blog-link:brightness-95 motion-reduce:transform-none motion-reduce:transition-none"
              style={
                post.cover_image_url
                  ? { backgroundImage: `url("${post.cover_image_url}")` }
                  : undefined
              }
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div
              className={cn(
                "mb-2.5 flex flex-wrap items-center gap-2.5",
                featured && "mb-4 gap-3",
              )}
            >
              {featured ? (
                <PublicChip variant="accent" size="sm">
                  Editor&apos;s pick
                </PublicChip>
              ) : null}
              {post.category ? (
                <PublicChip variant="info" size="sm">
                  {post.category.name}
                </PublicChip>
              ) : null}
              <span
                className={cn(
                  "font-mono text-[11px] text-public-neutral-400 tabular-nums",
                  featured && "text-public-blue-200",
                )}
              >
                {post.reading_time_minutes || 1} min read
              </span>
            </div>

            <h2
              className={cn(
                "line-clamp-2 text-[15.5px] font-extrabold leading-[1.35] tracking-[-0.01em] text-inherit",
                "group-hover/blog-link:underline group-hover/blog-link:decoration-public-teal-200 group-hover/blog-link:underline-offset-4",
                featured && "text-2xl leading-[1.3]",
              )}
            >
              {post.title}
            </h2>

            <p
              className={cn(
                "mt-2 line-clamp-3 text-[12.5px] leading-[1.55] text-public-neutral-500",
                compact && "line-clamp-2",
                featured && "mt-3 text-sm leading-[1.65] text-public-blue-100",
              )}
            >
              {post.excerpt}
            </p>

            <div
              className={cn(
                "mt-auto flex items-center justify-between gap-4 border-t border-public-neutral-100 pt-3.5",
                featured && "border-public-blue-700 pt-4",
              )}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-[26px] shrink-0 items-center justify-center rounded-full bg-public-teal-500 text-[10px] font-bold text-white",
                    featured && "bg-public-orange-500 text-public-blue-900",
                  )}
                >
                  {getInitials(author)}
                </span>
                <span className="min-w-0">
                  <strong
                    className={cn(
                      "block truncate text-xs font-semibold text-public-blue-900",
                      featured && "text-white",
                    )}
                  >
                    {author}
                  </strong>
                  <span
                    className={cn(
                      "block text-[10.5px] text-public-neutral-400",
                      featured && "text-public-blue-200",
                    )}
                  >
                    {formatPublishedDate(post.published_at)}
                  </span>
                </span>
              </div>
              <ArrowRight
                aria-hidden="true"
                className={cn(
                  "size-4 shrink-0 text-public-teal-700 transition-transform group-hover/blog-link:translate-x-0.5 group-active/blog-link:translate-x-1",
                  featured && "text-public-teal-300",
                )}
              />
            </div>
          </div>
        </Link>
      </article>
    </Card>
  );
}

export type { BlogCardProps };
