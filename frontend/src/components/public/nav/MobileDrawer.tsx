"use client";

import { MouseEvent, ReactNode, useState } from "react";
import { Menu, Sparkles } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/public/nav/widgets/Logo";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  links?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function MobileDrawer({ links, actions, className }: MobileDrawerProps) {
  const [open, setOpen] = useState(false);

  function closeAfterNavigation(event: MouseEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          "w-[min(92vw,420px)] gap-0 overflow-hidden border-l-0 bg-slate-50 p-0 sm:max-w-[420px] [&>button]:right-5 [&>button]:top-5 [&>button]:grid [&>button]:size-9 [&>button]:place-items-center [&>button]:rounded-lg [&>button]:bg-white/10 [&>button]:text-white",
          className,
        )}
        onClick={closeAfterNavigation}
      >
        <SheetHeader className="border-b border-white/10 bg-slate-950 px-6 py-6 text-left text-white">
          <div className="w-36 rounded-lg bg-white px-2 py-1 [&_img]:h-auto [&_img]:w-full">
            <Logo />
          </div>
          <SheetTitle className="mt-5 flex items-center gap-2 text-lg text-white">
            <Sparkles className="size-4 text-orange-400" />
            Explore LearnerSlate
          </SheetTitle>
          <SheetDescription className="max-w-xs leading-5 text-slate-400">
            Find the right program, roadmap, mentor, or career resource.
          </SheetDescription>
        </SheetHeader>

        <nav
          aria-label="Mobile navigation"
          className="min-h-0 flex-1 overflow-y-auto px-4 py-5"
        >
          {links}
        </nav>

        {actions && (
          <SheetFooter className="border-t border-slate-200 bg-white px-5 py-5 shadow-[0_-12px_35px_rgba(15,23,42,0.06)]">
            {actions}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
