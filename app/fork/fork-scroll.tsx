"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect } from "react";
import type { ReactNode } from "react";

const howItWorks = [
  ["01", "one city", "one fork"],
  ["02", "student-led", "always"],
  ["03", "local identity", "shared mission"],
  ["04", "ship publicly", "within 90 days"],
  ["05", "core support", "without hand-holding"],
];

const benefits = [
  "brand resources",
  "fork playbook",
  "website structure",
  "council support",
  "launch kit",
  "templates + assets",
];

function Texture() {
  return (
    <>
      <div className="absolute inset-0 bg-[#97192C]" aria-hidden />
      <div
        className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_18%_20%,rgba(18,15,10,0.2),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(252,146,13,0.12),transparent_20%),linear-gradient(90deg,rgba(18,15,10,0.08),transparent_40%,rgba(208,207,206,0.05))]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-halftone opacity-25 mix-blend-soft-light" aria-hidden />
      <div className="absolute inset-0 bg-noise-texture opacity-55 mix-blend-overlay" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(106deg,transparent_0%,transparent_48%,rgba(208,207,206,0.24)_49%,transparent_50%,transparent_100%),linear-gradient(8deg,transparent_0%,transparent_59%,rgba(18,15,10,0.34)_60%,transparent_61%,transparent_100%)]"
        aria-hidden
      />
    </>
  );
}

function PosterWord({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 0.45], ["0vh", "-22vh"]);
  const opacity = useTransform(progress, [0, 0.6], [0.56, 0.08]);
  const scale = useTransform(progress, [0, 0.5], [1, 1.08]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="pointer-events-none absolute -left-[6vw] top-[8vh] z-0 font-display text-[24vw] font-black uppercase leading-[0.72] tracking-[-0.12em] text-[#120F0A]"
      aria-hidden
    >
      FORKS
    </motion.div>
  );
}

