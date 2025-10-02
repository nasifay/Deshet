"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "~/components/ui/Button";
import Container from "~/components/ui/Container";

const nav = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who we are" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contacts", label: "Contacts" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-border">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <span className="inline-block w-7 h-7 rounded-full bg-primary" />
          TSD
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button intent="primary" rounded="full" href="/donate">
            Donate
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800" />
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <Container className="py-3 flex flex-col gap-3">
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