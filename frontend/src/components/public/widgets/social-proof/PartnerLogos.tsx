import { Building2 } from "lucide-react";

import { LogoChip } from "@/components/public/widgets/display/LogoChip";

interface PartnerLogosProps {
  partners: string[];
}

export function PartnerLogos({ partners }: PartnerLogosProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {partners.map((partner) => (
        <LogoChip key={partner} className="min-h-20 gap-2 text-center">
          <Building2 aria-hidden="true" className="size-4 shrink-0 text-[#38A3A5]" />
          <span>{partner}</span>
        </LogoChip>
      ))}
    </div>
  );
}
