"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import * as Color from "color-bits";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import logo from "@public/logo.svg";

// Helper function to convert any CSS color to rgba
export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback: string = "rgba(180, 180, 180)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;

  try {
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      return Color.formatRGBA(Color.parse(computedColor));
    }
    return Color.formatRGBA(Color.parse(cssColor));
  } catch (e) {
    console.error("Color parsing failed:", e);
    return fallback;
  }
};

export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function checkQuery() {
      const result = window.matchMedia(query);
      setValue(result.matches);
    }
    checkQuery();
    window.addEventListener("resize", checkQuery);
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", checkQuery);
    return () => {
      window.removeEventListener("resize", checkQuery);
      mediaQuery.removeEventListener("change", checkQuery);
    };
  }, [query]);

  return value;
}

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#B4B4B4",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => getRGBA(color), [color]);

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;

      if (text) {
        maskCtx.save();
        maskCtx.scale(dpr, dpr);
        maskCtx.fillStyle = "white";
        maskCtx.font = `${fontWeight} ${fontSize}px "Helvetica Now Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;
        maskCtx.textAlign = "center";
        maskCtx.textBaseline = "middle";
        maskCtx.fillText(text, width / (2 * dpr), height / (2 * dpr));
        maskCtx.restore();
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const squareWidth = squareSize * dpr;
          const squareHeight = squareSize * dpr;
          const maskData = maskCtx.getImageData(
            x,
            y,
            squareWidth,
            squareHeight,
          ).data;
          const hasText = maskData.some(
            (value, index) => index % 4 === 0 && value > 0,
          );
          const opacity = squares[i * rows + j];
          const finalOpacity = hasText
            ? Math.min(1, opacity * 3 + 0.4)
            : opacity;
          ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
          ctx.fillRect(x, y, squareWidth, squareHeight);
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.ceil(width / (squareSize + gridGap));
      const rows = Math.ceil(height / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };
    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    if (isInView) animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </div>
  );
};

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/gobitsbytes",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "https://github.com/gobitsnbytes-hyderabad", label: "GitHub", icon: Github },
  {
    href: "https://www.instagram.com/gobitsnbytes.hyd?igsh=MXE1OHh4MGllazBwbA==",
    label: "Instagram",
    icon: Instagram,
  },
];

const footerLinks = [
  {
    title: "Explore",
    links: [
      { id: 1, title: "About", url: "/about" },
      { id: 3, title: "Join", url: "/join" },
      { id: 4, title: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { id: 5, title: "FAQ", url: "/faq" },
      { id: 6, title: "Code of Conduct", url: "/coc" },
    ],
  },
];

export function FlickeringFooter() {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer
      id="footer"
      className="relative w-full pb-0 bg-[var(--brand-ink)] overflow-hidden"
    >
      {/* Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[var(--brand-pink)] to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[100px] bg-[var(--brand-pink)]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between p-8 sm:p-12 lg:p-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-start justify-start gap-y-4 max-w-xs">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-black text-white shadow-[0_8px_30px_rgba(228,90,146,0.4)]">
              <Image
                src={logo}
                alt="Bits&Bytes logo"
                width={28}
                height={28}
                className="h-6 w-6 object-contain"
                priority
              />
              <div className="absolute inset-0 rounded-xl border-2 border-[var(--brand-pink)]" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                Bits&Bytes
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Teen-led
              </p>
            </div>
          </Link>
          <p className="tracking-tight text-white/50 text-sm max-w-[280px] leading-relaxed">
            Forged in the City of Pearls. The premier teen hacker network of Hyderabad. No adults in the room.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center p-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white transition-all hover:scale-110 hover:border-[var(--brand-pink)]/50 hover:bg-[var(--brand-pink)]/10 hover:shadow-[0_0_15px_rgba(228,90,146,0.3)]"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
        <div className="pt-6 md:pt-0 md:w-1/2">
          <div className="flex flex-col items-start justify-start md:flex-row md:items-start md:justify-end gap-8 lg:gap-16">
            {footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-2">
                <li className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-foreground">
                  {column.title}
                </li>
                {column.links.map((link) => (
                  <li
                    key={link.id}
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-sm text-muted-foreground"
                  >
                    <Link
                      href={link.url}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                    <div className="flex size-4 items-center justify-center border border-border rounded translate-x-0 transform opacity-0 transition-transform transition-colors transition-opacity duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
                      <ChevronRightIcon className="h-3 w-3" />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
            <div className="flex flex-col gap-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                Connect
              </p>
              <a
                href="mailto:hyderabad@gobitsnbytes.org"
                className="text-white hover:text-[var(--brand-pink)] transition-colors text-sm font-medium"
              >
                hyderabad@gobitsnbytes.org
              </a>
              <p className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--brand-pink)]" />
                Hyderabad, India
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-t border-white/5 text-center text-[10px] sm:text-xs py-4 sm:py-6 px-4 w-full text-white/40 tracking-wider">
        © {new Date().getFullYear()} Bits&Bytes Hyderabad. Forged by builders.
      </div>
    </footer>
  );
}

export default FlickeringFooter;
