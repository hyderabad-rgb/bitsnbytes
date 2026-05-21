"use client";

import React from "react";
import { cn } from "@/lib/utils";

const hyderabadZones = [
  "SHIPPING IN GACHIBOWLI",
  "DEBUGGING IN JUBILEE HILLS",
  "DEPLOYING IN HI-TEC CITY",
  "HACKING IN MADHAPUR",
  "LAUNCHING IN BANJARA HILLS",
  "BUILDING IN KONDAPUR",
];

export const HyderabadMarquee = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full overflow-hidden bg-[var(--brand-ink)] border-y border-white/10 py-3 sm:py-4 flex items-center select-none relative z-20", className)}>
      <div 
        className="flex w-max min-w-full animate-scroll hover:[animation-play-state:paused]"
        style={{ "--animation-duration": "30s" } as React.CSSProperties}
      >
        {/* We duplicate the content to create a seamless loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center justify-around gap-8 px-4 text-[10px] sm:text-xs md:text-sm font-mono tracking-widest text-white/50">
            {hyderabadZones.map((zone, j) => (
              <React.Fragment key={j}>
                <span className="hover:text-[var(--brand-pink)] transition-colors cursor-default drop-shadow-sm">{zone}</span>
                <span className="text-[var(--brand-pink)]/40 px-2 font-black">//</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
