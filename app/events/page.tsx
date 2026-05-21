"use client";

import dynamic from "next/dynamic";
import { PageSection } from "@/components/page-section";
import { GlassContainer } from "@/components/ui/glass-container";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HyderabadBackground } from "@/components/ui/hyderabad-background";

const WebGLShader = dynamic(
  () =>
    import("@/components/ui/web-gl-shader").then((m) => ({
      default: m.WebGLShader,
    })),
  { loading: () => null, ssr: false },
);

export default function Events() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[72vh] flex items-center justify-center overflow-hidden text-white pt-24 md:pt-32"
        aria-labelledby="events-hero-title"
      >
        <WebGLShader />
        <div className="relative z-10 w-full mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto w-full max-w-[860px] min-h-[460px] md:min-h-[500px] px-6 py-12 md:py-20 sm:px-10 lg:px-16 text-center flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.35em] font-semibold text-white/90 backdrop-blur-md shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-pink)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-pink)]" />
                </span>
                Events
              </span>
              <h1
                id="events-hero-title"
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-extrabold text-white tracking-tighter drop-shadow-2xl"
              >
                Where code meets <br className="hidden sm:block" /> the real
                world
              </h1>
              <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/85 font-medium leading-relaxed">
                Hackathons, summits, and workshops where Hyderabad's best teen builders actually
                ship things.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-transparent flex flex-col pt-12 pb-32 relative z-10 min-h-screen">
        <HyderabadBackground />
        <PageSection
          align="center"
          eyebrow="Upcoming"
          title="Hyderabad Events"
          description="We're currently brewing our next big event. Join the crew to be the first to know."
        >
          <div className="mx-auto max-w-2xl mt-8">
            <GlassContainer glowColor="pink" className="p-8 md:p-12 text-center flex flex-col items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-[var(--brand-pink)]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Incoming Transmission...</h2>
              <p className="text-white/70 max-w-md">
                Our team is actively planning the next huge hackathon for Hyderabad. It's going to be massive.
              </p>
              <Button asChild className="mt-4 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[#5D2F77] px-8 py-6 text-base font-bold shadow-[0_0_20px_rgba(228,90,146,0.4)] hover:shadow-[0_0_30px_rgba(228,90,146,0.6)] border-none">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSer9m4Kh7dzHtCEHqCmxpSv8r2ylKL0bKUcn7v553dbClTVdA/viewform" target="_blank" rel="noopener noreferrer">
                  Join the HYD Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </GlassContainer>
          </div>
        </PageSection>
      </main>
    </>
  );
}