function PaperCard({
  progress,
  start,
  end,
  className,
  children,
  rotateFrom = -2,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  className: string;
  children: ReactNode;
  rotateFrom?: number;
}) {
  const opacity = useTransform(progress, [start - 0.04, start, end, end + 0.04], [0, 1, 1, 0]);
  const y = useTransform(progress, [start - 0.04, start], ["12vh", "0vh"]);
  const rotate = useTransform(progress, [start - 0.04, start], [rotateFrom, 0]);
  const scale = useTransform(progress, [start - 0.04, start], [0.96, 1]);

  return (
    <motion.div style={{ opacity, y, rotate, scale }} className={className}>
      <div className="absolute inset-0 bg-noise-texture opacity-25 mix-blend-multiply" aria-hidden />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function PastedCard({
  number,
  title,
  line,
  index,
  exit,
  progress,
}: {
  number: string;
  title: string;
  line: string;
  index: number;
  exit: number;
  progress: MotionValue<number>;
}) {
  const start = 0.33 + index * 0.028;
  const opacity = useTransform(progress, [start, start + 0.035, exit, exit + 0.04], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.04], ["9vh", "0vh"]);
  const rotate = useTransform(progress, [start, start + 0.04], [index % 2 ? 3 : -3, index % 2 ? -1 : 1]);

  return (
    <motion.div
      style={{ opacity, y, rotate }}
      className="relative min-h-[10.5rem] overflow-hidden bg-[#D0CFCE] p-4 text-[#120F0A] shadow-[9px_9px_0_#120F0A]"
    >
      <div className="absolute inset-0 bg-noise-texture opacity-25 mix-blend-multiply" aria-hidden />
      <div className="relative">
        <p className="font-mono text-xs font-black text-[#97192C]">{number}</p>
        <h3 className="mt-4 text-balance font-display text-[clamp(1.35rem,2.35vw,2.15rem)] font-black uppercase leading-[0.95] tracking-[-0.035em]">
          {title}
        </h3>
        <p className="mt-3 font-serif-brand text-base leading-tight text-[#120F0A]/78">{line}</p>
      </div>
    </motion.div>
  );
}

function HowItWorksMobile({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.31, 0.36, 0.49, 0.54], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.31, 0.36], ["8vh", "0vh"]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-4 top-[max(5rem,10svh)] z-40 bg-[#D0CFCE] p-4 text-[#120F0A] shadow-[9px_9px_0_#120F0A] md:hidden"
    >
      <div className="absolute inset-0 bg-noise-texture opacity-25 mix-blend-multiply" aria-hidden />
      <div className="relative">
        <p className="w-fit bg-[#120F0A] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#FC920D]">
          how it works
        </p>
        <div className="mt-4 grid gap-2">
          {howItWorks.map(([number, title, line]) => (
            <div key={number} className="grid grid-cols-[2.2rem_1fr] gap-3 border-t border-[#120F0A]/20 py-3 first:border-t-0">
              <span className="font-mono text-xs font-black text-[#97192C]">{number}</span>
              <div>
                <h3 className="font-display text-[clamp(1.35rem,8vw,2rem)] font-black uppercase leading-[0.92] tracking-[-0.035em]">
                  {title}
                </h3>
                <p className="mt-1 font-serif-brand text-base leading-tight text-[#120F0A]/75">{line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BenefitLabel({ item, index, progress }: { item: string; index: number; progress: MotionValue<number> }) {
  const start = 0.67 + index * 0.022;
  const opacity = useTransform(progress, [start, start + 0.035, 0.81, 0.85], [0, 1, 1, 0]);
  const x = useTransform(progress, [start, start + 0.035], [index % 2 ? 60 : -60, 0]);
  const rotate = index % 2 ? -2 : 2;

  return (
    <motion.div
      style={{ opacity, x, rotate }}
      className="bg-[#D0CFCE] px-4 py-3 font-display text-[clamp(1.15rem,2.35vw,2.15rem)] font-black uppercase leading-[0.95] tracking-[-0.035em] text-[#120F0A] shadow-[8px_8px_0_#120F0A]"
    >
      {item}
    </motion.div>
  );
}

function BenefitsMobile({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.64, 0.68, 0.8, 0.84], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.64, 0.68], ["8vh", "0vh"]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-4 top-[max(5rem,10svh)] z-40 bg-[#120F0A] p-4 text-[#D0CFCE] shadow-[9px_9px_0_#FC920D] md:hidden"
    >
      <p className="mb-4 w-fit bg-[#D0CFCE] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#120F0A]">
        what forks get
      </p>
      <div className="grid gap-2">
        {benefits.map((item) => (
          <div key={item} className="bg-[#D0CFCE] px-3 py-3 font-display text-[clamp(1.35rem,8vw,2.2rem)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#120F0A]">
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ForkScroll({ applyUrl }: { applyUrl: string }) {
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const page = document.documentElement;
        const maxScroll = Math.max(page.scrollHeight - window.innerHeight, 1);
        scrollYProgress.set(Math.min(window.scrollY / maxScroll, 1));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [scrollYProgress]);

  const openingOpacity = useTransform(scrollYProgress, [0, 0.13, 0.22], [1, 1, 0]);
  const openingY = useTransform(scrollYProgress, [0, 0.22], ["0vh", "-16vh"]);
  const openingRotate = useTransform(scrollYProgress, [0, 0.22], [0, 5]);
  const logoReveal = useTransform(scrollYProgress, [0.16, 0.28], [0, 1]);
  const logoRevealY = useTransform(scrollYProgress, [0.16, 0.28], ["1.5rem", "0rem"]);
  const howTitleOpacity = useTransform(scrollYProgress, [0.3, 0.34, 0.48, 0.53], [0, 1, 1, 0]);
  const manifestoOpacity = useTransform(scrollYProgress, [0.52, 0.58, 0.64, 0.69], [0, 1, 1, 0]);
  const manifestoY = useTransform(scrollYProgress, [0.5, 0.58], ["12vh", "0vh"]);
  const finalOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.82, 1], ["14vh", "0vh"]);

  return (
    <main className="relative overflow-x-hidden bg-[#97192C] text-[#D0CFCE]" style={{ minHeight: "780svh" }}>
      <section className="fixed inset-0 h-[100svh] overflow-hidden bg-[#97192C]">
        <Texture />
        <PosterWord progress={scrollYProgress} />
        <div
          className="pointer-events-none absolute -bottom-[10vw] right-[-7vw] z-0 hidden font-display text-[31vw] font-black uppercase leading-none tracking-[-0.12em] text-[#120F0A]/12 md:block"
          aria-hidden
        >
          LEAD
        </div>

        <motion.div
          style={{ opacity: openingOpacity, y: openingY, rotate: openingRotate }}
          className="absolute left-1/2 top-[max(5.25rem,18svh)] z-40 w-[min(90vw,52rem)] -translate-x-1/2 bg-[#D0CFCE] p-4 text-right text-[#120F0A] shadow-[10px_10px_0_#120F0A] sm:p-5 md:top-[30vh] md:p-8 md:shadow-[14px_14px_0_#120F0A]"
        >
          <div className="absolute inset-0 bg-noise-texture opacity-25 mix-blend-multiply" aria-hidden />
          <div className="relative">
            <h1 className="font-display text-[clamp(2.45rem,14vw,6.7rem)] font-black leading-[0.86] tracking-[-0.055em] md:leading-[0.82] md:tracking-[-0.07em]">
              no student
              <br />
              tech scene in
              <br />
              your city<span className="text-[#97192C]">?</span>
              <br />
              fork one<span className="text-[#97192C]">.</span>
            </h1>
            <p className="mt-4 font-serif-brand text-[clamp(1.2rem,6vw,2.55rem)] leading-tight tracking-[-0.03em] md:leading-none md:tracking-[-0.04em]">
              Build with people.
              <br />
              Ship publicly.
            </p>
            <div className="mt-5 bg-[#120F0A] px-4 py-3 text-left md:mt-7">
              <p className="whitespace-nowrap font-display text-[clamp(1.45rem,3.4vw,2.95rem)] font-black leading-none tracking-[-0.045em] text-[#D0CFCE]">
                bits&amp;bytes forks
              </p>
            </div>
          </div>
        </motion.div>

        <PaperCard
          progress={scrollYProgress}
          start={0.17}
          end={0.29}
          className="absolute inset-x-4 top-[max(5rem,10svh)] z-40 mx-auto w-auto max-w-[39rem] overflow-hidden bg-[#D0CFCE] p-4 text-[#120F0A] shadow-[10px_10px_0_#120F0A] md:left-auto md:right-[6vw] md:top-[14vh] md:mx-0 md:w-[min(82vw,39rem)] md:p-7 md:shadow-[12px_12px_0_#120F0A]"
          rotateFrom={3}
        >
          <p className="w-fit bg-[#120F0A] px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[#FC920D]">
            identity reveal
          </p>
          <motion.div style={{ opacity: logoReveal, y: logoRevealY }} className="mt-5 flex min-w-0 flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#120F0A] p-2.5 shadow-[6px_6px_0_#97192C] sm:h-20 sm:w-20 md:h-24 md:w-24 md:p-3 sm:shadow-[8px_8px_0_#97192C]">
              <Image src="/logo.svg" alt="bits&bytes logo" width={92} height={92} className="h-full w-full object-contain invert" />
            </div>
            <p className="min-w-0 whitespace-nowrap font-display text-[clamp(1.65rem,7vw,4rem)] font-black leading-none tracking-[-0.035em] text-[#120F0A] max-[390px]:text-[1.45rem]">
              bits&amp;bytes
            </p>
          </motion.div>
          <p className="mt-5 max-w-lg text-pretty font-serif-brand text-[clamp(1.08rem,5.1vw,2rem)] leading-tight text-[#120F0A]/82 md:text-[clamp(1.35rem,2.5vw,2rem)]">
            Not a chapter. Not a franchise. A fork: same mission, different build.
          </p>
        </PaperCard>

        <motion.div
          style={{ opacity: howTitleOpacity }}
          className="absolute left-[4vw] top-[8vh] z-40 hidden bg-[#120F0A] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[#FC920D] shadow-[6px_6px_0_rgba(18,15,10,0.35)] md:block"
        >
          how it works
        </motion.div>
        <div className="absolute inset-x-4 top-[18vh] z-30 mx-auto hidden max-w-6xl grid-cols-5 gap-4 md:grid">
          {howItWorks.map(([number, title, line], index) => (
            <PastedCard
              key={number}
              number={number}
              title={title}
              line={line}
              index={index}
              exit={0.49}
              progress={scrollYProgress}
            />
          ))}
        </div>
        <HowItWorksMobile progress={scrollYProgress} />

        <motion.div
          style={{ opacity: manifestoOpacity, y: manifestoY }}
          className="absolute inset-x-4 top-[max(5rem,12svh)] z-40 mx-auto max-w-[62rem] md:left-[6vw] md:right-auto md:top-[14vh] md:mx-0"
        >
          <p className="max-w-[54rem] font-display text-[clamp(3.2rem,16vw,8.6rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-[#120F0A] drop-shadow-[5px_5px_0_rgba(208,207,206,0.18)] md:leading-[0.82] md:tracking-[-0.075em]">
            own the
            <br />
            room.
          </p>
          <div className="mt-5 max-w-[38rem] bg-[#D0CFCE] p-4 text-[#120F0A] shadow-[10px_10px_0_#120F0A] md:mt-6 md:p-5 md:shadow-[12px_12px_0_#120F0A]">
            <p className="font-serif-brand text-[clamp(1.25rem,6vw,2.65rem)] leading-tight tracking-[-0.03em] md:leading-none md:tracking-[-0.045em]">
              A fork gives your city a flag, a reason to gather, and a public record of people building for real.
            </p>
          </div>
        </motion.div>

        <PaperCard
          progress={scrollYProgress}
          start={0.64}
          end={0.82}
          className="absolute inset-x-4 top-[10vh] z-40 mx-auto hidden max-w-6xl bg-transparent text-[#D0CFCE] md:block"
          rotateFrom={0}
        >
          <p className="mb-8 w-fit bg-[#120F0A] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[#FC920D] shadow-[6px_6px_0_rgba(18,15,10,0.3)]">
            what forks get
          </p>
          <div className="flex flex-wrap gap-4">
            {benefits.map((item, index) => (
              <BenefitLabel key={item} item={item} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </PaperCard>
        <BenefitsMobile progress={scrollYProgress} />

        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="absolute inset-x-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 mx-auto max-w-[58rem] bg-[#D0CFCE] p-4 text-right text-[#120F0A] shadow-[10px_10px_0_#120F0A] md:bottom-[7vh] md:p-8 md:shadow-[14px_14px_0_#120F0A]"
        >
          <div className="absolute inset-0 bg-noise-texture opacity-25 mix-blend-multiply" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-[clamp(2.75rem,13vw,8.4rem)] font-black leading-[0.86] tracking-[-0.055em] md:leading-[0.76] md:tracking-[-0.09em]">
              lead your
              <br />
              city&apos;s fork.
            </h2>
            <p className="mt-4 font-serif-brand text-[clamp(1.15rem,5.5vw,2.6rem)] leading-tight tracking-[-0.03em] md:leading-none md:tracking-[-0.04em]">
              Apply if you can gather people, make noise, and ship in public.
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-3 md:mt-8 md:flex-row md:items-center md:justify-between">
              <div className="bg-[#120F0A] px-5 py-3 text-left">
                <p className="whitespace-nowrap font-display text-[clamp(1.25rem,6vw,3.05rem)] font-black leading-none tracking-[-0.04em] text-[#D0CFCE]">
                  bits&amp;bytes forks
                </p>
              </div>
              <Link
                href={applyUrl}
                className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#FC920D] px-7 py-4 font-display text-sm font-black uppercase tracking-[0.14em] text-[#120F0A] shadow-[6px_6px_0_#120F0A] outline-none transition-transform duration-200 ease-out hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[#120F0A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#D0CFCE] active:scale-[0.97]"
              >
                apply now
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
