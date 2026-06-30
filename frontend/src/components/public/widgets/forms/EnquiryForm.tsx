"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { publicService } from "@/services/public";

const fieldClass =
  "h-11 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-sm outline-none transition focus:border-[#38A3A5] focus:ring-4 focus:ring-[#38A3A5]/10";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      await publicService.submitPartnerEnquiry({
        organization_name: String(form.get("organization_name") ?? ""),
        contact_name: String(form.get("contact_name") ?? ""),
        work_email: String(form.get("work_email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        partnership_type: String(form.get("partnership_type")) as "institution" | "pro" | "placement",
        website_url: String(form.get("website_url") ?? ""),
        organization_size: String(form.get("organization_size") ?? ""),
        message: String(form.get("message") ?? ""),
        honeypot: String(form.get("website") ?? ""),
      });
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)]">
      <h2 className="text-2xl font-bold text-[#0F172A]">Start a partnership</h2>
      <p className="mt-2 text-sm text-[#64748B]">Tell us about your organisation and partnership goal.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input name="organization_name" required placeholder="Organisation name" className={fieldClass} />
        <input name="contact_name" required placeholder="Contact name" className={fieldClass} />
        <input name="work_email" required type="email" placeholder="Work email" className={fieldClass} />
        <input name="phone" required placeholder="Phone" className={fieldClass} />
        <select name="partnership_type" required className={fieldClass} defaultValue="">
          <option value="" disabled>Partnership type</option>
          <option value="institution">Institution Partner</option>
          <option value="pro">PRO Partner</option>
          <option value="placement">Placement Partner</option>
        </select>
        <input name="organization_size" placeholder="Organisation size" className={fieldClass} />
        <input name="website_url" type="url" placeholder="Website URL" className={`${fieldClass} sm:col-span-2`} />
        <textarea name="message" required rows={5} placeholder="What would you like to build together?" className={`${fieldClass} h-auto py-3 sm:col-span-2`} />
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>
      <Button type="submit" size="lg" disabled={status === "sending"} className="mt-5 w-full bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
        <Send className="size-4" />{status === "sending" ? "Submitting..." : "Send enquiry"}
      </Button>
      <div aria-live="polite" className="mt-3 min-h-5 text-sm">
        {status === "success" && <p className="inline-flex items-center gap-2 text-emerald-700"><CheckCircle2 className="size-4" />Enquiry received. Our partnerships team will respond.</p>}
        {status === "error" && <p className="text-red-600">We couldn&apos;t send your enquiry. Please try again.</p>}
      </div>
    </form>
  );
}
