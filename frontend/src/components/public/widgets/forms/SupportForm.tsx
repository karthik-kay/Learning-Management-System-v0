"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { publicService } from "@/services/public";
import { PublicSupportCategory } from "@/types";

const fieldClass =
  "h-11 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#38A3A5] focus:ring-4 focus:ring-[#38A3A5]/10";

export function SupportForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [reference, setReference] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const receipt = await publicService.submitSupportRequest({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        category: String(form.get("category")) as PublicSupportCategory,
        subject: String(form.get("subject") ?? ""),
        message: String(form.get("message") ?? ""),
        source_path: pathname,
        honeypot: String(form.get("website") ?? ""),
      });
      setReference(receipt.reference_code);
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-8"
    >
      <h2 className="text-2xl font-black text-[#0F172A]">
        Send a support request
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#64748B]">
        Include what happened, what you expected, and any useful page or error
        details.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-[#334155]">
          Full name
          <input
            name="name"
            required
            autoComplete="name"
            className={`${fieldClass} mt-2`}
          />
        </label>
        <label className="text-sm font-semibold text-[#334155]">
          Email
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            className={`${fieldClass} mt-2`}
          />
        </label>
        <label className="text-sm font-semibold text-[#334155]">
          Phone <span className="font-normal text-[#94A3B8]">(optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${fieldClass} mt-2`}
          />
        </label>
        <label className="text-sm font-semibold text-[#334155]">
          Help topic
          <select
            name="category"
            required
            defaultValue=""
            className={`${fieldClass} mt-2`}
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="admissions">Admissions</option>
            <option value="program">Programme or curriculum</option>
            <option value="payment">Payment or refund</option>
            <option value="placement">Placement support</option>
            <option value="certificate">Certificate</option>
            <option value="technical">Technical issue</option>
            <option value="account">Account access</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-[#334155] sm:col-span-2">
          Subject
          <input
            name="subject"
            required
            minLength={5}
            className={`${fieldClass} mt-2`}
          />
        </label>
        <label className="text-sm font-semibold text-[#334155] sm:col-span-2">
          What can we help with?
          <textarea
            name="message"
            required
            minLength={20}
            rows={6}
            className={`${fieldClass} mt-2 h-auto py-3`}
          />
        </label>
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mt-5 w-full bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
      >
        <Send className="size-4" />
        {status === "sending" ? "Sending..." : "Send request"}
      </Button>

      <div aria-live="polite" className="mt-4 min-h-6 text-sm">
        {status === "success" && (
          <div className="rounded-lg bg-emerald-50 p-3 text-emerald-800">
            <p className="inline-flex items-center gap-2 font-semibold">
              <CheckCircle2 className="size-4" />
              Request received.
            </p>
            <p className="mt-1">
              Reference: <strong>{reference}</strong>. Keep this code for
              follow-up.
            </p>
          </div>
        )}
        {status === "error" && (
          <p className="text-red-600">
            We couldn&apos;t send your request. Please check the fields and try
            again.
          </p>
        )}
      </div>
    </form>
  );
}
