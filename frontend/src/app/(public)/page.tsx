// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Award,
//   BookOpenCheck,
//   BriefcaseBusiness,
//   CheckCircle2,
//   CirclePlay,
//   Code2,
//   MessageCircle,
//   Rocket,
//   Sparkles,
//   Star,
//   Users,
//   Zap,
// } from "lucide-react";
// import type { LucideIcon } from "lucide-react";

// import { MarketingLayout } from "@/components/public/layouts/MarketingLayout";
// import { FeatureMockup } from "@/components/public/widgets/display/FeatureMockup";
// import { FeatureShowcase } from "@/components/public/widgets/display/FeatureShowcase";
// import {
//   PublicButton,
//   PublicLink,
// } from "@/components/public/widgets/foundation";
// import { Container } from "@/components/shared/primitives";
// import { Button } from "@/components/ui/button";

// const stats = [
//   ["15k+", "Learners building skills"],
//   ["100+", "Industry mentors"],
//   ["94%", "Placement readiness rate"],
// ];

// const trusted = ["Google-style reviews", "MAANG mentors", "Project-led", "Live cohorts", "Verified certificates"];

// const programs = [
//   {
//     title: "Industry-Ready Software Engineer",
//     label: "Undergraduate program",
//     duration: "24 months",
//     price: "INR 3,499/mo",
//     cohort: "October 15, 2026",
//     highlight: "Best for 1st-3rd year students",
//     description:
//       "A complete foundation for college students covering programming, DSA, web development, cloud, AI integration, and placement prep.",
//     tags: ["DSA", "Full Stack", "Cloud", "AI"],
//     outcomes: ["1-on-1 mentorship", "4 production projects", "Placement prep"],
//     href: "/programs/industry-ready-software-engineer",
//   },
//   {
//     title: "Fast-Track Tech Career Program",
//     label: "Graduate program",
//     duration: "25 weeks",
//     price: "INR 4,999/mo",
//     cohort: "October 15, 2026",
//     highlight: "Best for graduates and switchers",
//     description:
//       "An intensive path for graduates and career switchers to build a role-ready portfolio, interview confidence, and specialization depth.",
//     tags: ["Python", "React", "RAG", "System Design"],
//     outcomes: ["Specialized track", "Weekly reviews", "Career transition"],
//     href: "/programs/fast-track-tech-career-program",
//   },
// ];

// const platformReasons: Array<[string, string, LucideIcon]> = [
//   ["Structured path", "Clear weekly milestones, no random tutorial hopping.", BookOpenCheck],
//   ["Mentor reviewed", "Projects and progress reviewed by working engineers.", MessageCircle],
//   ["Outcome focused", "Portfolio, interviews, and career clarity built into the program.", BriefcaseBusiness],
// ];

// const features = [
//   ["AI mentor", "Get guided practice support, revision prompts, and doubt nudges."],
//   ["Cloud IDE", "Code in a browser with prebuilt stacks and project environments."],
//   ["Live classes", "Attend focused sessions, workshops, and review rooms."],
//   ["Career dashboard", "Track skills, projects, applications, and readiness signals."],
//   ["Assessments", "Quizzes, exams, and milestone checks across the curriculum."],
//   ["Community", "Learn with peers, mentors, cohorts, and challenge groups."],
// ];

// const mentors = [
//   ["Arjun Rao", "Senior Software Engineer", "Google", "/mentors/mentor_1.jpg"],
//   ["Priya Sharma", "Staff Product Engineer", "Microsoft", "/mentors/mentor_2.jpg"],
//   ["Rahul Verma", "Principal Engineer", "Amazon", "/mentors/mentor_3.jpg"],
// ];

// const stories = [
//   ["Meera K.", "Data Analyst", "The roadmap gave me structure. The project reviews made my work interview-ready."],
//   ["Aarav S.", "Full Stack Engineer", "I stopped guessing what to learn next and started shipping real portfolio projects."],
//   ["Rohan P.", "Backend Developer", "The mock interviews helped me explain systems and tradeoffs properly."],
// ];

// const steps = [
//   ["01", "Choose a path", "Pick a program or roadmap based on where you are today."],
//   ["02", "Build weekly", "Attend live sessions, practice, submit projects, and get reviews."],
//   ["03", "Prove outcomes", "Earn certificates, polish your portfolio, and prepare for interviews."],
// ];

// const industryCertifications = [
//   ["AWS Certified Solutions Architect", "Master the design and deployment of scalable cloud systems on AWS.", "Cloud architecture"],
//   ["AWS Certified Developer", "Build production-ready applications using modern cloud services and CI/CD workflows.", "Developer track"],
//   ["AWS Certified SysOps", "Learn deployment, monitoring, automation, and operations practices for cloud teams.", "Cloud operations"],
// ];

// const resources = [
//   ["Career guide", "The 2026 Developer Roadmap: Skills You Need to Master", "5 min read"],
//   ["AI trends", "How AI is Reshaping Personalized Education", "6 min read"],
//   ["Tutorial", "Mastering React Server Components in 15 Minutes", "12 min read"],
// ];

// const faqs = [
//   ["Do I need prior coding experience?", "No. The undergraduate path starts from fundamentals, while the fast-track path expects stronger weekly commitment."],
//   ["Are projects reviewed?", "Yes. Portfolio projects are reviewed so you can improve quality, explanation, and deployment readiness."],
//   ["Can I explore before joining?", "Yes. You can browse roadmaps, career paths, certifications, and demo content before enrolling."],
//   ["Do you provide placement support?", "Yes. Resume reviews, mock interviews, portfolio guidance, and application support are part of the program flow."],
// ];

// export default function HomePage() {
//   return (
//     <MarketingLayout className="bg-[#F9FAFB] text-[#0F172A]">
//       <HomeHero />
//       <StatsSection />
//       <TrustedChips />
//       <ProgramCards />
//       <WhyPlatform />
//       <FeaturesSection />
//       <MentorShowcase />
//       <CommunityHighlights />
//       <SuccessStories />
//       <BeforeAfter />
//       <HowItWorks />
//       <Certifications />
//       <ResourcesForGrowth />
//       <CommunitySection />
//       <PricingTeaser />
//       <FAQSection />
//       <FinalCTA />
//     </MarketingLayout>
//   );
// }

// function HomeHero() {
//   return (
//     <section className="bg-white py-12 md:py-16">
//       <Container>
//         <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
//           <div className="flex min-h-[500px] flex-col justify-center py-4 lg:min-h-[560px]">
//             <span className="inline-flex w-fit items-center gap-2 border-l-2 border-[#FF7A0E] pl-3 text-sm font-semibold tracking-[0.025em] text-[#E86C0D]">
//               <Sparkles className="size-4" />
//               Learn with roadmaps, mentors, projects, and career proof
//             </span>
//             <h1 className="mt-10 max-w-4xl text-6xl font-semibold leading-[0.94] tracking-[-0.055em] md:text-7xl xl:text-[5.25rem]">
//               <span className="block text-[#0F172A]">Build real skills.</span>
//               <span className="mt-2 block text-[#FF7A0E]">Shape your future.</span>
//             </h1>
//             <p className="mt-9 max-w-xl text-lg leading-8 text-[#6B7280]">
//               LearnerSlate helps students and graduates move from scattered learning to structured, mentor-reviewed, portfolio-ready growth.
//             </p>
//             <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
//               <PublicButton asChild variant="conversion" size="lg">
//                 <Link href="/programs">Explore programs</Link>
//               </PublicButton>
//               <PublicLink
//                 href="/roadmaps"
//                 variant="subtle"
//                 size="lg"
//               >
//                 Browse roadmaps
//                 <ArrowRight className="size-4" />
//               </PublicLink>
//             </div>
//           </div>

