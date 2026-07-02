"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type OrgNode = {
  id: string;
  name: string;
  role: string;
  image?: string;
  children?: OrgNode[];
};

type Tier = {
  label: string;
  abbr: string;
  ring: string;
  dot: string;
  line: string;
  ribbon: string;
  avatarBg: string;
  avatarText: string;
  pill: string;
  cardBg: string;
  hoverBorder: string;
};

const TIERS: Tier[] = [
  {
    label: "Leadership",
    abbr: "L1",
    ring: "ring-amber-300",
    dot: "bg-amber-400",
    line: "bg-amber-300",
    ribbon: "bg-amber-500",
    avatarBg: "bg-amber-100",
    avatarText: "text-amber-800",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    cardBg: "bg-gradient-to-b from-amber-50/70 to-white",
    hoverBorder: "hover:border-amber-300",
  },
  {
    label: "Management",
    abbr: "L2",
    ring: "ring-indigo-300",
    dot: "bg-indigo-400",
    line: "bg-indigo-300",
    ribbon: "bg-indigo-500",
    avatarBg: "bg-indigo-100",
    avatarText: "text-indigo-800",
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
    cardBg: "bg-white",
    hoverBorder: "hover:border-indigo-300",
  },
  {
    label: "Faculty",
    abbr: "L3",
    ring: "ring-teal-300",
    dot: "bg-teal-400",
    line: "bg-teal-300",
    ribbon: "bg-teal-500",
    avatarBg: "bg-teal-100",
    avatarText: "text-teal-800",
    pill: "bg-teal-50 text-teal-700 border-teal-200",
    cardBg: "bg-white",
    hoverBorder: "hover:border-teal-300",
  },
  {
    label: "Staff",
    abbr: "L4",
    ring: "ring-slate-300",
    dot: "bg-slate-400",
    line: "bg-slate-300",
    ribbon: "bg-slate-500",
    avatarBg: "bg-slate-100",
    avatarText: "text-slate-700",
    pill: "bg-slate-50 text-slate-600 border-slate-200",
    cardBg: "bg-white",
    hoverBorder: "hover:border-slate-300",
  },
];

function tierFor(depth: number): Tier {
  return TIERS[Math.min(depth, TIERS.length - 1)];
}

function countDescendants(node: OrgNode): number {
  if (!node.children?.length) return 0;
  return node.children.reduce((sum, c) => sum + 1 + countDescendants(c), 0);
}

type OrgTreeProps = {
  node: OrgNode;
  className?: string;
};

export function OrgTree({ node, className }: OrgTreeProps) {
  return (
    <div className={cn("w-full overflow-x-auto py-12 bg-slate-50", className)}>
      <div className="inline-flex min-w-full justify-center px-10">
        <OrgNodeView node={node} depth={0} />
      </div>
    </div>
  );
}

type OrgNodeViewProps = {
  node: OrgNode;
  depth: number;
};

function OrgNodeView({ node, depth }: OrgNodeViewProps) {
  const [expanded, setExpanded] = React.useState(true);
  const hasChildren = !!node.children?.length;
  const tier = tierFor(depth);
  const hiddenCount = !expanded ? countDescendants(node) : 0;

  return (
    <div className="flex flex-col items-center">
      <OrgCard
        node={node}
        depth={depth}
        tier={tier}
        hasChildren={hasChildren}
        expanded={expanded}
        hiddenCount={hiddenCount}
        onToggle={() => setExpanded((e) => !e)}
      />

      {hasChildren && expanded && (
        <div className="flex flex-col items-center">
          <div className={cn("h-8 w-px", tier.line)} />

          <div className="flex items-start gap-10 pt-0">
            {node.children!.map((child, i) => {
              const isFirst = i === 0;
              const isLast = i === node.children!.length - 1;
              const childTier = tierFor(depth + 1);
              return (
                <div key={child.id} className="flex flex-col items-center">
                  {/* branch spine segment + node dot */}
                  <div className="flex h-2.5 w-full items-center">
                    <div
                      className={cn(
                        "h-px flex-1",
                        isFirst ? "bg-transparent" : tier.line,
                      )}
                    />
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full ring-2 ring-white",
                        childTier.dot,
                      )}
                    />
                    <div
                      className={cn(
                        "h-px flex-1",
                        isLast ? "bg-transparent" : tier.line,
                      )}
                    />
                  </div>
                  <div className={cn("h-6 w-px", childTier.line)} />
                  <OrgNodeView node={child} depth={depth + 1} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

type OrgCardProps = {
  node: OrgNode;
  depth: number;
  tier: Tier;
  hasChildren: boolean;
  expanded: boolean;
  hiddenCount: number;
  onToggle: () => void;
};

function OrgCard({
  node,
  depth,
  tier,
  hasChildren,
  expanded,
  hiddenCount,
  onToggle,
}: OrgCardProps) {
  const isRoot = depth === 0;
  const avatarSize = isRoot ? 80 : 64;

  return (
    <article
      className={cn(
        "group relative rounded-2xl border border-slate-200 p-5 text-center shadow-sm transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-lg",
        tier.cardBg,
        tier.hoverBorder,
        isRoot ? "w-64 pt-6" : "w-56",
      )}
    >
      {/* rank ribbon */}
      <span
        className={cn(
          "absolute right-0 top-0 rounded-tr-2xl rounded-bl-lg px-2.5 py-1 text-xs font-bold text-white",
          tier.ribbon,
        )}
      >
        {tier.abbr}
      </span>

      {node.image ? (
        <Image
          src={node.image}
          alt={node.name}
          width={avatarSize}
          height={avatarSize}
          className={cn(
            "mx-auto mb-4 rounded-full object-cover ring-4",
            tier.ring,
            isRoot ? "size-20" : "size-16",
          )}
        />
      ) : (
        <div
          className={cn(
            "mx-auto mb-4 flex items-center justify-center rounded-full font-bold ring-4",
            tier.avatarBg,
            tier.avatarText,
            tier.ring,
            isRoot ? "size-20 text-xl" : "size-16 text-lg",
          )}
        >
          {getInitials(node.name)}
        </div>
      )}

      <h3
        className={cn(
          "font-bold tracking-tight text-slate-900",
          isRoot ? "text-lg" : "text-base",
        )}
      >
        {node.name}
      </h3>
      <p className="mt-0.5 text-sm font-medium text-slate-500">{node.role}</p>

      <span
        className={cn(
          "mt-3 inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
          tier.pill,
        )}
      >
        {tier.label}
      </span>

      {hasChildren && (
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "absolute -bottom-3 left-1/2 flex h-6 min-w-6 -translate-x-1/2 items-center justify-center gap-1 rounded-full border border-slate-300 bg-white px-1.5 text-slate-500 shadow-sm transition-colors",
            "hover:border-slate-400 hover:text-slate-800",
          )}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? (
            <ChevronDown className="size-3.5" />
          ) : (
            <ChevronRight className="size-3.5" />
          )}
          {!expanded && hiddenCount > 0 && (
            <span className="pr-0.5 text-xs font-semibold">{hiddenCount}</span>
          )}
        </button>
      )}
    </article>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
