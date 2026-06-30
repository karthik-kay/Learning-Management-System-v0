"use client";

import { useMemo } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  RefreshCcw,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { TwoColumnDetailLayout } from "@/components/public/layouts/TwoColumnDetailLayout";
import { ArticleSection } from "@/components/public/sections/article/ArticleSection";
import {
  BlogArticle,
  slugifyArticleHeading,
} from "@/components/public/sections/article/variants/BlogArticle";
import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { GridSection } from "@/components/public/sections/grid/GridSection";
import { ThreeColumnGrid } from "@/components/public/sections/grid/variants/ThreeColumnGrid";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { BlogCard } from "@/components/public/widgets/cards/BlogCard";
import {
  AnchorNav,
  AnchorNavItem,
} from "@/components/public/widgets/display/AnchorNav";
import { Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { useBlogPost, useBlogPosts } from "@/hooks/queries/public";

interface BlogPostViewProps {
  slug: string;
}

function formatPublishedDate(value: string | null) {
  if (!value) return "Recently published";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function extractTableOfContents(body: string): AnchorNavItem[] {
  return body
    .split("\n")
    .flatMap<AnchorNavItem>((line) => {
      const match = /^(##|###)\s+(.+)$/.exec(line.trim());
      if (!match) return [];

      const label = match[2].replace(/[*_`~[\]]/g, "").trim();
      return [
        {
          id: slugifyArticleHeading(label),
          label,
          level: match[1] === "###" ? 3 : 2,
        },
      ];
    });
}

export function BlogPostView({ slug }: BlogPostViewProps) {
  const postQuery = useBlogPost(slug);
  const relatedQuery = useBlogPosts({
    category: postQuery.data?.category?.slug,
  });

  const post = postQuery.data;
  const tableOfContents = useMemo(
    () => extractTableOfContents(post?.body ?? ""),
    [post?.body],
  );
  const relatedPosts = (relatedQuery.data ?? [])
    .filter((candidate) => candidate.slug !== slug)
    .slice(0, 3);

  if (postQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="bg-[#07111F] py-20">
          <Container size="lg">
            <div className="mx-auto h-6 w-28 rounded-full bg-white/10" />
            <div className="mx-auto mt-6 h-14 max-w-3xl rounded bg-white/10" />
            <div className="mx-auto mt-4 h-14 max-w-2xl rounded bg-white/10" />
            <div className="mt-10 h-[420px] rounded-3xl bg-white/10" />
          </Container>
        </div>
      </div>
    );
  }

  if (postQuery.isError || !post) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              We couldn&apos;t find that article
            </h1>
            <p className="mt-3 text-[#64748B]">
              It may have moved, or the content service may be temporarily
              unavailable.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline">
                <Link href="/blog">
                  <ArrowLeft className="size-4" />
                  Back to blog
                </Link>
              </Button>
              <Button
                type="button"
                onClick={() => postQuery.refetch()}
                className="bg-[#0F172A] text-white hover:bg-[#1E293B]"
              >
                <RefreshCcw className="size-4" />
                Try again
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <HeroSection className="bg-[#07111F] py-12 text-white lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to all stories
          </Link>

          {post.category && (
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#57CC99]">
              {post.category.name}
            </p>
          )}
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#CBD5E1]">
            {post.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-[#94A3B8]">
            <span className="inline-flex items-center gap-2">
              <UserRound className="size-4 text-[#57CC99]" />
              {post.author_name || "LearnerSlate Editorial"}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-[#57CC99]" />
              {formatPublishedDate(post.published_at)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-4 text-[#57CC99]" />
              {post.reading_time_minutes || 1} min read
            </span>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#22577A] via-[#38A3A5] to-[#57CC99] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
            <div
              role="img"
              aria-label=""
              className="min-h-[320px] bg-cover bg-center sm:min-h-[440px] lg:min-h-[560px]"
              style={
                post.cover_image_url
                  ? { backgroundImage: `url("${post.cover_image_url}")` }
                  : undefined
              }
            />
          </div>
        </div>
      </HeroSection>

      <TwoColumnDetailLayout
        sidebar={<AnchorNav items={tableOfContents} />}
        className="bg-white py-14 lg:py-20"
      >
        <ArticleSection>
          <BlogArticle body={post.body} />

          <aside className="mt-14 rounded-2xl border border-[#DDE7EF] bg-[#F8FAFC] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#22577A] text-lg font-bold text-white">
                {(post.author_name || "L").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#38A3A5]">
                  Written by
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#0F172A]">
                  {post.author_name || "LearnerSlate Editorial"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  Practical guidance from the LearnerSlate team, mentors, and
                  working professionals building in the field.
                </p>
              </div>
            </div>
          </aside>
        </ArticleSection>
      </TwoColumnDetailLayout>

      {relatedPosts.length > 0 && (
        <GridSection
          className="bg-[#F8FAFC]"
          title={
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
              Keep reading
            </h2>
          }
          description={
            <p className="text-sm text-[#64748B]">
              More ideas from the same corner of the industry.
            </p>
          }
        >
          <ThreeColumnGrid>
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </ThreeColumnGrid>
        </GridSection>
      )}

      <CTASection className="bg-white py-16 lg:py-20">
        <div className="rounded-3xl bg-[#0F172A] px-6 py-12 text-white shadow-[0_28px_80px_rgba(15,23,42,0.2)] sm:px-10">
          <CenterCTA
            eyebrow="Turn insight into progress"
            title="Build the skills behind the story."
            description="Explore structured programs, practical projects, and mentor support designed for real career outcomes."
            primaryAction={
              <Button
                asChild
                size="lg"
                className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
              >
                <Link href="/programs">Explore programs</Link>
              </Button>
            }
            secondaryAction={
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/blog">Read more stories</Link>
              </Button>
            }
          />
        </div>
      </CTASection>
    </>
  );
}
