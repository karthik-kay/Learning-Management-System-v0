import Link from "next/link";
import { Search } from "lucide-react";

import { Stack, Inline } from "@/components/shared/primitives";
import {
  PublicButton,
  PublicLink,
} from "@/components/public/widgets/foundation";

interface AuthNavigationProps {
  mobile?: boolean;
}

export function AuthNavigation({ mobile = false }: AuthNavigationProps) {
  if (mobile) {
    return (
      <Stack gap={10}>
        <Link
          href="/search"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
        >
          <Search className="size-4" />
          Search LearnerSlate
        </Link>
        <p className="text-center text-xs text-slate-500">
          Ready to continue your learning?
        </p>
        <Link
          href="/login"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Log in
        </Link>

        <Link
          href="/register"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
        >
          Join for free
        </Link>
      </Stack>
    );
  }

  return (
    <Inline gap={16}>
      <PublicLink
        href="/search"
        aria-label="Search LearnerSlate"
        variant="nav"
        className="size-9 justify-center p-0"
      >
        <Search className="size-4" />
      </PublicLink>
      <PublicLink href="/login" variant="nav">
        Login
      </PublicLink>

      <PublicButton asChild variant="conversion" size="md">
        <Link href="/register">Join For Free</Link>
      </PublicButton>
    </Inline>
  );
}
