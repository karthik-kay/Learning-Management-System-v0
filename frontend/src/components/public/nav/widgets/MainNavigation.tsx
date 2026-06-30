"use client";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Code2,
  GraduationCap,
  Map,
  MessageSquareText,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Inline } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";
import { ExploreDropdown } from "./ExploreDropdown";
import { NavLink } from "./NavLink";

interface MainNavigationProps {
  mobile?: boolean;
}

const mobileGroups = [
  {
    title: "Learn",
    items: [
      {
        label: "Programs",
        description: "Structured career-focused learning",
        href: "/programs",
        icon: GraduationCap,
      },
      {
        label: "Courses",
        description: "Focused skills and practical projects",
        href: "/courses",
        icon: BookOpen,
      },
      {
        label: "Roadmaps",
        description: "Step-by-step learning paths",
        href: "/roadmaps",
        icon: Map,
      },
      {
        label: "Certifications",
        description: "Verifiable proof of your skills",
        href: "/certifications",
        icon: Award,
      },
      {
        label: "Practice",
        description: "Assessments and coding challenges",
        href: "/practice",
        icon: Code2,
      },
    ],
  },
  {
    title: "Career & community",
    items: [
      {
        label: "Career paths",
        description: "Roles, salaries, and required skills",
        href: "/career-path",
        icon: BriefcaseBusiness,
      },
      {
        label: "Placements",
        description: "Outcomes and hiring support",
        href: "/placements",
        icon: Sparkles,
      },
      {
        label: "Mentors",
        description: "Learn from working professionals",
        href: "/mentors",
        icon: Users,
      },
      {
        label: "Events",
        description: "Webinars, workshops, and hackathons",
        href: "/events",
        icon: CalendarDays,
      },
      {
        label: "Reviews",
        description: "Honest feedback from verified learners",
        href: "/reviews",
        icon: MessageSquareText,
      },
    ],
  },
];

export function MainNavigation({ mobile = false }: MainNavigationProps) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <div className="space-y-7">
        {mobileGroups.map((group) => (
          <section key={group.title}>
            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {group.title}
            </p>
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex min-h-16 items-center gap-3 rounded-xl border px-3 py-2.5 transition",
                      active
                        ? "border-orange-200 bg-orange-50 shadow-sm"
                        : "border-transparent bg-white hover:border-slate-200 hover:shadow-sm",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-lg transition",
                        active
                          ? "bg-orange-500 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-600",
                      )}
                    >
                      <Icon className="size-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block text-sm font-bold",
                          active ? "text-orange-700" : "text-slate-900",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {item.description}
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "size-4 shrink-0 transition group-hover:translate-x-0.5",
                        active ? "text-orange-500" : "text-slate-300",
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <Inline justify="start" gap={32}>
      <ExploreDropdown />
      <NavLink href="/programs">Programs</NavLink>
      <NavLink href="/certifications">Certifications</NavLink>
      <NavLink href="/placements">Placement</NavLink>
      <NavLink href="/reviews">Reviews</NavLink>
    </Inline>
  );
}
