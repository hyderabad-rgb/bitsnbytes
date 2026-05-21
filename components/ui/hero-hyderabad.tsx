"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";


export const HeroHyderabad = () => {
  return (
    <section
      className="relative overflow-hidden rounded-b-[1.5rem] sm:rounded-b-[2rem] md:rounded-b-[3rem] lg:rounded-b-[3.5rem] text-white w-full max-w-full min-h-[90vh] flex flex-col justify-center pt-20"
      aria-labelledby="home-hero-title"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hyderabad_tech_bg.png"
          className="object-cover w-full h-full opacity-60"
        >
          {/* We suggest the user to place their motion picture in public directory */}
          <source src="/hyderabad-montage.mp4" type="video/mp4" />
        </video>
        {/* Deep Burgundy/Plum Gradient Overlay from brand guidelines to blend the video into the theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120F0A] via-[#3C0A12]/80 to-[#0D9488]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120F0A]/90 via-transparent to-[#120F0A]/90" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6 md:gap-8 px-4 py-12 sm:px-6 md:px-8 box-border flex-1 items-center justify-center">
        {/* Center content card */}
        <div className="w-full max-w-3xl mx-auto">
          <GlassContainer
            className="p-6 sm:p-8 md:p-12 border-(--brand-pink)/20 backdrop-blur-xl bg-black/40"
            containerClassName="w-full"
            glowColor="pink"
          >
            <div className="flex flex-col items-center text-center h-full gap-6 sm:gap-8 md:gap-10">

              {/* Main content */}
              <div className="space-y-6 flex flex-col items-center">
                <h1
                  id="home-hero-title"
                  className="font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter drop-shadow-2xl"
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                    City of Pearls.
                  </span>
                  <span className="block mt-2">
                    City of <span className="text-(--brand-pink) drop-shadow-[0_0_20px_rgba(228,90,146,0.8)]">Builders.</span>
                  </span>
                </h1>
                
                <p className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#FDA83D]">
                  <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FDA83D] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-[#FDA83D]"></span>
                  </span>
                  BITS&BYTES • THE CYBERABAD CHAPTER
                </p>
                <p className="text-sm text-white/90 sm:text-base md:text-lg lg:text-xl max-w-xl leading-relaxed font-medium mx-auto">
                  We are not just in Hyderabad—we represent it. From Charminar's heritage to Cyber Towers' innovation, we're uniting the boldest teen builders to ship real products.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row w-full max-w-md mt-4 justify-center">
                <Button
                  asChild
                  className="w-full sm:flex-1 h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-gradient-to-r from-(--brand-pink) to-[#5D2F77] text-sm sm:text-base font-bold text-white shadow-[0_0_30px_rgba(228,90,146,0.6)] hover:shadow-[0_0_50px_rgba(228,90,146,0.8)] transition-transform hover:scale-[1.02] active:scale-[0.98] border-none"
                >
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSer9m4Kh7dzHtCEHqCmxpSv8r2ylKL0bKUcn7v553dbClTVdA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Join the HYD Crew
                    <ArrowRight className="h-5 w-5 shrink-0" />
                  </Link>
                </Button>

              </div>
            </div>
          </GlassContainer>
        </div>
      </div>
    </section>
  );
};

export default HeroHyderabad;
