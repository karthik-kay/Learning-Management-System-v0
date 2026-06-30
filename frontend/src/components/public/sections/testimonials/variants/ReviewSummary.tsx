import { BadgeCheck, MessageSquareQuote } from "lucide-react";

import { PublicReviewSummary } from "@/types";
import { Container } from "@/components/shared/primitives";

interface ReviewSummaryProps {
  summary: PublicReviewSummary;
}

export function ReviewSummary({ summary }: ReviewSummaryProps) {
  const roundedRating = Math.round(summary.average_rating);

  return (
    <section className="bg-[#F8FAFC] py-12 lg:py-16">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-[#18263A] px-6 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] sm:px-10 lg:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#57CC99]">
                <MessageSquareQuote className="size-4" />
                Learner reviews
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Learners tell it straight.
              </h1>
              <div className="mt-7 flex items-end gap-4">
                <span className="text-7xl font-bold tracking-tight">
                  {summary.average_rating.toFixed(1)}
                </span>
                <div className="pb-2">
                  <p
                    aria-label={`${summary.average_rating} out of 5 stars`}
                    className="text-xl tracking-[0.14em] text-[#FF7A0E]"
                  >
                    {Array.from({ length: 5 }, (_, index) =>
                      index < roundedRating ? "★" : "☆",
                    ).join("")}
                  </p>
                  <p className="mt-2 text-xs text-[#94A3B8]">
                    Based on {summary.total_reviews.toLocaleString("en-IN")}{" "}
                    published reviews
                  </p>
                </div>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#57CC99]">
                <BadgeCheck className="size-4" />
                {summary.verified_reviews.toLocaleString("en-IN")} verified
                learners
              </p>
            </div>

            <div className="space-y-3">
              {summary.breakdown.map((item) => (
                <div
                  key={item.rating}
                  className="grid grid-cols-[28px_1fr_42px] items-center gap-3"
                >
                  <span className="text-xs font-semibold text-[#CBD5E1]">
                    {item.rating}★
                  </span>
                  <div className="h-2 overflow-hidden rounded-full bg-[#0F1C2C]">
                    <div
                      className="h-full rounded-full bg-[#FF7A0E]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-right text-xs text-[#94A3B8]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {summary.sentiments.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {summary.sentiments.map((sentiment) => (
              <span
                key={sentiment.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#57CC99]/35 bg-[#ECFDF5] px-3 py-1.5 text-xs font-semibold text-[#22577A]"
              >
                <span className="text-[#38A3A5]">✓</span>
                {sentiment.label}
                <span className="text-[#94A3B8]">{sentiment.count}</span>
              </span>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
