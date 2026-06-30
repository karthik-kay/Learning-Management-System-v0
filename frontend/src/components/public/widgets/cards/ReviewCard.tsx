import { BadgeCheck, CalendarDays, ThumbsUp } from "lucide-react";

import { PublicReview } from "@/types";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: PublicReview;
  featured?: boolean;
  className?: string;
}

function formatDate(value: string | null) {
  if (!value) return "Recently";
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className="tracking-[0.16em] text-[#FF7A0E]"
    >
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? "★" : "☆",
      ).join("")}
    </span>
  );
}

export function ReviewCard({
  review,
  featured = false,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-[#263950] bg-[#18263A] p-6 text-white shadow-[0_20px_55px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:border-[#38A3A5]/60",
        featured && "border-[#FF7A0E]/40 p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#22577A] text-sm font-bold text-white">
            {review.student_avatar ? (
              <div
                role="img"
                aria-label=""
                className="size-full bg-cover bg-center"
                style={{
                  backgroundImage: `url("${review.student_avatar}")`,
                }}
              />
            ) : (
              review.student_initials
            )}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold">
              {review.student_name}
            </h3>
            <p className="truncate text-xs text-[#94A3B8]">
              {review.target.name}
            </p>
          </div>
        </div>
        {review.target.category && (
          <span className="shrink-0 rounded-full bg-[#38A3A5]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#57CC99]">
            {review.target.category}
          </span>
        )}
      </div>

      <div className="mt-5 text-sm">
        <Stars rating={review.rating} />
      </div>

      {review.title && (
        <h4 className="mt-4 text-lg font-bold leading-tight">{review.title}</h4>
      )}
      <blockquote
        className={cn(
          "mt-3 text-sm leading-6 text-[#D8E0EA]",
          featured ? "line-clamp-6" : "line-clamp-5",
        )}
      >
        “{review.comment}”
      </blockquote>

      {review.sentiments.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {review.sentiments.slice(0, 3).map((sentiment) => (
            <span
              key={sentiment}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium text-[#CBD5E1]"
            >
              {sentiment}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <div className="flex flex-wrap items-center gap-3">
          {review.is_verified && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57CC99]">
              <BadgeCheck className="size-4" />
              Verified learner
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <ThumbsUp className="size-3.5" />
            Helpful ({review.helpful_count})
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
          <CalendarDays className="size-3.5" />
          {formatDate(review.published_at)}
        </span>
      </div>
    </article>
  );
}
