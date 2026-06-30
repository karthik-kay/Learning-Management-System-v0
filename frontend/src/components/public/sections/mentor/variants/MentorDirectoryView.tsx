"use client";

import { SearchX, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { FilterSection } from "@/components/public/sections/filter/FilterSection";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { MentorSection } from "@/components/public/sections/mentor/MentorSection";
import { MentorGrid } from "@/components/public/sections/mentor/variants/MentorGrid";
import { CategoryTabs } from "@/components/public/widgets/discovery/CategoryTabs";
import { FilterBar } from "@/components/public/widgets/discovery/FilterBar";
import { SearchBar } from "@/components/public/widgets/discovery/SearchBar";
import { usePublicFaculty } from "@/hooks/queries/public";

export function MentorDirectoryView() {
  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("");
  const facultyQuery = usePublicFaculty();
  const mentors = useMemo(() => facultyQuery.data ?? [], [facultyQuery.data]);

  const expertiseOptions = useMemo(
    () =>
      Array.from(new Set(mentors.flatMap((mentor) => mentor.expertise))).sort(),
    [mentors],
  );
  const filteredMentors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return mentors.filter((mentor) => {
      const matchesSearch =
        !query ||
        mentor.display_name.toLowerCase().includes(query) ||
        mentor.headline.toLowerCase().includes(query) ||
        mentor.company.toLowerCase().includes(query) ||
        mentor.expertise.some((item) => item.toLowerCase().includes(query));
      const matchesExpertise =
        !expertise || mentor.expertise.includes(expertise);
      return matchesSearch && matchesExpertise;
    });
  }, [expertise, mentors, search]);

  return (
    <div className="bg-[#F8FAFC]">
      <HeroSection className="bg-[#0F172A] py-20 text-white lg:py-24">
        <CenterHero
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-[#38A3A5]/30 bg-[#38A3A5]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#57CC99]">
              <Users className="size-4" />
              Industry Mentors
            </span>
          }
          title={
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Learn from people
              <br />
              <span className="text-[#FF7A0E]">doing the work.</span>
            </h1>
          }
          description={
            <p className="text-base leading-7 text-[#CBD5E1]">
              Explore verified mentors across software engineering, data, AI,
              cloud, security, and career development.
            </p>
          }
          stats={
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#CBD5E1]">
              <span>
                <strong className="text-white">{mentors.length}</strong> public
                mentors
              </span>
              <span>
                <strong className="text-white">
                  {mentors.reduce(
                    (total, mentor) => total + mentor.students_mentored,
                    0,
                  )}
                </strong>{" "}
                learners mentored
              </span>
            </div>
          }
        />
      </HeroSection>

      <FilterSection sticky className="top-0 py-4">
        <FilterBar>
          <SearchBar
            value={search}
            onValueChange={setSearch}
            placeholder="Search mentors, companies, or skills"
            label="Search mentors"
          />
          <CategoryTabs
            categories={[
              { label: "All expertise", value: "" },
              ...expertiseOptions.map((item) => ({
                label: item,
                value: item,
              })),
            ]}
            value={expertise}
            onValueChange={setExpertise}
            ariaLabel="Filter mentors by expertise"
          />
        </FilterBar>
      </FilterSection>

      <MentorSection className="py-14 lg:py-20">
        {facultyQuery.isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-[480px] animate-pulse rounded-2xl bg-[#DDE5EE]"
              />
            ))}
          </div>
        ) : facultyQuery.isError ? (
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Mentors could not be loaded
            </h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Please try again when the faculty service is available.
            </p>
          </div>
        ) : filteredMentors.length > 0 ? (
          <MentorGrid mentors={filteredMentors} />
        ) : (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center">
            <SearchX className="mx-auto size-10 text-[#38A3A5]" />
            <h2 className="mt-4 text-xl font-bold text-[#0F172A]">
              No mentors match those filters
            </h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Try another skill or clear your search.
            </p>
          </div>
        )}
      </MentorSection>
    </div>
  );
}
