"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-border">
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

        {/* Donate */}
        <div className="hidden md:block">
          <Button intent="primary" rounded="full" size="lg" href="/donate">
            Donate
          </Button>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800" />
        </button>
      </Container>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <Container className="py-4 flex flex-col gap-4">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-1">
                {n.label}
              </Link>
            ))}
            <Button intent="primary" rounded="full" href="/donate">
              Donate
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}