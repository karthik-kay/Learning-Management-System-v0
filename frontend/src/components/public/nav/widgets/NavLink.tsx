import { ReactNode } from "react";

import { PublicLink } from "@/components/public/widgets/foundation";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <PublicLink
      href={href}
      variant="nav"
      size="md"
    >
      {children}
    </PublicLink>
  );
}
