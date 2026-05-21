"use client";

export function HyderabadBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-[-1]">
      {/* Dynamic Glows */}
      <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[50%] rounded-full bg-[var(--brand-pink)]/5 blur-[150px]" />
      <div className="absolute top-[50%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#5D2F77]/5 blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#FDA83D]/5 blur-[150px]" />
      
      {/* Abstract Typography Elements */}
      <div className="absolute top-[10%] left-[-2%] opacity-[0.02] -rotate-90 origin-top-left flex flex-col">
        <span className="text-[12rem] font-black tracking-tighter uppercase whitespace-nowrap leading-none">
          HYD // 040
        </span>
      </div>

      <div className="absolute top-[30%] right-[-5%] opacity-[0.015] flex flex-col items-end">
        <span className="text-[16rem] font-black tracking-tighter uppercase whitespace-nowrap leading-none">
          CYBER
        </span>
        <span className="text-[16rem] font-black tracking-tighter uppercase whitespace-nowrap leading-none -mt-16">
          ABAD
        </span>
      </div>
      
      {/* Tech / Localization Data Points */}
      <div className="absolute top-[25%] right-[10%] opacity-30 font-mono text-xs sm:text-sm tracking-[0.3em] text-[var(--brand-pink)] flex items-center gap-4">
        <div className="h-px w-12 bg-[var(--brand-pink)]/50" />
        17.3616° N, 78.4747° E
      </div>
      
      <div className="absolute bottom-[35%] left-[8%] opacity-30 font-mono text-xs sm:text-sm tracking-[0.3em] text-[#FDA83D] flex items-center gap-4">
        HI-TEC CITY // DECCAN
        <div className="h-px w-12 bg-[#FDA83D]/50" />
      </div>

      {/* Cyber Grid Overlay for Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
