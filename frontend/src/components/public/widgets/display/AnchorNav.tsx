import { cn } from "@/lib/utils";

export interface AnchorNavItem {
  id: string;
  label: string;
  level?: 2 | 3;
}

interface AnchorNavProps {
  items: AnchorNavItem[];
  title?: string;
  className?: string;
}

export function AnchorNav({
  items,
  title = "In this article",
  className,
}: AnchorNavProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label={title}
      className={cn(
        "rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]",
        className,
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#22577A]">
        {title}
      </p>
      <ol className="mt-4 space-y-3 border-l border-[#E2E8F0]">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "pl-3")}
          >
            <a
              href={`#${item.id}`}
              className="block -ml-px border-l-2 border-transparent pl-4 text-sm leading-5 text-[#64748B] transition hover:border-[#38A3A5] hover:text-[#22577A]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
