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
  title: "About Bits&Bytes",
  description:
    "Innovate. Collaborate. Hack. A teen-led code club. Three co-founders, no adults in the room. Built from scratch.",
  sections: [
    {
      title: "The Origin Story",
      description:
        "We were hosting Daydream Lucknow under Hack Club. Everything was set: venue, sponsors, participants. At the last moment, Hack Club pulled the venue. So we went fully independent and built the entire hackathon in 13 days flat. That's probably the most honest thing we can tell you about us. We don't quit, and we don't make excuses.",
    },
    {
      title: "High Agency Only",
      description:
        "Platforms like CodeDay and Hack Club are great for beginners. But they lock organizers into rigid formats that don't deliver. We're building the alternative. Anyone can participate, but they'll be surrounded by people who actually want to ship, not just attend.",
    },
    {
      title: "Ship Real Products",
      description:
        "Workshops and hack nights that end with something shipped, not just something learned. Hackathons, dev squads, and launches, all student-run.",
    },
    {
      title: "Production Grade",
      description:
        "If the site goes down, 1500 people notice. We build real infrastructure, not just demos that look good for five minutes.",
    },
  ],
};

// Core Team - Top tier
const coreTeam: CoreTeamMember[] = [
  {
    id: 1,
    name: "SHREETHAN KAGITHA",
    role: "Co-Founder & Organisation Lead",
    image: "/team/shree.jpeg",
    mobileImagePosition: "center 18%",
    bio: "Builds things that matter: a VS Code extension with thousands of users, hackathons with 400+ participants. IOQM National Qualifier. Built AI projects including laser pushup detection systems and PDF scrapers. Organized Scrapyard LKO and GDS MUN. Teaches CS at STEMist Lucknow.",
    expertise: [
      "Mathematics (IOQM)",
      "Full-Stack Dev",
      "Three.js / Three.js",
      "AI / ML Scaling",
      "GoDOT Game Dev",
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/yash-vardhan-singh-a41540270/",
      github: "https://github.com/yashclouded",
      website: "https://yashvibe.codes/",
    },
    accentColor: "var(--brand-purple)", // Deep Purple
    isFounder: true,
  },
  {
    id: 2,
    name: "Aadrika Maurya",
    role: "Co-Founder & Chief Creative Strategist",
    image: "/team/aadrika.png",
    mobileImagePosition: "center 20%",
    isFeatured: true,
    bio: "RSI India Alumni who conducted neuroscience research on EEG signals and attention modeling, the kind of work most people don't touch until grad school. Owns the creative direction and the strategy for what the network becomes.",
    expertise: [
      "Neuroscience (EEG)",
      "Creative Strategy",
      "Regional Management",
      "Brand Development",
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/aadrika-maurya/",
      github: "https://github.com/Aadrika08",
      website: "https://aadrikasportfolio.framer.website/",
    },
    accentColor: "var(--brand-pink)", // Vibrant Pink
    isFounder: true,
  },
  {
    id: 3,
    name: "Akshat Kushwaha",
    role: "Co-Founder & Technical Lead",
    image: "/team/akshat.jpg",
    mobileImagePosition: "center 16%",
    mobileImageScale: 1.03,
    bio: "AI-native systems engineer who asks what happens when software fails. Ex Jr. Research Engineer at jhana.ai at 17, where he built production AI systems including a Steno dictation plugin and AI-era IVRS. Builds retrieval architectures that survive real constraints. Owns the entire tech stack and anything that needs to work under pressure.",
    expertise: [
      "LLMOps / RAG",
      "Agentic Frameworks",
      "Next.js 16 / React 19",
      "FastAPI / Python",
      "System Design",
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/akshat-singh-kushwaha/",
      github: "https://github.com/a3ro-dev",
      website: "https://a3ro.dev",
    },
    accentColor: "var(--brand-plum)", // Rich Plum
    isFounder: true,
  },
  {
    id: 4,
    name: "Devaansh Pathak",
    role: "Founding Member & Backend Lead",
    image: "/team/devansh.jpeg",
    mobileImagePosition: "center 18%",
    bio: "Handles backend architecture and the economics of partnerships.",
    expertise: [
      "Backend Architecture",
      "Database Systems",
      "Partnership Building",
      "Community Outreach",
    ],
    linkedin: "https://www.linkedin.com/in/devaanshpa/",
  },
  {
    id: 5,
    name: "Maryam Fatima",
    role: "Social Media & Promotions Head",
    image: "/team/maryam.jpeg",
    mobileImagePosition: "center 22%",
    bio: "Runs social strategy. 10k+ impressions on club events. Designs visual campaigns for independent hackathons.",
    expertise: [
      "Impact Storytelling",
      "Visual Design",
      "Campaign Planning",
      "Brand Identity",
    ],
    linkedin: "https://www.linkedin.com/in/maryam-fatima-9719aa377/",
  },
  {
    id: 6,
    name: "Sristhi Singh",
    role: "Operations & Communications Head",
    image: "/team/srishti.jpeg",
    mobileImagePosition: "center 16%",
    bio: "Keeps 100+ members on the same page. Coordinates between design/dev squads and handles logistics for city-wide events.",
    expertise: [
      "Process Optimization",
      "Resource Logistics",
      "Team Communications",
      "Project Coordination",
    ],
    linkedin: "https://www.linkedin.com/in/srishti-singh-ab6a1b391",
  },
];

