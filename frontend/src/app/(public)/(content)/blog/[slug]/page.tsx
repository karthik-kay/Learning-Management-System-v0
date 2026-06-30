import { Metadata } from "next";

import { BlogPostView } from "@/components/public/sections/article/variants/BlogPostView";
import { publicService } from "@/services/public";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await publicService.getBlogPost(slug);
    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        images: post.cover_image_url ? [post.cover_image_url] : undefined,
        type: "article",
        publishedTime: post.published_at ?? undefined,
        authors: post.author_name ? [post.author_name] : undefined,
      },
    };
  } catch {
    return {
      title: "Blog | LearnerSlate",
      description:
        "Practical learning, engineering, and career insights from LearnerSlate.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <BlogPostView slug={slug} />;
}
