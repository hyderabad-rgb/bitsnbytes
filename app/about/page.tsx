"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { PageSection } from "@/components/page-section";
import { LoadingInline } from "@/components/loading-wrapper";
import {
  GlowingCard,
  GlowingCardTitle,
  GlowingCardDescription,
} from "@/components/ui/glowing-card";
import type { CoreTeamMember, Volunteer } from "@/components/team-case-study";

// Lazy load heavy components
const TeamCaseStudy = dynamic(() => import("@/components/team-case-study"), {
  loading: () => <LoadingInline />,
  ssr: true,
});

const aboutContent = {
  title: "Bits&Bytes Hyderabad",
  description:
    "Innovate. Collaborate. Hack. The independent, teen-led code club is now in the City of Pearls. No adults in the room. Built from scratch.",
  sections: [
    {
      title: "The Genesis",
      description:
        "The national Bits&Bytes network was born when an event venue bailed 13 days before launch. The founders built a hackathon from scratch and sold it out. Now, we are bringing that exact independent, high-agency DNA to Hyderabad.",
    },
    {
      title: "High Agency Only",
      description:
        "We are building the alternative to rigid beginner platforms. We are uniting the boldest teen builders in Hyderabad who actually want to ship products, not just attend events.",
    },
    {
      title: "Ship Real Code",
      description:
        "From Charminar's heritage to Cyber Towers' innovation, our hackathons and dev squads in Hyderabad end with real products deployed to the real world.",
    },
    {
      title: "Production Grade",
      description:
        "We build real infrastructure, not just demos that look good for five minutes. We are preparing the next generation of Hyderabad engineers.",
    },
  ],
};

// Core Team - Top tier
const coreTeam: CoreTeamMember[] = [
  {
    id: 1,
    name: "SHREETHAN KAGITHA",
    role: "Fork Lead & Social Media",
    image: "/team/shreethan.jpg",
    mobileImagePosition: "center 18%",
    bio: "Bio coming soon...",
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
    bio: "Bio coming soon...",
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
      <main className="relative z-10 bg-transparent">
        <PageSection
          align="center"
          eyebrow="About"
          title={aboutContent.title}
          description={aboutContent.description}
          className="pt-20 md:pt-24 pb-8 md:pb-12"
        >
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4">
            {aboutContent.sections.map((section, index) => {
              // Define grid areas for each card
              const gridAreas = [
                "md:[grid-area:1/1/2/7]",
                "md:[grid-area:1/7/2/13]",
                "md:[grid-area:2/1/3/7]",
                "md:[grid-area:2/7/3/13]",
              ];
              return (
                <li key={section.title} className={gridAreas[index]}>
                  <GlowingCard animationDelay={index * 0.05}>
                    <div className="space-y-3">
                      <GlowingCardTitle>{section.title}</GlowingCardTitle>
                      <GlowingCardDescription>
                        {section.description}
                      </GlowingCardDescription>
                    </div>
                  </GlowingCard>
                </li>
              );
            })}
          </ul>
        </PageSection>

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