//           <div className="relative overflow-hidden rounded-3xl border border-[#E9EAF0] bg-[#0F172A] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
//             <Image
//               src="/Landing_Images/home_hero.png"
//               alt="LearnerSlate learning dashboard preview"
//               width={900}
//               height={680}
//               priority
//               className="min-h-[340px] rounded-2xl object-cover"
//             />
//             <div className="absolute bottom-8 left-8 rounded-2xl bg-white/95 p-4 shadow-xl">
//               <p className="text-sm font-medium text-[#6B7280]">Current cohort</p>
//               <p className="mt-1 text-2xl font-semibold text-[#0F172A]">1,240 learners</p>
//             </div>
//             <button className="absolute right-8 top-8 grid size-14 place-items-center rounded-full bg-white text-[#FF7A0E] shadow-xl">
//               <CirclePlay className="size-7" />
//             </button>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

// function StatsSection() {
//   return (
//     <section className="bg-white">
//       <Container>
//         <div className="grid divide-y divide-[#E9EAF0] border-y border-[#E9EAF0] md:grid-cols-3 md:divide-x md:divide-y-0">
//           {stats.map(([value, label]) => (
//             <div key={label} className="p-6 text-center">
//               <p className="text-4xl font-semibold text-[#0F172A]">{value}</p>
//               <p className="mt-2 text-sm text-[#6B7280]">{label}</p>
//             </div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function TrustedChips() {
//   return (
//     <section className="bg-[#F9FAFB] py-8">
//       <Container>
//         <div className="flex flex-wrap items-center justify-center gap-3">
//           {trusted.map((item) => (
//             <span key={item} className="rounded-full border border-[#E9EAF0] bg-white px-4 py-2 text-sm font-medium text-[#22577A]">
//               {item}
//             </span>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
//   return (
//     <div className="mx-auto max-w-3xl text-center">
//       <p className="text-sm font-semibold text-[#E86C0D]">{eyebrow}</p>
//       <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
//       <p className="mt-4 text-base leading-7 text-[#6B7280]">{description}</p>
//     </div>
//   );
// }

// function ProgramCards() {
//   return (
//     <section className="bg-[#F9FAFB] py-20">
//       <Container>
//         <SectionHeader
//           eyebrow="Programs"
//           title="Two programs. One goal - get you ready."
//           description="Pick the path that fits your current stage, weekly commitment, and career urgency."
//         />
//         <div className="mt-10 grid gap-6">
//           {programs.map((program, index) => (
//             <article
//               key={program.title}
//               className="group overflow-hidden rounded-[2rem] border border-[#E9EAF0] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(15,23,42,0.12)]"
//             >
//               <div className="grid lg:grid-cols-[minmax(0,1fr)_380px]">
//                 <div className="p-6 md:p-8 lg:p-10">
//                   <div className="flex flex-wrap items-center gap-3">
//                     <span
//                       className={
//                         index === 0
//                           ? "rounded-full bg-[#E7F5F4] px-3 py-1 text-sm font-medium text-[#22577A]"
//                           : "rounded-full bg-[#FFEEE8] px-3 py-1 text-sm font-medium text-[#E86C0D]"
//                       }
//                     >
//                       {program.label}
//                     </span>
//                     <span className="rounded-full border border-[#E9EAF0] px-3 py-1 text-sm font-medium text-[#6B7280]">
//                       {program.highlight}
//                     </span>
//                   </div>

//                   <h3 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
//                     {program.title}
//                   </h3>
//                   <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B7280]">
//                     {program.description}
//                   </p>

//                   <div className="mt-6 grid gap-3 md:grid-cols-3">
//                     {program.outcomes.map((outcome) => (
//                       <div key={outcome} className="rounded-2xl border border-[#E9EAF0] bg-[#F9FAFB] p-4">
//                         <CheckCircle2 className={index === 0 ? "size-5 text-[#38A3A5]" : "size-5 text-[#FF7A0E]"} />
//                         <p className="mt-3 text-sm font-medium text-[#0F172A]">{outcome}</p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-6 flex flex-wrap gap-2">
//                     {program.tags.map((tag) => (
//                       <span key={tag} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-[#22577A] ring-1 ring-[#E9EAF0]">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-[#0F172A] p-6 text-white md:p-8 lg:p-10">
//                   <div className="flex items-center justify-between gap-4">
//                     <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-[#E9EAF0]">
//                       <ClockIcon />
//                       {program.duration}
//                     </span>
//                     <span className={index === 0 ? "size-3 rounded-full bg-[#38A3A5]" : "size-3 rounded-full bg-[#FF7A0E]"} />
//                   </div>

//                   <div className="mt-10">
//                     <p className="text-sm text-[#8C94A3]">Starting at</p>
//                     <p className="mt-2 text-4xl font-semibold">{program.price}</p>
//                     <p className="mt-6 text-sm text-[#8C94A3]">Next cohort starts</p>
//                     <p className="mt-1 text-lg font-semibold">{program.cohort}</p>
//                   </div>

//                   <div className="mt-10 space-y-3 border-t border-white/10 pt-6">
//                     {["Live mentor sessions", "Project review cycles", "Certificate on completion"].map((item) => (
//                       <p key={item} className="flex items-center gap-3 text-sm text-[#E9EAF0]">
//                         <CheckCircle2 className={index === 0 ? "size-4 text-[#57CC99]" : "size-4 text-[#FF7A0E]"} />
//                         {item}
//                       </p>
//                     ))}
//                   </div>

//                   <Button asChild className="mt-8 w-full bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
//                     <Link href={program.href}>
//                       View program details
//                       <ArrowRight className="size-4" />
//                     </Link>
//                   </Button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function ClockIcon() {
//   return <span className="size-2 rounded-full bg-[#57CC99]" />;
// }

// function WhyPlatform() {
//   return (
//     <section className="bg-white py-16">
//       <Container>
//         <SectionHeader
//           eyebrow="Why the platform"
//           title="Built for learners who need direction, not noise."
//           description="Every part of the platform is designed to help you know what to learn, build proof, and move toward a role."
//         />
//         <div className="mt-10 grid gap-4 md:grid-cols-3">
//           {platformReasons.map(([title, text, Icon]) => (
//             <article key={title as string} className="rounded-3xl border border-[#E9EAF0] bg-[#F9FAFB] p-6">
//               <div className="grid size-12 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]">
//                 <Icon className="size-6" />
//               </div>
//               <h3 className="mt-5 text-xl font-semibold">{title}</h3>
//               <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function FeaturesSection() {
//   return (
//     <section className="bg-[#F9FAFB] py-20">
//       <Container>
//         <SectionHeader
//           eyebrow="Features"
//           title="A complete learning operating system."
//           description="From live classes to certificates, LearnerSlate keeps the learning loop connected."
//         />
//         <div className="mt-12 space-y-14">
//           <FeatureShowcase
//             eyebrow="Platform cockpit"
//             title="One dashboard for learning, projects, and career readiness."
//             description="Track your roadmap, weekly work, projects, certificates, mentor feedback, and interview prep in one place."
//             bullets={[
//               "Personal roadmap progress and weekly milestones",
//               "Project submissions with mentor review loops",
//               "Career readiness signals across skills and interviews",
//             ]}
//             ctaLabel="Explore programs"
//             href="/programs"
//             mockup={<FeatureMockup type="dashboard" />}
//           />

