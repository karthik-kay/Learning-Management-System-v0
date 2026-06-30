"use client";

import { RefreshCcw, SearchX } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { FilterSection } from "@/components/public/sections/filter/FilterSection";
import { TestimonialsSection } from "@/components/public/sections/testimonials/TestimonialsSection";
import { FeaturedReviews } from "@/components/public/sections/testimonials/variants/FeaturedReviews";
import { GridTestimonials } from "@/components/public/sections/testimonials/variants/GridTestimonials";
import { ReviewSummary } from "@/components/public/sections/testimonials/variants/ReviewSummary";
import { ReviewCard } from "@/components/public/widgets/cards/ReviewCard";
import { CategoryTabs } from "@/components/public/widgets/discovery/CategoryTabs";
import { FilterBar } from "@/components/public/widgets/discovery/FilterBar";
import { Pagination } from "@/components/public/widgets/discovery/Pagination";
import { SortDropdown } from "@/components/public/widgets/discovery/SortDropdown";
import { Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import {
  usePublicReviews,
  usePublicReviewSummary,
} from "@/hooks/queries/public";
import { PublicReviewSort } from "@/types";

const SORT_OPTIONS = [
  { label: "Most helpful", value: "helpful" },
  { label: "Most recent", value: "recent" },
  { label: "Highest rated", value: "highest" },
];

const VALID_SORTS = new Set<PublicReviewSort>([
  "helpful",
  "recent",
  "highest",
]);

export function ReviewIndexView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const target = searchParams.get("target") ?? "";
  const rawRating = Number(searchParams.get("rating"));
  const rating =
    Number.isInteger(rawRating) && rawRating >= 1 && rawRating <= 5
      ? rawRating
      : undefined;
  const rawSort = searchParams.get("sort") as PublicReviewSort | null;
  const sort =
    rawSort && VALID_SORTS.has(rawSort) ? rawSort : ("helpful" as const);

  const summaryQuery = usePublicReviewSummary();
  const featuredQuery = usePublicReviews({
    featured: true,
    page_size: 2,
    sort: "helpful",
  });
  const reviewsQuery = usePublicReviews({
    page,
    page_size: 6,
    target: target || undefined,
    rating,
    sort,
    exclude_featured: true,
  });

  function updateFilters(
    updates: Record<string, string | number | undefined>,
    resetPage = true,
  ) {
    const params = new URLSearchParams(searchParams.toString());
    if (resetPage) params.delete("page");

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") params.delete(key);
      else params.set(key, String(value));
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function changePage(nextPage: number) {
    updateFilters({ page: nextPage }, false);
    document
      .getElementById("all-reviews")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (summaryQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC] py-12">
        <Container>
          <div className="h-[380px] rounded-3xl bg-[#18263A]" />
          <div className="mt-12 h-40 rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  if (summaryQuery.isError || !summaryQuery.data) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              Reviews are temporarily unavailable
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              We couldn&apos;t reach the public reviews service.
            </p>
            <Button
              type="button"
              onClick={() => summaryQuery.refetch()}
              className="mt-6 bg-[#0F172A] text-white hover:bg-[#1E293B]"
            >
              <RefreshCcw className="size-4" />
              Try again
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const summary = summaryQuery.data;
  const featuredReviews = featuredQuery.data?.results ?? [];
  const reviews = reviewsQuery.data?.results ?? [];
  const targetTabs = [
    { label: "All programs", value: "" },
    ...summary.targets.map((item) => ({
      label: item.name,
      value: item.key,
    })),
  ];
  const ratingTabs = [
    { label: "All ratings", value: "" },
    ...[5, 4, 3, 2, 1].map((value) => ({
      label: `${value}★`,
      value: String(value),
    })),
  ];

  return (
    <div className="bg-[#F8FAFC]">
      <ReviewSummary summary={summary} />

      {featuredReviews.length > 0 && (
        <TestimonialsSection className="pb-14 lg:pb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#38A3A5]">
              Featured reviews
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A]">
              Stories worth hearing.
            </h2>
          </div>
          <FeaturedReviews>
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} featured />
            ))}
          </FeaturedReviews>
        </TestimonialsSection>
      )}

      <FilterSection sticky className="top-0 border-b-0 py-4">
        <FilterBar>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
              Program or course
            </p>
            <CategoryTabs
              categories={targetTabs}
              value={target}
              onValueChange={(value) => updateFilters({ target: value })}
              ariaLabel="Filter reviews by program or course"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-[#E2E8F0] pt-4 md:flex-row md:items-end">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
                Rating
              </p>
              <CategoryTabs
                categories={ratingTabs}
                value={rating ? String(rating) : ""}
                onValueChange={(value) =>
                  updateFilters({
                    rating: value ? Number(value) : undefined,
                  })
                }
                ariaLabel="Filter reviews by star rating"
              />
            </div>
            <SortDropdown
              value={sort}
              onValueChange={(value) =>
                updateFilters({ sort: value === "helpful" ? undefined : value })
              }
              options={SORT_OPTIONS}
            />
          </div>
        </FilterBar>
      </FilterSection>

      <TestimonialsSection
        className="scroll-mt-8 py-14 lg:py-20"
      >
        <GridTestimonials
          title={
            <h2
              id="all-reviews"
              className="text-3xl font-bold tracking-tight text-[#0F172A]"
            >
              All learner reviews
            </h2>
          }
          description={
            <p className="text-sm text-[#64748B]">
              {reviewsQuery.data?.count ?? 0} reviews match your current filters.
            </p>
          }
        >
          {reviewsQuery.isLoading ? (
            Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl bg-[#DDE5EE]"
              />
            ))
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-10 text-center">
              <SearchX className="mx-auto size-10 text-[#38A3A5]" />
              <h3 className="mt-4 text-xl font-bold text-[#0F172A]">
                No reviews match those filters
              </h3>
              <p className="mt-2 text-sm text-[#64748B]">
                Try another program, course, or rating.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  updateFilters({
                    target: undefined,
                    rating: undefined,
                    sort: undefined,
                  })
                }
                className="mt-5"
              >
                Clear filters
              </Button>
            </div>
          )}
        </GridTestimonials>

        {reviewsQuery.data && (
          <Pagination
            page={reviewsQuery.data.page}
            totalPages={reviewsQuery.data.total_pages}
            onPageChange={changePage}
            className="mt-10"
          />
        )}
      </TestimonialsSection>

      <CTASection className="bg-white py-16 lg:py-20">
        <div className="rounded-3xl bg-[#18263A] px-6 py-12 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:px-10">
          <CenterCTA
            eyebrow="Studied with LearnerSlate?"
            title="Your experience can help the next learner decide."
            description="Sign in to leave an honest, verified review of a course or program you joined."
            primaryAction={
              <Button
                asChild
                size="lg"
                className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
              >
                <Link href="/login?next=/reviews">Write a review</Link>
              </Button>
            }
            secondaryAction={
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/programs">Explore programs</Link>
              </Button>
            }
          />
        </div>
      </CTASection>
    </div>
  );
}
