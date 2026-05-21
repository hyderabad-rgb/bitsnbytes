"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { PageSection } from "@/components/page-section";
import { LoadingInline } from "@/components/loading-wrapper";
import { HyderabadBackground } from "@/components/ui/hyderabad-background";

import type { CoreTeamMember, Volunteer } from "@/components/team-case-study";

// Lazy load heavy components
const TeamCaseStudy = dynamic(() => import("@/components/team-case-study"), {
  loading: () => <LoadingInline />,
  ssr: true,
});

const aboutContent = {
  title: "Bits&Bytes Hyderabad",
  description:
    "The independent, teen-led hacker network of Hyderabad. We unite the boldest builders to ship real products—no adults in the room.",
};

// Core Team - Top tier
const coreTeam: CoreTeamMember[] = [
  {
    id: 1,
    name: "SHREETHAN KAGITHA",
    role: "Fork Lead & Social Media",
    image: "/team/shreethan.jpg",
    mobileImagePosition: "center 18%",
    bio: "Full-stack engineer and AI specialist architecting secure, scalable systems and intelligent applications.",
    expertise: [
      "Leadership",
      "Social Media Strategy",
    ],
    socials: {},
    accentColor: "var(--brand-purple)", // Deep Purple
    isFounder: true,
  },
  {
    id: 2,
    name: "MEGHANA PERADA",
    role: "Tech Lead",
    image: "/team/meghana.jpg",
    mobileImagePosition: "center 20%",
    bio: "Software engineer specializing in robust system architecture, complex algorithmic problem-solving, and scalable product development.",
    expertise: [
      "Tech Leadership",
      "Software Engineering",
    ],
    socials: {},
    accentColor: "var(--brand-pink)", // Vibrant Pink
    isFounder: true,
  },
];

// Volunteers - smaller cards section
const volunteers: Volunteer[] = [];

export default function About() {
  return (
    <>
      <main className="relative z-10 bg-transparent min-h-screen">
        <HyderabadBackground />
        <PageSection
          align="center"
          eyebrow="About"
          title={aboutContent.title}
          description={aboutContent.description}
          className="pt-20 md:pt-24 pb-4 md:pb-6"
        />

        <PageSection
          align="center"
          eyebrow="Team"
          title="Meet the Agents"
          description="Designers, engineers, club leads, and storytellers. The people behind everything."
          className="pt-8 md:pt-12 pb-16 md:pb-20"
        >
          <Suspense fallback={<LoadingInline />}>
            <TeamCaseStudy coreTeam={coreTeam} volunteers={volunteers} />
          </Suspense>
          <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground px-4 sm:px-0 mb-16">
            *Roles stay flexible as our team and club grow.
          </p>

          {/* Network Founders Section */}
          <div className="w-full border-t border-white/10 pt-16 mt-8 max-w-6xl mx-auto text-left">
            <h3 className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-2">
              NETWORK FOUNDERS
            </h3>
            <p className="text-sm text-white/40 mb-10">
              The founders of Bits&Bytes. Reproduced from the parent org.
            </p>
            
            <div className="flex flex-wrap justify-start items-center gap-x-12 gap-y-8">
              {[
                {
                  name: "Yash Singh",
                  role: "CO-FOUNDER & ORGANISATION LEAD",
                  img: "https://github.com/yashclouded.png",
                },
                {
                  name: "Aadrika Maurya",
                  role: "CO-FOUNDER & CHIEF CREATIVE STRATEGIST",
                  img: "https://github.com/Aadrika08.png",
                },
                {
                  name: "Akshat Kushwaha",
                  role: "CO-FOUNDER & TECHNICAL LEAD",
                  img: "https://github.com/a3ro-dev.png",
                },
              ].map((founder) => (
                <div key={founder.name} className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full overflow-hidden border border-white/20">
                    <img src={founder.img} alt={founder.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-0.5">{founder.name}</h4>
                    <p className="text-[0.65rem] font-medium text-white/60 tracking-wider">{founder.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageSection>
      </main>
    </>
  );
}