//           <FeatureShowcase
//             eyebrow="Build environment"
//             title="Cloud IDE, live classes, projects, and certificates built into the flow."
//             description="Practice in browser-based environments, attend live sessions, ship projects, and earn verified certificates from the same learning journey."
//             bullets={[
//               "No local setup required for supported project stacks",
//               "Live mentor sessions and recorded learning checkpoints",
//               "Certificates tied to assessments and project proof",
//             ]}
//             ctaLabel="View certifications"
//             href="/certifications"
//             mockup={<FeatureMockup type="ide" />}
//             className="lg:[&>*:first-child]:order-2"
//           />

//           <div className="grid gap-4 md:grid-cols-3">
//             {features.slice(0, 3).map(([title, text], index) => (
//               <article key={title} className="rounded-3xl border border-[#E9EAF0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.035)]">
//                 <div className={index % 2 === 0 ? "grid size-11 place-items-center rounded-2xl bg-[#E7F5F4] text-[#22577A]" : "grid size-11 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]"}>
//                   {index % 2 === 0 ? <Code2 className="size-5" /> : <Zap className="size-5" />}
//                 </div>
//                 <h3 className="mt-5 text-lg font-semibold">{title}</h3>
//                 <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

// function MentorShowcase() {
//   return (
//     <section className="bg-white py-16">
//       <Container>
//         <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
//           <div>
//             <p className="text-sm font-semibold text-[#E86C0D]">Mentor showcase</p>
//             <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Learn from people who have shipped real systems.</h2>
//             <p className="mt-4 text-base leading-7 text-[#6B7280]">
//               Mentors help you review code, understand tradeoffs, prepare interviews, and stay consistent.
//             </p>
//             <Button asChild className="mt-6 bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
//               <Link href="/mentors">View mentors</Link>
//             </Button>
//           </div>
//           <div className="grid gap-4 md:grid-cols-3">
//             {mentors.map(([name, role, company, image]) => (
//               <article key={name} className="rounded-3xl border border-[#E9EAF0] bg-[#F9FAFB] p-4">
//                 <Image src={image} alt={name} width={320} height={320} className="aspect-square rounded-2xl object-cover" />
//                 <h3 className="mt-4 font-semibold">{name}</h3>
//                 <p className="mt-1 text-sm text-[#6B7280]">{role}</p>
//                 <p className="mt-1 text-sm font-medium text-[#22577A]">{company}</p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

// function CommunityHighlights() {
//   return (
//     <section className="bg-[#0F172A] py-16 text-white">
//       <Container>
//         <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
//           <div>
//             <p className="text-sm font-semibold text-[#57CC99]">Community highlights</p>
//             <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Cohorts, challenges, and peer momentum.</h2>
//             <p className="mt-4 text-base leading-7 text-[#E9EAF0]">
//               Join groups, participate in bounties, attend workshops, and learn around people chasing similar outcomes.
//             </p>
//           </div>
//           <div className="grid gap-4 md:grid-cols-3">
//             {[
//               ["Live rooms", "Weekly mentor and peer sessions"],
//               ["Bounties", "Portfolio challenges with visible ranks"],
//               ["Events", "Webinars, hackathons, and exam prep"],
//             ].map(([title, text]) => (
//               <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
//                 <Users className="size-6 text-[#57CC99]" />
//                 <h3 className="mt-4 font-semibold">{title}</h3>
//                 <p className="mt-2 text-sm leading-6 text-[#E9EAF0]">{text}</p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

// function SuccessStories() {
//   return (
//     <section className="bg-white py-16">
//       <Container>
//         <SectionHeader
//           eyebrow="Success stories"
//           title="Real progress, explained by learners."
//           description="Short stories from learners who used structure, mentorship, and projects to move forward."
//         />
//         <div className="mt-10 grid gap-4 md:grid-cols-3">
//           {stories.map(([name, role, quote]) => (
//             <article key={name} className="rounded-3xl border border-[#E9EAF0] bg-[#F9FAFB] p-6">
//               <div className="flex gap-1 text-[#FF7A0E]">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <Star key={index} className="size-4 fill-[#FF7A0E]/20" />
//                 ))}
//               </div>
//               <p className="mt-5 text-sm leading-7 text-[#374151]">{quote}</p>
//               <p className="mt-6 font-semibold">{name}</p>
//               <p className="text-sm text-[#6B7280]">{role}</p>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function BeforeAfter() {
//   return (
//     <section className="bg-[#F9FAFB] py-16">
//       <Container>
//         <div className="grid gap-5 lg:grid-cols-2">
//           <article className="rounded-3xl border border-[#E9EAF0] bg-white p-8">
//             <p className="text-sm font-semibold text-[#6B7280]">Before</p>
//             <h2 className="mt-3 text-3xl font-semibold">Scattered learning</h2>
//             <ul className="mt-6 space-y-3 text-sm leading-6 text-[#6B7280]">
//               {["Random playlists", "No project review", "No interview direction", "Unclear career path"].map((item) => (
//                 <li key={item} className="flex gap-2">
//                   <span className="mt-2 size-1.5 rounded-full bg-[#8C94A3]" />
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </article>
//           <article className="rounded-3xl border border-[#38A3A5]/30 bg-[#E7F5F4] p-8">
//             <p className="text-sm font-semibold text-[#22577A]">After</p>
//             <h2 className="mt-3 text-3xl font-semibold">Guided outcomes</h2>
//             <ul className="mt-6 space-y-3 text-sm leading-6 text-[#22577A]">
//               {["Weekly roadmap", "Mentor-reviewed projects", "Mock interviews", "Portfolio and certificate proof"].map((item) => (
//                 <li key={item} className="flex gap-2">
//                   <CheckCircle2 className="mt-0.5 size-4 text-[#38A3A5]" />
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </article>
//         </div>
//       </Container>
//     </section>
//   );
// }

// function HowItWorks() {
//   return (
//     <section className="bg-white py-20">
//       <Container>
//         <SectionHeader
//           eyebrow="How it works"
//           title="Your path from novice to expert, simplified into clear steps."
//           description="No confusing routes. Choose, build, prove, and move toward a career outcome."
//         />
//         <div className="mt-12 grid gap-6 md:grid-cols-3">
//           {steps.map(([number, title, text]) => (
//             <article key={number} className="relative overflow-hidden rounded-3xl bg-white p-6">
//               <span className="absolute -top-6 left-2 text-8xl font-semibold leading-none text-[#E9EAF0]/80">
//                 {number}
//               </span>
//               <div className="relative pt-8">
//                 <div className="grid size-11 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]">
//                   {number === "01" && <Rocket className="size-5" />}
//                   {number === "02" && <Code2 className="size-5" />}
//                   {number === "03" && <Award className="size-5" />}
//                 </div>
//                 <h3 className="mt-5 text-lg font-semibold">{title}</h3>
//                 <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
//               </div>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function Certifications() {
//   return (
//     <section className="bg-[#F9FAFB] py-20">
//       <Container>
//         <SectionHeader
//           eyebrow="Industry certifications"
//           title="Gain credentials recognized by global tech leaders."
//           description="Use LearnerSlate programs to build the skills and project confidence needed for certification tracks."
//         />