// Volunteers - smaller cards section
const volunteers: Volunteer[] = [
  {
    id: 11,
    name: "Jaagruti",
    image: "/team/jaagruti.jpeg",
    section: "Creatives",
  },
  {
    id: 18,
    name: "Kavan",
    image: "/team/kavan.jpg",
    section: "Creatives",
  },
  {
    id: 16,
    name: "Vareesha",
    image: "/team/vareesha.jpg",
    linkedin: "https://www.linkedin.com/in/vareesha-mehdi-a669203ab/",
    section: "Creatives",
  },
  {
    id: 13,
    name: "Aishwary",
    image: "/team/aishwary.jpeg",
    linkedin: "https://www.linkedin.com/in/ashlovesnoodle",
    section: "Creatives",
  },
  {
    id: 5,
    name: "Hridyansh",
    image: "/team/hirdyansh.jpeg",
    linkedin: "https://www.linkedin.com/in/hridyansh-bhardwaj-739470406/",
    section: "Tech",
  },
  {
    id: 7,
    name: "Areeb",
    image: "/team/areeb.png",
    linkedin: "https://www.linkedin.com/in/areeb-ahmad-066547315/",
    section: "Tech",
  },
  {
    id: 15,
    name: "Prakhar",
    image: "/team/prakhar.png",
    linkedin: "https://www.linkedin.com/in/prakharrdev/",
    section: "Tech",
  },
  {
    id: 14,
    name: "Adithya",
    image: "/team/adhitya.png", // Corrected image path and extension
    linkedin: "https://www.linkedin.com/in/adithya---k/",
    section: "Outreach",
  },
  {
    id: 8,
    name: "Atharva",
    image: "/team/atharva.jpg",
    linkedin: "https://www.linkedin.com/in/atharvaupadhyay/",
    section: "Outreach",
  },
  {
    id: 17,
    name: "Aanjaneya",
    image: "/team/aanjaneya.jpg",
    linkedin: "https://www.linkedin.com/in/aanjaneya-tripathi-0700a4346/",
    section: "Outreach",
  },
  {
    id: 21,
    name: "Shantanu Joshi",
    image: "/team/shantanu.jpeg",
    linkedin: "https://www.linkedin.com/in/theshantanujoshi/",
    section: "Creatives",
  },
];

export default function About() {
  return (
    <>
      <main className="relative z-10 bg-transparent">
        <PageSection
          align="center"
          eyebrow="About"
          title={aboutContent.title}
          description={aboutContent.description}
          className="pt-24 md:pt-32"
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
        >
          <Suspense fallback={<LoadingInline />}>
            <TeamCaseStudy coreTeam={coreTeam} volunteers={volunteers} />
          </Suspense>
          <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground px-4 sm:px-0">
            *Roles stay flexible as our team and club grow.
          </p>
        </PageSection>
      </main>
    </>
  );
}
