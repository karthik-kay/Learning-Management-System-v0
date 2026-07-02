import {
  Award,
  Clock3,
  ExternalLink,
  Gauge,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  PublicButton,
  PublicChip,
} from "@/components/public/widgets/foundation";
import { Card } from "@/components/ui/card";

export type CertificationType = "Program" | "Track" | "Course";
export type CertificationDomain =
  | "Full Stack"
  | "Data"
  | "AI"
  | "DevOps"
  | "Security";

export interface CertificationCardData {
  id: string;
  title: string;
  description: string;
  type: CertificationType;
  domain: CertificationDomain;
  level: string;
  duration: string;
  skills: string[];
  href: string;
  image?: string | null;
}

interface CertificationCardProps {
  certification: CertificationCardData;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const image = certification.image || "/certificate-template.png";

  return (
    <Card
      data-slot="certification-card"
      className="group/certification-card flex h-full flex-col gap-5 overflow-hidden rounded-2xl border-public-neutral-200 bg-white p-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-public-teal-200 hover:shadow-[0_18px_48px_rgba(34,87,122,0.1)]"
    >
      <div className="relative aspect-[16/7] overflow-hidden border-b border-public-neutral-200 bg-public-neutral-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover/certification-card:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
          style={{ backgroundImage: `url("${image}")` }}
        />

        {!certification.image ? (
          <div className="absolute inset-0 grid place-items-center bg-white/12">
            <div className="flex items-center gap-2 rounded-lg border border-public-blue-100 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
              <Award className="size-5 text-public-teal-700" />
              <span className="text-xs font-extrabold text-public-blue-900">
                LearnerSlate Credential
              </span>
            </div>
          </div>
        ) : null}

        <div className="absolute right-3 top-3">
          <PublicChip variant="accent" size="sm">
            {certification.type}
          </PublicChip>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div>
          <h3 className="text-xl font-bold leading-tight text-[#0F172A]">
            {certification.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-public-neutral-500">
            {certification.description}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-public-neutral-200 py-4">
          <CertificationMeta
            icon={<Layers3 />}
            value={certification.domain}
          />
          <CertificationMeta
            icon={<Gauge />}
            value={certification.level}
          />
          <CertificationMeta
            icon={<Clock3 />}
            value={certification.duration}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {certification.skills.map((skill) => (
            <PublicChip key={skill} variant="outline" size="sm">
              {skill}
            </PublicChip>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-public-mint-800">
            <ShieldCheck className="size-4" />
            Verifiable
          </span>
          <PublicButton asChild variant="primary" size="sm">
            <Link href={certification.href}>
              Details
              <ExternalLink className="size-4" />
            </Link>
          </PublicButton>
        </div>
      </div>
    </Card>
  );
}

function CertificationMeta({
  icon,
  value,
}: {
  icon: ReactNode;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center text-public-teal-700 [&_svg]:size-4">
        {icon}
      </span>
      <strong
        className="block min-w-0 text-xs font-bold leading-tight text-public-blue-900"
        title={value}
      >
        {value}
      </strong>
    </div>
  );
}