//         <div className="mt-8 flex flex-wrap justify-center gap-2">
//           {["All vendors", "AWS", "Azure", "Google Cloud", "CompTIA"].map((item, index) => (
//             <span
//               key={item}
//               className={
//                 index === 0
//                   ? "rounded-full bg-[#FF7A0E] px-4 py-2 text-sm font-medium text-white"
//                   : "rounded-full border border-[#E9EAF0] bg-white px-4 py-2 text-sm font-medium text-[#6B7280]"
//               }
//             >
//               {item}
//             </span>
//           ))}
//         </div>

//         <div className="mt-10 grid gap-5 md:grid-cols-3">
//           {industryCertifications.map(([title, text, tag]) => (
//             <article
//               key={title}
//               className="rounded-3xl border border-[#E9EAF0] bg-white p-6 text-center shadow-[0_16px_45px_rgba(15,23,42,0.045)]"
//             >
//               <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]">
//                 <Award className="size-7" />
//               </div>
//               <span className="mt-5 inline-flex rounded-full bg-[#E7F5F4] px-3 py-1 text-xs font-medium text-[#22577A]">
//                 {tag}
//               </span>
//               <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">{title}</h3>
//               <p className="mt-3 text-sm leading-6 text-[#6B7280]">{text}</p>
//               <Button asChild variant="outline" className="mt-6 border-[#FF7A0E] text-[#E86C0D] hover:bg-[#FFEEE8]">
//                 <Link href="/certifications">Explore track</Link>
//               </Button>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function ResourcesForGrowth() {
//   return (
//     <section className="bg-white py-20">
//       <Container>
//         <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//           <div>
//             <p className="text-sm font-semibold text-[#E86C0D]">Resources for growth</p>
//             <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
//               Keep learning between cohorts.
//             </h2>
//             <p className="mt-4 max-w-2xl text-base leading-7 text-[#6B7280]">
//               Insights, tutorials, and updates to help you stay sharp while you explore programs and roadmaps.
//             </p>
//           </div>
//           <Button asChild variant="ghost" className="w-fit text-[#E86C0D] hover:bg-[#FFEEE8]">
//             <Link href="/blog">
//               View all articles
//               <ArrowRight className="size-4" />
//             </Link>
//           </Button>
//         </div>

//         <div className="mt-10 grid gap-5 md:grid-cols-3">
//           {resources.map(([category, title, meta], index) => (
//             <article key={title} className="group">
//               <div
//                 className={
//                   index === 0
//                     ? "grid aspect-[16/9] place-items-center rounded-2xl bg-[#E7F5F4] text-[#22577A]"
//                     : index === 1
//                       ? "grid aspect-[16/9] place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]"
//                       : "grid aspect-[16/9] place-items-center rounded-2xl bg-[#E9EAF0] text-[#6B7280]"
//                 }
//               >
//                 <BookOpenCheck className="size-9" />
//               </div>
//               <p className="mt-4 text-xs font-semibold text-[#E86C0D]">{category}</p>
//               <h3 className="mt-2 text-lg font-semibold leading-snug text-[#0F172A] transition group-hover:text-[#22577A]">
//                 {title}
//               </h3>
//               <p className="mt-2 text-sm text-[#6B7280]">{meta}</p>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function CommunitySection() {
//   return (
//     <section className="bg-white py-16">
//       <Container>
//         <div className="rounded-3xl bg-[#0F172A] p-8 text-white md:p-10">
//           <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
//             <div>
//               <p className="text-sm font-semibold text-[#57CC99]">Community section</p>
//               <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Never learn alone again.</h2>
//               <p className="mt-4 max-w-2xl text-base leading-7 text-[#E9EAF0]">
//                 Join peers, mentors, events, hackathons, and accountability channels built around practical learning.
//               </p>
//             </div>
//             <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
//               <Link href="/events">Join community</Link>
//             </Button>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

// function PricingTeaser() {
//   return (
//     <section className="bg-[#F9FAFB] py-20">
//       <Container>
//         <SectionHeader
//           eyebrow="Pricing"
//           title="Flexible monthly starts for serious learners."
//           description="Start with the path that matches your pace. Full pricing and cohort details live on the programs page."
//         />
//         <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
//           {programs.map((program, index) => (
//             <article
//               key={program.title}
//               className="relative overflow-hidden rounded-[2rem] border border-[#E9EAF0] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
//             >
//               <div
//                 className={
//                   index === 0
//                     ? "absolute inset-x-0 top-0 h-1.5 bg-[#38A3A5]"
//                     : "absolute inset-x-0 top-0 h-1.5 bg-[#FF7A0E]"
//                 }
//               />
//               <div className="p-6 md:p-8">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <span
//                     className={
//                       index === 0
//                         ? "rounded-full bg-[#E7F5F4] px-3 py-1 text-sm font-medium text-[#22577A]"
//                         : "rounded-full bg-[#FFEEE8] px-3 py-1 text-sm font-medium text-[#E86C0D]"
//                     }
//                   >
//                     {program.label}
//                   </span>
//                   <span className="rounded-full border border-[#E9EAF0] px-3 py-1 text-xs font-medium text-[#6B7280]">
//                     {index === 0 ? "Foundation path" : "Fast-track path"}
//                   </span>
//                 </div>

//                 <h3 className="mt-6 text-2xl font-semibold leading-tight text-[#0F172A]">
//                   {program.title}
//                 </h3>
//                 <p className="mt-3 text-sm leading-6 text-[#6B7280]">
//                   {program.highlight}. Includes mentorship, project reviews, cohort access, and placement preparation.
//                 </p>

//                 <div className="mt-7 rounded-3xl bg-[#0F172A] p-5 text-white">
//                   <p className="text-sm text-[#8C94A3]">Starting at</p>
//                   <div className="mt-2 flex items-end gap-2">
//                     <p className="text-4xl font-semibold">{program.price}</p>
//                   </div>
//                   <div className="mt-5 grid grid-cols-2 gap-3">
//                     {[
//                       ["Duration", program.duration],
//                       ["Next cohort", program.cohort],
//                     ].map(([label, value]) => (
//                       <div key={label} className="rounded-2xl bg-white/7 p-3">
//                         <p className="text-xs text-[#8C94A3]">{label}</p>
//                         <p className="mt-1 text-sm font-semibold">{value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-6 space-y-3">
//                   {program.outcomes.map((outcome) => (
//                     <p key={outcome} className="flex items-center gap-3 text-sm text-[#374151]">
//                       <CheckCircle2 className={index === 0 ? "size-4 text-[#38A3A5]" : "size-4 text-[#FF7A0E]"} />
//                       {outcome}
//                     </p>
//                   ))}
//                 </div>

