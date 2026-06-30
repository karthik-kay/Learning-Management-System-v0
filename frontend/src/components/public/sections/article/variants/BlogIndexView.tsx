"use client";

import { useState } from "react";
import { BookOpenText, RefreshCcw } from "lucide-react";

import { MarketingLayout } from "@/components/public/layouts/MarketingLayout";
import { FeaturedPost } from "@/components/public/sections/article/variants/FeaturedPost";
import { FilterSection } from "@/components/public/sections/filter/FilterSection";
import { GridSection } from "@/components/public/sections/grid/GridSection";
import { AutoGrid } from "@/components/public/sections/grid/variants/AutoGrid";
import { FeaturedBlogGrid } from "@/components/public/sections/grid/variants/FeaturedBlogGrid";
import { BlogCard } from "@/components/public/widgets/cards/BlogCard";
import { CategoryTabs } from "@/components/public/widgets/discovery/CategoryTabs";
import { LoadMore } from "@/components/public/widgets/discovery/LoadMore";
import { NewsletterForm } from "@/components/public/widgets/forms/NewsletterForm";
import { Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import {
  useBlogCategories,
  useBlogPosts,
} from "@/hooks/queries/public";

const PAGE_SIZE = 6;

function BlogLoadingState() {
  return (
    <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
      <div className="bg-[#07111F] py-12 lg:py-16">
        <Container>
          <div className="grid min-h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:grid-cols-2">
            <div className="space-y-5 p-10 lg:p-14">
              <div className="h-7 w-28 rounded-full bg-white/10" />
              <div className="h-12 w-full rounded bg-white/10" />
              <div className="h-12 w-4/5 rounded bg-white/10" />
              <div className="h-20 w-full rounded bg-white/10" />
            </div>
            <div className="min-h-80 bg-white/10" />
          </div>
        </Container>
      </div>
    </div>
  );
}

export function BlogIndexView() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const categoriesQuery = useBlogCategories();
  const postsQuery = useBlogPosts({
    category: selectedCategory || undefined,
  });

  const posts = postsQuery.data ?? [];
  const featuredPost = posts.find((post) => post.is_featured) ?? posts[0];
  const remainingPosts = featuredPost
    ? posts.filter((post) => post.id !== featuredPost.id)
    : [];
  const editorialPosts = remainingPosts.slice(0, 3);
  const gridPosts = remainingPosts.slice(3);
  const visiblePosts = gridPosts.slice(0, visibleCount);
  const firstGrid = visiblePosts.slice(0, PAGE_SIZE);
  const continuedGrid = visiblePosts.slice(PAGE_SIZE);
  const remainingCount = Math.max(gridPosts.length - visiblePosts.length, 0);

  const categoryTabs = [
    { label: "All stories", value: "" },
    ...(categoriesQuery.data ?? []).map((category) => ({
      label: category.name,
      value: category.slug,
    })),
  ];

  function selectCategory(value: string) {
    setSelectedCategory(value);
    setVisibleCount(PAGE_SIZE);
  }

  if (postsQuery.isLoading) return <BlogLoadingState />;

  if (postsQuery.isError) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <BookOpenText className="mx-auto size-10 text-[#E86C0D]" />
            <h1 className="mt-4 text-2xl font-bold text-[#0F172A]">
              The blog could not be loaded
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              We could not reach the public content service. Please try again.
            </p>
            <Button
              type="button"
              onClick={() => postsQuery.refetch()}
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

  if (!featuredPost) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center">
            <BookOpenText className="mx-auto size-10 text-[#38A3A5]" />
            <h1 className="mt-4 text-3xl font-bold text-[#0F172A]">
              Stories are on the way
            </h1>
            <p className="mt-3 text-[#64748B]">
              Our editorial team is preparing practical guides, career
              insights, and learner stories.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <MarketingLayout className="bg-[#F8FAFC]">
      <FeaturedPost post={featuredPost} />

      <FilterSection sticky className="top-0">
        <CategoryTabs
          categories={categoryTabs}
          value={selectedCategory}
          onValueChange={selectCategory}
          ariaLabel="Filter blog posts by category"
        />
      </FilterSection>

      {editorialPosts.length > 0 && (
        <GridSection
          className="py-0"
          title={
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
              Editor&apos;s picks
            </h2>
          }
          description={
            <p className="max-w-2xl text-sm leading-6 text-[#64748B]">
              Fresh perspectives on learning, building, and growing a career
              in technology.
            </p>
          }
        >
          <FeaturedBlogGrid
            primary={<BlogCard post={editorialPosts[0]} variant="large" />}
            secondary={editorialPosts
              .slice(1)
              .map((post) => (
                <BlogCard key={post.id} post={post} variant="compact" />
              ))}
          />
        </GridSection>
      )}

      {firstGrid.length > 0 && (
        <GridSection
          className="bg-white"
          title={
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
              Latest from LearnerSlate
            </h2>
          }
        >
          <AutoGrid>
            {firstGrid.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </AutoGrid>
        </GridSection>
      )}

      <section className="bg-[#07111F] py-12 text-white lg:py-16">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#57CC99]">
                The LearnerSlate Edit
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Useful ideas, once a week.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#94A3B8]">
                Practical engineering lessons, learning roadmaps, and career
                advice. No noise, no daily spam.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>

      {continuedGrid.length > 0 && (
        <GridSection className="py-0">
          <AutoGrid>
            {continuedGrid.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </AutoGrid>
        </GridSection>
      )}

      <section className="pb-20 lg:pb-24">
        <Container>
          <LoadMore
            remaining={remainingCount}
            onClick={() =>
              setVisibleCount((current) => current + PAGE_SIZE)
            }
          />
        </Container>
      </section>
    </MarketingLayout>
  );
}
