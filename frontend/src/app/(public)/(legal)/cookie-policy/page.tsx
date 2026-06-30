import type { Metadata } from "next";
import Link from "next/link";

import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { LegalSection } from "@/components/public/sections/legal/LegalSection";
import { LegalDocumentLayout } from "@/components/public/sections/legal/variants/LegalDocumentLayout";
import { LegalArticleSection } from "@/components/public/widgets/legal/LegalArticleSection";
import { LegalCallout } from "@/components/public/widgets/legal/LegalCallout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/shared/primitives";

export const metadata: Metadata = {
  title: "Cookie Policy | LearnerSlate",
  description:
    "Learn which cookies and similar technologies LearnerSlate uses, why they are used, how long they last, and how to control them.",
};

const toc = [
  { id: "scope", label: "Scope and Who We Are" },
  { id: "meaning", label: "Cookies and Similar Technologies" },
  { id: "categories", label: "Cookie Categories" },
  { id: "inventory", label: "Current Cookie Inventory" },
  { id: "local-storage", label: "Local Storage" },
  { id: "third-parties", label: "Third-Party Services" },
  { id: "legal", label: "Consent and Legal Framework" },
  { id: "choices", label: "Your Choices" },
  { id: "retention", label: "Retention and Security" },
  { id: "signals", label: "Browser Privacy Signals" },
  { id: "changes", label: "Policy Changes" },
  { id: "contact", label: "Contact Us" },
];

