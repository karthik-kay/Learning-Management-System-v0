import { ReactNode } from "react";

import { Container } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

export interface PublicStat {
  value: ReactNode;
  label: ReactNode;
}

interface StatsSectionProps {
  stats: PublicStat[];
  className?: string;
}

export function StatsSection({ stats, className }: StatsSectionProps) {
  return (
    <section className={cn("py-10", className)}>
      <Container>
        <dl className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-b border-slate-200 p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
            >
              <dd className="text-3xl font-black tracking-tight text-slate-950">
                {stat.value}
              </dd>
              <dt className="mt-1 text-sm font-medium text-slate-500">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
