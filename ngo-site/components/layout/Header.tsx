"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "~/components/ui/Button";
import Container from "~/components/ui/Container";

const nav = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who we are", chevron: true },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contacts", label: "Contact us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
      <Container className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" width={40} height={40} alt="TSD logo" className="rounded-full" />
        </Link>

        {/* Nav (desktop) */}
        <nav className="hidden md:flex items-center gap-10 text-[17px]">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-gray-700 hover:text-accent hover:font-semibold transition-colors inline-flex items-center gap-2`}
            >
              {n.label}
              {n.chevron && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        {/* Donate (desktop) */}
        <div className="hidden md:block">
          <Button intent="primary" rounded="full" size="lg" href="/donate">
            Donate
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800" />
        </button>
      </Container>

      {/* Mobile overlay + panel */}
      <div className={`md:hidden fixed inset-0 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Dim background */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        {/* Slide-down panel */}
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          className={`absolute left-0 right-0 top-20 bottom-0 bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-4"}`}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <div className="px-6 pt-6 pb-24 overflow-y-auto h-full flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg text-gray-800 border-b border-border/60 flex items-center justify-between"
              >
                <span>{n.label}</span>
                {n.chevron && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            ))}

            <div className="mt-auto pt-4">
              <Button intent="primary" rounded="full" size="lg" href="/donate" className="w-full">
                Donate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}