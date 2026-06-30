import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

interface BlogArticleProps {
  body: string;
}

export function slugifyArticleHeading(value: ReactNode) {
  return String(value)
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function BlogArticle({ body }: BlogArticleProps) {
  return (
    <div className="max-w-none text-[1.04rem] leading-8 text-[#334155] [&_a]:font-semibold [&_a]:text-[#22577A] [&_a]:underline [&_a]:decoration-[#38A3A5]/50 [&_a]:underline-offset-4 [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#38A3A5] [&_blockquote]:bg-[#F0FDFA] [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:font-medium [&_blockquote]:text-[#22577A] [&_code]:rounded [&_code]:bg-[#E2E8F0] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[#0F172A] [&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:scroll-mt-28 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#0F172A] [&_hr]:my-10 [&_hr]:border-[#E2E8F0] [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[#0F172A] [&_pre]:p-5 [&_pre]:text-sm [&_pre]:text-[#E2E8F0] [&_strong]:font-bold [&_strong]:text-[#0F172A] [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6">
      <ReactMarkdown
        components={{
          h2({ children }) {
            return (
              <h2 id={slugifyArticleHeading(children)}>{children}</h2>
            );
          },
          h3({ children }) {
            return (
              <h3 id={slugifyArticleHeading(children)}>{children}</h3>
            );
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