//                 <div className="mt-7 grid gap-3 sm:grid-cols-2">
//                   <Button asChild className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
//                     <Link href={program.href}>
//                       See details
//                       <ArrowRight className="size-4" />
//                     </Link>
//                   </Button>
//                   <Button asChild variant="outline">
//                     <Link href="/contact">Talk to mentor</Link>
//                   </Button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function FAQSection() {
//   return (
//     <section className="bg-white py-16">
//       <Container>
//         <SectionHeader
//           eyebrow="FAQ"
//           title="Questions before you start?"
//           description="A quick pass through the decisions learners usually care about."
//         />
//         <div className="mx-auto mt-10 max-w-3xl divide-y divide-[#E9EAF0] rounded-3xl border border-[#E9EAF0] bg-white">
//           {faqs.map(([question, answer]) => (
//             <details key={question} className="group p-5">
//               <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
//                 {question}
//                 <ArrowRight className="size-4 transition group-open:rotate-90" />
//               </summary>
//               <p className="mt-3 text-sm leading-6 text-[#6B7280]">{answer}</p>
//             </details>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// function FinalCTA() {
//   return (
//     <section className="bg-[#F9FAFB] py-16">
//       <Container>
//         <div className="rounded-3xl border border-[#E9EAF0] bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-12">
//           <Rocket className="mx-auto size-10 text-[#FF7A0E]" />
//           <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Ready to build your next version?</h2>
//           <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6B7280]">
//             Explore the programs, compare your options, and choose the path that gives your learning a real direction.
//           </p>
//           <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
//             <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
//               <Link href="/programs">Compare programs</Link>
//             </Button>
//             <Button asChild size="lg" variant="outline">
//               <Link href="/contact">Talk to a mentor</Link>
//             </Button>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  CirclePlay,
  Code2,
  MessageCircle,
  Rocket,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

