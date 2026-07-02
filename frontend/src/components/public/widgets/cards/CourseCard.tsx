import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import Link from "next/link";

import {
  PublicButton,
  PublicChip,
} from "@/components/public/widgets/foundation";
import { cn } from "@/lib/utils";

export interface PublicCourseCardData {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: number;
  skills: string[];
  href: string;
  image?: string | null;
  featured?: boolean;
}

interface CourseCardProps {
  course: PublicCourseCardData;
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  const featured = Boolean(course.featured);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border transition-[transform,border-color] duration-200 hover:-translate-y-1 motion-reduce:transform-none",
        featured
          ? "border-public-blue-900 bg-public-blue-900"
          : "border-public-neutral-200 bg-white hover:border-public-teal-300",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/8] overflow-hidden",
          featured ? "bg-public-blue-800" : "bg-public-neutral-100",
        )}
      >
        {course.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.image}
            alt=""
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          <div className="grid size-full place-items-center">
            <BookOpen
              className={cn(
                "size-10",
                featured
                  ? "text-public-teal-300"
                  : "text-public-teal-700",
              )}
            />
          </div>
        )}
        <PublicChip
          className="absolute right-3 top-3"
          variant={featured ? "accent" : "brand"}
          size="sm"
        >
          {course.level}
        </PublicChip>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3
          className={cn(
            "text-xl font-extrabold tracking-[-0.02em]",
            featured ? "text-white" : "text-public-neutral-900",
          )}
        >
          {course.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm leading-6",
            featured
              ? "text-public-blue-100"
              : "text-public-neutral-700",
          )}
        >
          {course.description}
        </p>

        <div
          className={cn(
            "mt-5 flex gap-5 border-y py-4 text-xs font-bold",
            featured
              ? "border-white/15 text-public-blue-100"
              : "border-public-neutral-200 text-public-blue-900",
          )}
        >
          <span className="inline-flex items-center gap-2">
            <Clock3 className="size-4 text-public-teal-500" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-2">
            <BookOpen className="size-4 text-public-teal-500" />
            {course.modules} modules
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {course.skills.map((skill) => (
            <PublicChip
              key={skill}
              variant={featured ? "brand" : "outline"}
              size="sm"
            >
              {skill}
            </PublicChip>
          ))}
        </div>

        <PublicButton
          asChild
          className="mt-6 w-full"
          variant={featured ? "conversion" : "secondary"}
          size="md"
        >
          <Link href={course.href}>
            View course
            <ArrowRight />
          </Link>
        </PublicButton>
      </div>
    </article>
  );
}
