"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NewsletterFormProps {
  endpoint?: string;
}

export function NewsletterForm({
  endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_API,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "unavailable" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint) {
      setStatus("unavailable");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Subscription failed");

      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Email address</span>
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
          <input
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="you@example.com"
            className="h-12 w-full rounded-lg border border-white/15 bg-white pl-11 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#57CC99] focus:ring-4 focus:ring-[#57CC99]/15"
          />
        </label>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="h-12 bg-[#FF7A0E] px-6 text-white hover:bg-[#E86C0D]"
        >
          {status === "submitting" ? "Joining..." : "Join the newsletter"}
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div aria-live="polite" className="mt-2 min-h-5 text-xs text-[#CBD5E1]">
        {status === "success" && "You’re in. Watch your inbox for the next edition."}
        {status === "unavailable" &&
          "Newsletter signup is not connected yet. Please check back soon."}
        {status === "error" &&
          "We couldn’t subscribe you just now. Please try again shortly."}
      </div>
    </form>
  );
}
