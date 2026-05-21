"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logo from "@public/logo.svg";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/impact", label: "Impact" },
];

const AnimatedNavLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    const defaultTextColor = "text-white/60";
    const hoverTextColor = "text-white";
    const textSizeClass = "text-sm";

    return (
        <Link
            href={href}
            className={cn(
                "group relative inline-block overflow-hidden h-5 font-medium transition-colors",
                textSizeClass
            )}
        >
            <div className="flex flex-col transition-transform duration-500 ease-out transform group-hover:-translate-y-1/2">
                <span className={cn("flex items-center h-5", defaultTextColor)}>
                    {children}
                </span>
                <span className={cn("flex items-center h-5", hoverTextColor)}>
                    {children}
                </span>
            </div>
        </Link>
    );
};

export function MiniNavbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const signupButtonElement = (
        <div className="relative group w-full md:w-auto">
            <div
                className="absolute inset-0 -m-2 rounded-full
                     hidden md:block
                     bg-[var(--brand-pink)]
                     opacity-20 filter blur-lg pointer-events-none
                     transition-transform transition-colors transition-opacity duration-300 ease-out
                     group-hover:opacity-40 group-hover:blur-xl group-hover:-m-3"
            ></div>
            <Link
                href="/join"
                className="relative z-10 flex items-center justify-center gap-1.5 px-6 py-2.5 text-sm font-black text-white bg-gradient-to-r from-(--brand-pink) to-[#5D2F77] rounded-full hover:brightness-110 active:scale-95 transition-transform transition-colors transition-opacity duration-200 w-full md:w-auto border border-white/10 shadow-[0_0_15px_rgba(228,90,146,0.3)]"
            >
                Join Now
                <ArrowUpRight className="w-4 h-4" />
            </Link>
        </div>
    );

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full",
                "flex flex-col items-center justify-center",
                "px-4 md:px-8 py-3 md:py-4",
                "backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg",
                "transition-all duration-300 ease-in-out"
            )}
        >
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white overflow-hidden p-2 transition-transform group-hover:scale-105">
                        <Image
                            src={logo}
                            alt="Bits&Bytes logo"
                            width={24}
                            height={24}
                            className="object-contain invert"
                        />
                    </div>
                    <span className="hidden sm:flex items-center gap-1.5 text-xl font-display font-bold text-white tracking-tight">
                        Bits&Bytes
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/80 uppercase tracking-widest font-bold leading-none mt-0.5">
                            HYD
                        </span>
                    </span>
                </Link>

                {/* Desktop Nav Links - Centered */}
                <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
                    {NAV_LINKS.map((link) => (
                        <AnimatedNavLink key={link.href} href={link.href}>
                            {link.label}
                        </AnimatedNavLink>
                    ))}
                </nav>

                {/* Right side CTA & Mobile toggle */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center">
                        {signupButtonElement}
                    </div>

                    <button
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden flex flex-col items-center w-full overflow-hidden bg-black/90 backdrop-blur-3xl absolute top-full left-0 border-b border-white/10"
                    >
                        <nav className="flex flex-col items-center space-y-2 w-full px-4 py-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-lg font-bold transition-colors w-full text-center py-3 rounded-xl",
                                        pathname === link.href ? "text-white bg-(--brand-pink)/20" : "text-white/70 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="w-full mt-4 pt-4 border-t border-white/10">
                                {signupButtonElement}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