import { MarketingLayout } from "@/components/public/layouts/MarketingLayout";
import { FeatureMockup } from "@/components/public/widgets/display/FeatureMockup";
import { FeatureShowcase } from "@/components/public/widgets/display/FeatureShowcase";
import {
  PublicButton,
  PublicLink,
} from "@/components/public/widgets/foundation";
import { Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";

const stats = [
  ["15k+", "Learners on structured paths"],
  ["420+", "Projects reviewed"],
  ["94%", "Placement readiness rate"],
];

const trusted = [
  "Mentor-reviewed projects",
  "Live cohorts",
  "Cloud IDE",
  "Career dashboard",
  "Verified certificates",
  "Portfolio proof",
];

const programs = [
  {
    title: "Industry-Ready Software Engineer",
    label: "Undergraduate program",
    duration: "24 months",
    price: "INR 3,499/mo",
    cohort: "October 15, 2026",
    highlight: "Best for 1st-3rd year students",
    description:
      "A complete foundation for college students covering programming, DSA, web development, cloud, AI integration, and placement prep.",
    tags: ["DSA", "Full Stack", "Cloud", "AI"],
    outcomes: ["1-on-1 mentorship", "4 production projects", "Placement prep"],
    href: "/programs/industry-ready-software-engineer",
  },
  {
    title: "Fast-Track Tech Career Program",
    label: "Graduate program",
    duration: "25 weeks",
    price: "INR 4,999/mo",
    cohort: "October 15, 2026",
    highlight: "Best for graduates and switchers",
    description:
      "An intensive path for graduates and career switchers to build a role-ready portfolio, interview confidence, and specialization depth.",
    tags: ["Python", "React", "RAG", "System Design"],
    outcomes: ["Specialized track", "Weekly reviews", "Career transition"],
    href: "/programs/fast-track-tech-career-program",
  },
];

const platformReasons = [
  [
    "Structured path",
    "Clear weekly milestones, no random tutorial hopping.",
    BookOpenCheck,
  ],
  [
    "Mentor reviewed",
    "Projects and progress reviewed by working engineers.",
    MessageCircle,
  ],
  [
    "Outcome focused",
    "Portfolio, interviews, and career clarity built into the program.",
    BriefcaseBusiness,
  ],
];

const features = [
  [
    "AI mentor",
    "Get guided practice support, revision prompts, and doubt nudges.",
  ],
  [
    "Cloud IDE",
    "Code in a browser with prebuilt stacks and project environments.",
  ],
  ["Live classes", "Attend focused sessions, workshops, and review rooms."],
  [
    "Career dashboard",
    "Track skills, projects, applications, and readiness signals.",
  ],
  [
    "Assessments",
    "Quizzes, exams, and milestone checks across the curriculum.",
  ],
  ["Community", "Learn with peers, mentors, cohorts, and challenge groups."],
];

const mentors = [
  ["Arjun Rao", "Senior Software Engineer", "Google", "/mentors/mentor_1.jpg"],
  [
    "Priya Sharma",
    "Staff Product Engineer",
    "Microsoft",
    "/mentors/mentor_2.jpg",
  ],
  ["Rahul Verma", "Principal Engineer", "Amazon", "/mentors/mentor_3.jpg"],
];

const stories = [
  {
    name: "Meera K.",
    role: "Data Analyst",
    outcome: "Placed after 16 weeks",
    quote:
      "The roadmap gave me structure. The project reviews made my work interview-ready instead of just course-complete.",
    stack: ["SQL", "Python", "Dashboards"],
  },
  {
    name: "Aarav S.",
    role: "Full Stack Engineer",
    outcome: "Built 4 portfolio projects",
    quote:
      "I stopped guessing what to learn next. Weekly reviews pushed me to ship, explain, and improve real products.",
    stack: ["React", "Node", "Cloud"],
  },
  {
    name: "Rohan P.",
    role: "Backend Developer",
    outcome: "Cracked system rounds",
    quote:
      "The mock interviews helped me talk through systems, tradeoffs, APIs, and database choices with confidence.",
    stack: ["APIs", "Postgres", "System Design"],
  },
];

const steps = [
  [
    "01",
    "Choose a path",
    "Pick a program or roadmap based on where you are today.",
  ],
  [
    "02",
    "Build weekly",
    "Attend live sessions, practice, submit projects, and get reviews.",
  ],
  [
    "03",
    "Prove outcomes",
    "Earn certificates, polish your portfolio, and prepare for interviews.",
  ],
];

const industryCertifications = [
  [
    "AWS Certified Solutions Architect",
    "Master the design and deployment of scalable cloud systems on AWS.",
    "Cloud architecture",
  ],
  [
    "AWS Certified Developer",
    "Build production-ready applications using modern cloud services and CI/CD workflows.",
    "Developer track",
  ],
  [
    "AWS Certified SysOps",
    "Learn deployment, monitoring, automation, and operations practices for cloud teams.",
    "Cloud operations",
  ],
];

const resources = [
  [
    "Career guide",
    "The 2026 Developer Roadmap: Skills You Need to Master",
    "5 min read",
  ],
  ["AI trends", "How AI is Reshaping Personalized Education", "6 min read"],
  [
    "Tutorial",
    "Mastering React Server Components in 15 Minutes",
    "12 min read",
  ],
];

const proofCards = [
  [
    "Roadmap clarity",
    "Weekly milestones replace random tutorials and half-finished courses.",
    "01",
  ],
  [
    "Mentor review",
    "Projects, resumes, and interview answers get reviewed before they matter.",
    "02",
  ],
  [
    "Career proof",
    "Certificates, deployed projects, and dashboards show your progress clearly.",
    "03",
  ],
];

const outcomeCards = [
  [
    "Portfolio",
    "Ship production-style projects with review notes and deployment proof.",
  ],
  [
    "Interview",
    "Practice mock rounds, DSA explanations, system tradeoffs, and resume stories.",
  ],
  [
    "Certificate",
    "Earn completion proof tied to assessments, projects, and mentor checkpoints.",
  ],
];

const faqs = [
  [
    "Do I need prior coding experience?",
    "No. The undergraduate path starts from fundamentals, while the fast-track path expects stronger weekly commitment.",
  ],
  [
    "Are projects reviewed?",
    "Yes. Portfolio projects are reviewed so you can improve quality, explanation, and deployment readiness.",
  ],
  [
    "Can I explore before joining?",
    "Yes. You can browse roadmaps, career paths, certifications, and demo content before enrolling.",
  ],
  [
    "Do you provide placement support?",
    "Yes. Resume reviews, mock interviews, portfolio guidance, and application support are part of the program flow.",
  ],
];

export default function HomePage() {
  return (
    <MarketingLayout className="bg-[#F9FAFB] text-[#0F172A]">
      <HomeHero />
      <StatsSection />
      <TrustedChips />
      <ProofStrip />
      <ProgramCards />
      <WhyPlatform />
      <FeaturesSection />
      <CareerProof />
      <MentorShowcase />
      <CommunityHighlights />
      <SuccessStories />
      <BeforeAfter />
      <HowItWorks />
      <Certifications />
      <ResourcesForGrowth />
      <CommunitySection />
      <PricingTeaser />
      <FAQSection />
      <FinalCTA />
    </MarketingLayout>
  );
}

function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[#FF7A0E]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#38A3A5]/10 blur-3xl" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_540px] lg:items-center">
          <div className="flex min-h-[520px] flex-col justify-center py-4 lg:min-h-[620px]">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FF7A0E]/20 bg-[#FFEEE8] px-4 py-2 text-sm font-semibold text-[#E86C0D]">
              <Sparkles className="size-4" />
              Mentor-led learning for serious tech careers
            </span>

            <h1 className="mt-8 max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.06em] text-[#0F172A] md:text-7xl xl:text-[5.6rem]">
              Stop collecting courses.
              <span className="block text-[#FF7A0E]">
                Start building proof.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6B7280]">
              LearnerSlate turns scattered learning into weekly roadmaps,
              mentor-reviewed projects, live cohorts, and career proof you can
              show.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <PublicButton asChild variant="conversion" size="lg">
                <Link href="/programs">
                  Explore programs
                  <ArrowRight className="size-4" />
                </Link>
              </PublicButton>
              <PublicLink href="/roadmaps" variant="subtle" size="lg">
                Browse free roadmaps
                <ArrowRight className="size-4" />
              </PublicLink>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#E9EAF0] bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.04)]"
                >
                  <p className="text-2xl font-semibold text-[#0F172A]">
                    {value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 z-10 rounded-2xl border border-[#E9EAF0] bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              <p className="text-xs font-medium text-[#6B7280]">This week</p>
              <p className="mt-1 text-2xl font-semibold text-[#0F172A]">
                32 reviews
              </p>
            </div>

            <div className="absolute -right-5 bottom-10 z-10 rounded-2xl border border-white/10 bg-[#0F172A] p-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
              <p className="text-xs text-[#8C94A3]">Career readiness</p>
              <p className="mt-1 text-2xl font-semibold text-[#57CC99]">94%</p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#E9EAF0] bg-[#0F172A] p-3 shadow-[0_35px_100px_rgba(15,23,42,0.24)]">
              <div className="relative overflow-hidden rounded-[1.4rem]">
                <Image
                  src="/Landing_Images/home_hero.png"
                  alt="LearnerSlate learning dashboard preview"
                  width={900}
                  height={680}
                  priority
                  className="min-h-[420px] object-cover opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
                <button className="absolute right-6 top-6 grid size-14 place-items-center rounded-full bg-white text-[#FF7A0E] shadow-xl">
                  <CirclePlay className="size-7" />
                </button>
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur">
                  <p className="text-sm text-[#E9EAF0]">Current cohort</p>
                  <p className="mt-1 text-2xl font-semibold">
                    1,240 learners building together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-white">
      <Container>
        <div className="grid divide-y divide-[#E9EAF0] border-y border-[#E9EAF0] md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map(([value, label]) => (
            <div key={label} className="p-6 text-center">
              <p className="text-4xl font-semibold text-[#0F172A]">{value}</p>
              <p className="mt-2 text-sm text-[#6B7280]">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TrustedChips() {
  return (
    <section className="bg-[#F9FAFB] py-8">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {trusted.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#E9EAF0] bg-white px-4 py-2 text-sm font-medium text-[#22577A]"
            >
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold text-[#E86C0D]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[#6B7280]">{description}</p>
    </div>
  );
}

function ProofStrip() {
  return (
    <section className="bg-[#F9FAFB] py-10">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {proofCards.map(([title, text, number]) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-[#E9EAF0] bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.045)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
            >
              <span className="absolute right-5 top-4 text-5xl font-semibold leading-none text-[#E9EAF0] transition group-hover:text-[#FFEEE8]">
                {number}
              </span>
              <div className="relative grid size-12 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]">
                <Zap className="size-5" />
              </div>
              <h3 className="relative mt-5 text-xl font-semibold text-[#0F172A]">
                {title}
              </h3>
              <p className="relative mt-2 text-sm leading-6 text-[#6B7280]">
                {text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProgramCards() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <Container>
        <SectionHeader
          eyebrow="Programs"
          title="Choose the path. Build the proof. Show the outcome."
          description="Two focused programs for different stages, both designed around projects, reviews, and career readiness."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {programs.map((program, index) => (
            <article
              key={program.title}
              className="group relative overflow-hidden rounded-[2rem] border border-[#E9EAF0] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(15,23,42,0.13)]"
            >
              <div
                className={
                  index === 0
                    ? "absolute inset-x-0 top-0 h-1.5 bg-[#38A3A5]"
                    : "absolute inset-x-0 top-0 h-1.5 bg-[#FF7A0E]"
                }
              />
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[#FF7A0E]/10 blur-2xl transition group-hover:bg-[#FF7A0E]/20" />

              <div className="relative p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={
                      index === 0
                        ? "rounded-full bg-[#E7F5F4] px-3 py-1 text-sm font-medium text-[#22577A]"
                        : "rounded-full bg-[#FFEEE8] px-3 py-1 text-sm font-medium text-[#E86C0D]"
                    }
                  >
                    {program.label}
                  </span>
                  <span className="rounded-full border border-[#E9EAF0] bg-white px-3 py-1 text-sm font-medium text-[#6B7280]">
                    {program.highlight}
                  </span>
                </div>

                <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-[#0F172A] md:text-4xl">
                  {program.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#6B7280]">
                  {program.description}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  {[
                    ["Duration", program.duration],
                    ["Next cohort", program.cohort],
                    ["Starting at", program.price],
                    ["Mode", "Live + project-led"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[#E9EAF0] bg-[#F9FAFB] p-4"
                    >
                      <p className="text-xs font-medium text-[#8C94A3]">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 space-y-3">
                  {program.outcomes.map((outcome) => (
                    <p
                      key={outcome}
                      className="flex items-center gap-3 text-sm font-medium text-[#374151]"
                    >
                      <CheckCircle2
                        className={
                          index === 0
                            ? "size-4 text-[#38A3A5]"
                            : "size-4 text-[#FF7A0E]"
                        }
                      />
                      {outcome}
                    </p>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {program.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-[#22577A] ring-1 ring-[#E9EAF0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <PublicButton asChild variant="conversion" size="md">
                    <Link href={program.href}>
                      View details
                      <ArrowRight className="size-4" />
                    </Link>
                  </PublicButton>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-lg border-[#E9EAF0] text-[#0F172A] hover:bg-[#F9FAFB]"
                  >
                    <Link href="/contact">Talk to mentor</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ClockIcon() {
  return <span className="size-2 rounded-full bg-[#57CC99]" />;
}

function WhyPlatform() {
  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeader
          eyebrow="Why the platform"
          title="Built for learners who need direction, not noise."
          description="Every part of the platform is designed to help you know what to learn, build proof, and move toward a role."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {platformReasons.map(([title, text, Icon]) => (
            <article
              key={title as string}
              className="rounded-3xl border border-[#E9EAF0] bg-[#F9FAFB] p-6"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <Container>
        <SectionHeader
          eyebrow="Features"
          title="A complete learning operating system."
          description="From live classes to certificates, LearnerSlate keeps the learning loop connected."
        />
        <div className="mt-12 space-y-14">
          <FeatureShowcase
            eyebrow="Platform cockpit"
            title="One dashboard for learning, projects, and career readiness."
            description="Track your roadmap, weekly work, projects, certificates, mentor feedback, and interview prep in one place."
            bullets={[
              "Personal roadmap progress and weekly milestones",
              "Project submissions with mentor review loops",
              "Career readiness signals across skills and interviews",
            ]}
            ctaLabel="Explore programs"
            href="/programs"
            mockup={<FeatureMockup type="dashboard" />}
          />

          <FeatureShowcase
            eyebrow="Build environment"
            title="Cloud IDE, live classes, projects, and certificates built into the flow."
            description="Practice in browser-based environments, attend live sessions, ship projects, and earn verified certificates from the same learning journey."
            bullets={[
              "No local setup required for supported project stacks",
              "Live mentor sessions and recorded learning checkpoints",
              "Certificates tied to assessments and project proof",
            ]}
            ctaLabel="View certifications"
            href="/certifications"
            mockup={<FeatureMockup type="ide" />}
            className="lg:[&>*:first-child]:order-2"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {features.slice(0, 3).map(([title, text], index) => (
              <article
                key={title}
                className="rounded-3xl border border-[#E9EAF0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.035)]"
              >
                <div
                  className={
                    index % 2 === 0
                      ? "grid size-11 place-items-center rounded-2xl bg-[#E7F5F4] text-[#22577A]"
                      : "grid size-11 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]"
                  }
                >
                  {index % 2 === 0 ? (
                    <Code2 className="size-5" />
                  ) : (
                    <Zap className="size-5" />
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CareerProof() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-[#0F172A] p-6 text-white md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#57CC99]">
                Career proof layer
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Every learner leaves with something visible.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#E9EAF0]">
                The homepage should sell outcomes, not just features. This
                section makes the promise clear: portfolio, interview readiness,
                and certificate proof.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {outcomeCards.map(([title, text], index) => (
                <article
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur"
                >
                  <div
                    className={
                      index === 1
                        ? "grid size-11 place-items-center rounded-2xl bg-[#FF7A0E] text-white"
                        : "grid size-11 place-items-center rounded-2xl bg-[#57CC99]/15 text-[#57CC99]"
                    }
                  >
                    {index === 0 && <Code2 className="size-5" />}
                    {index === 1 && <BriefcaseBusiness className="size-5" />}
                    {index === 2 && <Award className="size-5" />}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#E9EAF0]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MentorShowcase() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#E86C0D]">
              Mentor showcase
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Learn from people who have shipped real systems.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6B7280]">
              Mentors help you review code, understand tradeoffs, prepare
              interviews, and stay consistent.
            </p>
            <Button
              asChild
              className="mt-6 bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
            >
              <Link href="/mentors">View mentors</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {mentors.map(([name, role, company, image]) => (
              <article
                key={name}
                className="rounded-3xl border border-[#E9EAF0] bg-[#F9FAFB] p-4"
              >
                <Image
                  src={image}
                  alt={name}
                  width={320}
                  height={320}
                  className="aspect-square rounded-2xl object-cover"
                />
                <h3 className="mt-4 font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-[#6B7280]">{role}</p>
                <p className="mt-1 text-sm font-medium text-[#22577A]">
                  {company}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CommunityHighlights() {
  return (
    <section className="bg-[#0F172A] py-16 text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#57CC99]">
              Community highlights
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Cohorts, challenges, and peer momentum.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#E9EAF0]">
              Join groups, participate in bounties, attend workshops, and learn
              around people chasing similar outcomes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Live rooms", "Weekly mentor and peer sessions"],
              ["Bounties", "Portfolio challenges with visible ranks"],
              ["Events", "Webinars, hackathons, and exam prep"],
            ].map(([title, text]) => (
              <article
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <Users className="size-6 text-[#57CC99]" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#E9EAF0]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function SuccessStories() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#E86C0D]">
              Success stories
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Modern learner wins, with proof behind the progress.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6B7280]">
              Make testimonials feel like outcomes: role, result, quote, and the
              skills they built.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="w-fit text-[#E86C0D] hover:bg-[#FFEEE8]"
          >
            <Link href="/success-stories">
              View all stories
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {stories.map((story, index) => (
            <article
              key={story.name}
              className={
                index === 1
                  ? "relative overflow-hidden rounded-[2rem] border border-[#FF7A0E]/30 bg-[#0F172A] p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]"
                  : "relative overflow-hidden rounded-[2rem] border border-[#E9EAF0] bg-[#F9FAFB] p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)]"
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={
                    index === 1
                      ? "grid size-14 place-items-center rounded-2xl bg-white/10 text-lg font-semibold text-white"
                      : "grid size-14 place-items-center rounded-2xl bg-[#FFEEE8] text-lg font-semibold text-[#E86C0D]"
                  }
                >
                  {getInitials(story.name)}
                </div>
                <div className="flex gap-1 text-[#FF7A0E]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="size-4 fill-[#FF7A0E]/30"
                    />
                  ))}
                </div>
              </div>

              <p
                className={
                  index === 1
                    ? "mt-6 text-sm font-semibold text-[#57CC99]"
                    : "mt-6 text-sm font-semibold text-[#22577A]"
                }
              >
                {story.outcome}
              </p>

              <p
                className={
                  index === 1
                    ? "mt-4 text-base leading-7 text-[#E9EAF0]"
                    : "mt-4 text-base leading-7 text-[#374151]"
                }
              >
                “{story.quote}”
              </p>

              <div
                className={
                  index === 1
                    ? "mt-6 border-t border-white/10 pt-5"
                    : "mt-6 border-t border-[#E9EAF0] pt-5"
                }
              >
                <p className="font-semibold">{story.name}</p>
                <p
                  className={
                    index === 1
                      ? "text-sm text-[#8C94A3]"
                      : "text-sm text-[#6B7280]"
                  }
                >
                  {story.role}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {story.stack.map((item) => (
                    <span
                      key={item}
                      className={
                        index === 1
                          ? "rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#E9EAF0]"
                          : "rounded-full bg-white px-3 py-1 text-xs font-medium text-[#22577A] ring-1 ring-[#E9EAF0]"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function BeforeAfter() {
  return (
    <section className="bg-[#F9FAFB] py-16">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-[#E9EAF0] bg-white p-8">
            <p className="text-sm font-semibold text-[#6B7280]">Before</p>
            <h2 className="mt-3 text-3xl font-semibold">Scattered learning</h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[#6B7280]">
              {[
                "Random playlists",
                "No project review",
                "No interview direction",
                "Unclear career path",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-[#8C94A3]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-[#38A3A5]/30 bg-[#E7F5F4] p-8">
            <p className="text-sm font-semibold text-[#22577A]">After</p>
            <h2 className="mt-3 text-3xl font-semibold">Guided outcomes</h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[#22577A]">
              {[
                "Weekly roadmap",
                "Mentor-reviewed projects",
                "Mock interviews",
                "Portfolio and certificate proof",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 text-[#38A3A5]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="Your path from novice to expert, simplified into clear steps."
          description="No confusing routes. Choose, build, prove, and move toward a career outcome."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <article
              key={number}
              className="relative overflow-hidden rounded-3xl bg-white p-6"
            >
              <span className="absolute -top-6 left-2 text-8xl font-semibold leading-none text-[#E9EAF0]/80">
                {number}
              </span>
              <div className="relative pt-8">
                <div className="grid size-11 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]">
                  {number === "01" && <Rocket className="size-5" />}
                  {number === "02" && <Code2 className="size-5" />}
                  {number === "03" && <Award className="size-5" />}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Certifications() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <Container>
        <SectionHeader
          eyebrow="Industry certifications"
          title="Gain credentials recognized by global tech leaders."
          description="Use LearnerSlate programs to build the skills and project confidence needed for certification tracks."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All vendors", "AWS", "Azure", "Google Cloud", "CompTIA"].map(
            (item, index) => (
              <span
                key={item}
                className={
                  index === 0
                    ? "rounded-full bg-[#FF7A0E] px-4 py-2 text-sm font-medium text-white"
                    : "rounded-full border border-[#E9EAF0] bg-white px-4 py-2 text-sm font-medium text-[#6B7280]"
                }
              >
                {item}
              </span>
            ),
          )}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {industryCertifications.map(([title, text, tag]) => (
            <article
              key={title}
              className="rounded-3xl border border-[#E9EAF0] bg-white p-6 text-center shadow-[0_16px_45px_rgba(15,23,42,0.045)]"
            >
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]">
                <Award className="size-7" />
              </div>
              <span className="mt-5 inline-flex rounded-full bg-[#E7F5F4] px-3 py-1 text-xs font-medium text-[#22577A]">
                {tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7280]">{text}</p>
              <Button
                asChild
                variant="outline"
                className="mt-6 border-[#FF7A0E] text-[#E86C0D] hover:bg-[#FFEEE8]"
              >
                <Link href="/certifications">Explore track</Link>
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ResourcesForGrowth() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#E86C0D]">
              Resources for growth
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Keep learning between cohorts.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6B7280]">
              Insights, tutorials, and updates to help you stay sharp while you
              explore programs and roadmaps.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="w-fit text-[#E86C0D] hover:bg-[#FFEEE8]"
          >
            <Link href="/blog">
              View all articles
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {resources.map(([category, title, meta], index) => (
            <article key={title} className="group">
              <div
                className={
                  index === 0
                    ? "grid aspect-[16/9] place-items-center rounded-2xl bg-[#E7F5F4] text-[#22577A]"
                    : index === 1
                      ? "grid aspect-[16/9] place-items-center rounded-2xl bg-[#FFEEE8] text-[#E86C0D]"
                      : "grid aspect-[16/9] place-items-center rounded-2xl bg-[#E9EAF0] text-[#6B7280]"
                }
              >
                <BookOpenCheck className="size-9" />
              </div>
              <p className="mt-4 text-xs font-semibold text-[#E86C0D]">
                {category}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-[#0F172A] transition group-hover:text-[#22577A]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-[#6B7280]">{meta}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="rounded-3xl bg-[#0F172A] p-8 text-white md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#57CC99]">
                Community section
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Never learn alone again.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#E9EAF0]">
                Join peers, mentors, events, hackathons, and accountability
                channels built around practical learning.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
            >
              <Link href="/events">Join community</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          title="Flexible monthly starts for serious learners."
          description="Start with the path that matches your pace. Full pricing and cohort details live on the programs page."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          {programs.map((program, index) => (
            <article
              key={program.title}
              className="relative overflow-hidden rounded-[2rem] border border-[#E9EAF0] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
            >
              <div
                className={
                  index === 0
                    ? "absolute inset-x-0 top-0 h-1.5 bg-[#38A3A5]"
                    : "absolute inset-x-0 top-0 h-1.5 bg-[#FF7A0E]"
                }
              />
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={
                      index === 0
                        ? "rounded-full bg-[#E7F5F4] px-3 py-1 text-sm font-medium text-[#22577A]"
                        : "rounded-full bg-[#FFEEE8] px-3 py-1 text-sm font-medium text-[#E86C0D]"
                    }
                  >
                    {program.label}
                  </span>
                  <span className="rounded-full border border-[#E9EAF0] px-3 py-1 text-xs font-medium text-[#6B7280]">
                    {index === 0 ? "Foundation path" : "Fast-track path"}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold leading-tight text-[#0F172A]">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                  {program.highlight}. Includes mentorship, project reviews,
                  cohort access, and placement preparation.
                </p>

                <div className="mt-7 rounded-3xl bg-[#0F172A] p-5 text-white">
                  <p className="text-sm text-[#8C94A3]">Starting at</p>
                  <div className="mt-2 flex items-end gap-2">
                    <p className="text-4xl font-semibold">{program.price}</p>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      ["Duration", program.duration],
                      ["Next cohort", program.cohort],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-white/7 p-3">
                        <p className="text-xs text-[#8C94A3]">{label}</p>
                        <p className="mt-1 text-sm font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {program.outcomes.map((outcome) => (
                    <p
                      key={outcome}
                      className="flex items-center gap-3 text-sm text-[#374151]"
                    >
                      <CheckCircle2
                        className={
                          index === 0
                            ? "size-4 text-[#38A3A5]"
                            : "size-4 text-[#FF7A0E]"
                        }
                      />
                      {outcome}
                    </p>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <Button
                    asChild
                    className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
                  >
                    <Link href={program.href}>
                      See details
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Talk to mentor</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Questions before you start?"
          description="A quick pass through the decisions learners usually care about."
        />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-[#E9EAF0] rounded-3xl border border-[#E9EAF0] bg-white">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {question}
                <ArrowRight className="size-4 transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#6B7280]">{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-[#F9FAFB] py-16">
      <Container>
        <div className="rounded-3xl border border-[#E9EAF0] bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-12">
          <Rocket className="mx-auto size-10 text-[#FF7A0E]" />
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Ready to build your next version?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6B7280]">
            Explore the programs, compare your options, and choose the path that
            gives your learning a real direction.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
            >
              <Link href="/programs">Compare programs</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Talk to a mentor</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
