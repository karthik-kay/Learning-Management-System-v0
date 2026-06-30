import { ReactNode } from "react";
import { Box, Container, Inline } from "@/components/shared/primitives";

interface TwoColumnDetailLayoutProps {
  children: ReactNode; // main content — left col
  sidebar: ReactNode; // sticky right col — enroll card, skills etc
  sidebarWidth?: string;
  className?: string;
}
export function TwoColumnDetailLayout({
  children,
  sidebar,
  sidebarWidth = "300px",
  className,
}: TwoColumnDetailLayoutProps) {
  return (
    <Box className={className}>
      <Container>
        <Inline
          align="start"
          justify="start"
          gap={48}
          className="
        flex-col
        lg:flex-row
        relative
    "
        >
          <Box grow shrink className="min-w-0">
            {children}
          </Box>
          <Box
            shrink
            style={{ "--sidebar-width": sidebarWidth } as React.CSSProperties}
            className="
        w-full
        lg:w-[var(--sidebar-width)]
        lg:shrink-0
    "
          >
            <Box className="lg:sticky lg:top-24">{sidebar}</Box>
          </Box>
        </Inline>
      </Container>
    </Box>
  );
}
