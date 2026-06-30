import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";

import { BlogPostListItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/primitives";

interface FeaturedPostProps {
  post: BlogPostListItem;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="bg-[#07111F] py-10 text-white lg:py-16">
      <Container>
        <article className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#0F1D2E] shadow-[0_30px_100px_rgba(0,0,0,0.3)] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FF7A0E] px-3 py-1.5 text-white">
                <Sparkles className="size-3.5" />
                Featured
              </span>
              {post.category && (
                <span className="text-[#57CC99]">{post.category.name}</span>
              )}
            </div>

            <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#CBD5E1]">
              {post.excerpt}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#94A3B8]">
              <span className="font-semibold text-white">
                {post.author_name || "LearnerSlate Editorial"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4 text-[#57CC99]" />
                {post.reading_time_minutes || 1} min read
              </span>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-8 w-fit bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
            >
              <Link href={`/blog/${post.slug}`}>
                Read featured story
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="min-h-[320px] overflow-hidden bg-gradient-to-br from-[#22577A] via-[#38A3A5] to-[#57CC99] lg:min-h-[520px]"
          >
            <div
              role="img"
              aria-label=""
              className="h-full min-h-[320px] w-full bg-cover bg-center transition duration-700 hover:scale-[1.025] lg:min-h-[520px]"
              style={
                post.cover_image_url
                  ? { backgroundImage: `url("${post.cover_image_url}")` }
                  : undefined
              }
            />
          </Link>
        </article>
      </Container>
    </section>
  );
}