const cookies = [
  {
    name: "access_token",
    provider: "LearnerSlate",
    purpose:
      "Authenticates signed-in requests and protects access to account-only services.",
    duration: "Normally 1 day; may be set for up to 7 days",
    category: "Strictly necessary",
  },
  {
    name: "refresh_token",
    provider: "LearnerSlate",
    purpose:
      "Renews an authenticated session without requiring repeated sign-in.",
    duration: "Up to 7 days",
    category: "Strictly necessary",
  },
  {
    name: "user_role",
    provider: "LearnerSlate",
    purpose:
      "Directs signed-in users to the appropriate student, faculty, institution, sales, or administrative experience.",
    duration: "Up to 7 days",
    category: "Strictly necessary",
  },
  {
    name: "sidebar_state",
    provider: "LearnerSlate",
    purpose:
      "Remembers whether an application sidebar is open or closed.",
    duration: "Up to 7 days",
    category: "Preference",
  },
  {
    name: "sidebar-collapsed",
    provider: "LearnerSlate",
    purpose:
      "Remembers the learner dashboard sidebar preference between visits.",
    duration: "Up to 365 days",
    category: "Preference",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-[#0B1220] py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stack gap={14}>
            <Badge className="w-fit border-orange-500/30 bg-orange-500/10 text-orange-300">
              Legal and Privacy
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Cookie Policy
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Last updated: 30 June 2026. This policy explains the cookies and
              similar technologies used by LearnerSlate.
            </p>
          </Stack>
        </div>
      </section>

      <LegalSection className="bg-white">
        <LegalDocumentLayout toc={toc}>
          <Stack gap={52}>
            <LegalArticleSection
              id="scope"
              number={1}
              title="Scope and Who We Are"
              accent="teal"
            >
              <p>
                This Cookie Policy applies to LearnerSlate websites, learning
                applications, and related online services that link to it.
                LearnerSlate is operated by Vaarada IT Solutions Private
                Limited. References to “we”, “us”, and “our” mean LearnerSlate
                and its operator.
              </p>
              <p>
                This policy should be read with our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-teal-700 underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                , which explains how personal data is collected, used, shared,
                protected, and retained.
              </p>
            </LegalArticleSection>

            <LegalArticleSection
              id="meaning"
              number={2}
              title="Cookies and Similar Technologies"
              accent="teal"
            >
              <p>
                A cookie is a small text file stored on a browser or device by
                a website. Cookies may be first-party, meaning they are set by
                LearnerSlate, or third-party, meaning they are set by another
                service loaded through our platform.
              </p>
              <p>
                Session cookies expire when the browsing session ends.
                Persistent cookies remain until their stated expiry or until
                they are deleted. Similar technologies include local storage,
                software-development-kit storage, pixels, and identifiers used
                by embedded services.
              </p>
              <LegalCallout tone="teal">
                Cookie identifiers, IP addresses, and device information may be
                personal data when they identify or can be linked to an
                individual.
              </LegalCallout>
            </LegalArticleSection>

            <LegalArticleSection
              id="categories"
              number={3}
              title="Cookie Categories"
              accent="teal"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <CategoryCard
                  title="Strictly necessary"
                  description="Required for requested services such as authentication, session renewal, security, and protected account access."
                />
                <CategoryCard
                  title="Preferences"
                  description="Remember interface choices, such as whether a dashboard sidebar is collapsed."
                />
                <CategoryCard
                  title="Analytics"
                  description="Measure use and performance. LearnerSlate does not currently configure analytics cookies in the audited application."
                />
                <CategoryCard
                  title="Advertising"
                  description="Track activity for targeted advertising. LearnerSlate does not currently configure advertising cookies in the audited application."
                />
              </div>
              <p>
                If we introduce non-essential analytics, personalisation, or
                advertising technologies, they will be disabled where required
                until you make an applicable consent choice.
              </p>
            </LegalArticleSection>

            <LegalArticleSection
              id="inventory"
              number={4}
              title="Current Cookie Inventory"
              accent="teal"
            >
              <p>
                The table reflects first-party cookies identified in the
                LearnerSlate application at the date above. Actual expiry can
                be shorter when you sign out, clear browser data, or a token
                expires.
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-100 text-slate-900">
                    <tr>
                      <th className="px-4 py-3 font-bold">Cookie</th>
                      <th className="px-4 py-3 font-bold">Provider</th>
                      <th className="px-4 py-3 font-bold">Purpose</th>
                      <th className="px-4 py-3 font-bold">Duration</th>
                      <th className="px-4 py-3 font-bold">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookies.map((cookie) => (
                      <tr
                        key={cookie.name}
                        className="border-t border-slate-200 align-top"
                      >
                        <td className="px-4 py-4 font-mono text-xs font-bold text-slate-900">
                          {cookie.name}
                        </td>
                        <td className="px-4 py-4">{cookie.provider}</td>
                        <td className="max-w-sm px-4 py-4">
                          {cookie.purpose}
                        </td>
                        <td className="px-4 py-4">{cookie.duration}</td>
                        <td className="px-4 py-4">{cookie.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </LegalArticleSection>

            <LegalArticleSection
              id="local-storage"
              number={5}
              title="Local Storage and Similar Browser Storage"
              accent="teal"
            >
              <p>
                LearnerSlate uses limited browser storage in addition to
                cookies:
              </p>
              <ul className="list-disc space-y-3 pl-5 marker:text-orange-500">
                <li>
                  <strong>logout_event:</strong> records a logout timestamp so
                  open LearnerSlate tabs can respond consistently when you sign
                  out.
                </li>
                <li>
                  <strong>ref:</strong> may hold a referral or sales-link
                  reference used during checkout attribution.
                </li>
              </ul>
              <p>
                Local storage normally remains until the application or user
                removes it, or browser data is cleared. Browser controls for
                “site data” generally cover both cookies and local storage.
              </p>
            </LegalArticleSection>

            <LegalArticleSection
              id="third-parties"
              number={6}
              title="Third-Party Services"
              accent="teal"
            >
              <p>
                Some features load services supplied by other organisations.
                Those providers may use cookies or similar storage under their
                own policies when the relevant feature is used.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <CategoryCard
                  title="Razorpay"
                  description="The checkout service may process device, transaction, fraud-prevention, and payment-session information when payment features are opened."
                />
                <CategoryCard
                  title="YouTube"
                  description="Embedded lesson videos may allow YouTube or Google to store or access information when the video player loads or is used."
                />
              </div>
              <p>
                Third-party retention periods and controls are determined by
                those providers. Their cookie and privacy notices should be
                reviewed before using the relevant feature.
              </p>
            </LegalArticleSection>

            <LegalArticleSection
              id="legal"
              number={7}
              title="Consent and Legal Framework"
              accent="teal"
            >
              <p>
                In India, cookie-derived information that relates to an
                identifiable individual may be digital personal data under the
                Digital Personal Data Protection Act, 2023 and applicable
                rules. We provide notice and handle that information under an
                applicable lawful purpose.
              </p>
              <p>
                For visitors covered by EU or UK rules, non-essential storage
                and access technologies generally require clear information
                and valid consent. Technologies strictly necessary to provide a
                service requested by the user may qualify for an exception.
              </p>
              <LegalCallout title="Regulatory references">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <a
                      href="https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digital-Personal-Data-Protection-Rules-2025.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-teal-700 hover:underline"
                    >
                      India: Digital Personal Data Protection Rules, 2025
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32002L0058"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-teal-700 hover:underline"
                    >
                      EU: ePrivacy Directive
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-teal-700 hover:underline"
                    >
                      UK ICO: Cookies and similar technologies
                    </a>
                  </li>
                </ul>
              </LegalCallout>
            </LegalArticleSection>

            <LegalArticleSection
              id="choices"
              number={8}
              title="Your Choices and Browser Controls"
              accent="teal"
            >
              <ul className="list-disc space-y-3 pl-5 marker:text-orange-500">
                <li>
                  Browser settings can block, delete, or limit cookies and
                  other site data for LearnerSlate.
                </li>
                <li>
                  Private-browsing modes may restrict persistent storage but do
                  not necessarily block every technology.
                </li>
                <li>
                  Signing out removes LearnerSlate authentication cookies used
                  by the application&apos;s logout flow.
                </li>
                <li>
                  Third-party controls may be available through the relevant
                  payment, video, browser, or device provider.
                </li>
              </ul>
              <LegalCallout tone="orange">
                Blocking strictly necessary cookies can prevent sign-in,
                session renewal, protected learning areas, checkout, or saved
                interface preferences from working correctly.
              </LegalCallout>
            </LegalArticleSection>

            <LegalArticleSection
              id="retention"
              number={9}
              title="Retention and Security"
              accent="teal"
            >
              <p>
                We retain cookie and browser-storage information only for the
                period needed for its stated purpose, subject to technical,
                security, dispute, and legal requirements. Authentication
                cookies are configured with secure transport and SameSite
                restrictions in the current application.
              </p>
              <p>
                No internet or device-storage method is completely secure.
                Protect your device, use a trusted browser, sign out on shared
                devices, and notify support if you suspect unauthorised account
                activity.
              </p>
            </LegalArticleSection>

            <LegalArticleSection
              id="signals"
              number={10}
              title="Do Not Track and Browser Privacy Signals"
              accent="teal"
            >
              <p>
                Browser “Do Not Track” signals are not interpreted consistently
                across the industry. Because the audited LearnerSlate
                application does not currently configure advertising or
                analytics cookies, there is no related tracking category to
                disable through such a signal at this time.
              </p>
              <p>
                If we add technologies subject to recognised consent or opt-out
                signals, we will assess and implement applicable controls.
              </p>
            </LegalArticleSection>

            <LegalArticleSection
              id="changes"
              number={11}
              title="Changes to This Policy"
              accent="teal"
            >
              <p>
                We may update this policy when technology, providers,
                retention periods, products, or legal requirements change. The
                “Last updated” date will be revised. Material changes may also
                be communicated through an in-product notice, cookie control,
                or other appropriate channel.
              </p>
            </LegalArticleSection>

            <LegalArticleSection
              id="contact"
              number={12}
              title="Contact Us"
              accent="teal"
            >
              <p>
                Questions about cookies, browser storage, or related personal
                data can be sent to the LearnerSlate privacy team. Include the
                browser, device type, and cookie or feature involved where
                relevant, but never send passwords or authentication tokens.
              </p>
              <div className="inline-flex rounded-lg bg-slate-100 px-5 py-4 font-bold text-teal-700">
                privacy@learnerslate.com
              </div>
            </LegalArticleSection>
          </Stack>
        </LegalDocumentLayout>
      </LegalSection>

      <CTASection className="bg-slate-50 py-16 lg:py-20">
        <CenterCTA
          eyebrow="Privacy support"
          title="Questions about a cookie or stored identifier?"
          description="Contact the privacy team or review the broader Privacy Policy."
          primaryAction={
            <Button asChild size="lg">
              <Link href="mailto:privacy@learnerslate.com">
                Email privacy team
              </Link>
            </Button>
          }
          secondaryAction={
            <Button asChild size="lg" variant="outline">
              <Link href="/privacy">Read Privacy Policy</Link>
            </Button>
          }
        />
      </CTASection>
    </>
  );
}

function CategoryCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
