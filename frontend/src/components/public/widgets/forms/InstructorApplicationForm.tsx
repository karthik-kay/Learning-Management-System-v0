"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { publicService } from "@/services/public";

const fieldClass =
  "h-11 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-sm outline-none transition focus:border-[#38A3A5] focus:ring-4 focus:ring-[#38A3A5]/10";

export function InstructorApplicationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      await publicService.submitInstructorApplication({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        current_role: String(form.get("current_role") ?? ""),
        company: String(form.get("company") ?? ""),
        expertise: String(form.get("expertise") ?? "")
          .split(",").map((item) => item.trim()).filter(Boolean),
        years_experience: Number(form.get("years_experience") ?? 0),
        linkedin_url: String(form.get("linkedin_url") ?? ""),
        portfolio_url: String(form.get("portfolio_url") ?? ""),
        motivation: String(form.get("motivation") ?? ""),
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
      <h2 className="text-2xl font-bold text-[#0F172A]">Apply to teach</h2>
      <p className="mt-2 text-sm text-[#64748B]">Tell us what you can teach and the experience you bring.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full name" className={fieldClass} />
        <input name="email" required type="email" placeholder="Email" className={fieldClass} />
        <input name="phone" required placeholder="Phone" className={fieldClass} />
        <input name="years_experience" required type="number" min="0" placeholder="Years of experience" className={fieldClass} />
        <input name="current_role" required placeholder="Current role" className={fieldClass} />
        <input name="company" placeholder="Company" className={fieldClass} />
        <input name="expertise" required placeholder="Expertise (comma separated)" className={`${fieldClass} sm:col-span-2`} />
        <input name="linkedin_url" type="url" placeholder="LinkedIn URL" className={fieldClass} />
        <input name="portfolio_url" type="url" placeholder="Portfolio or website" className={fieldClass} />
        <textarea name="motivation" required rows={5} placeholder="Why do you want to teach with LearnerSlate?" className={`${fieldClass} h-auto py-3 sm:col-span-2`} />
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>
      <Button type="submit" size="lg" disabled={status === "sending"} className="mt-5 w-full bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
        <Send className="size-4" />{status === "sending" ? "Submitting..." : "Submit application"}
      </Button>
      <div aria-live="polite" className="mt-3 min-h-5 text-sm">
        {status === "success" && <p className="inline-flex items-center gap-2 text-emerald-700"><CheckCircle2 className="size-4" />Application received. We&apos;ll be in touch.</p>}
        {status === "error" && <p className="text-red-600">We couldn&apos;t submit your application. Please try again.</p>}
      </div>
    </form>
  );
}
