"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "~/components/ui/Button";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", onEsc);
      return () => { document.body.style.overflow = original; window.removeEventListener("keydown", onEsc); };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-[50.8px] border-b border-border/60">
      <div className="mx-auto w-full max-w-[1891px] px-4 md:px-6 lg:pl-[205px] lg:pr-8">
        <div className="flex items-center justify-between h-16 md:h-[87px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Go to homepage">
            <Image src="/logo.svg" width={36} height={36} alt="TSD logo" className="rounded-full" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-[85px] text-[16px] lg:text-[17px]">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-gray-700 hover:text-accent hover:font-semibold transition-colors inline-flex items-center gap-2"
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
            <Button
              intent="primary"
              rounded="full"
              size="lg"
              href="/donate"
              className="min-w-[149px] h-[57px] rounded-[21px] px-6 lg:px-8 bg-[#128341] hover:brightness-95"
            >
              Donate
            </Button>
          </div>

          {/* Burger */}
          <button
            className="md:hidden p-2 -mr-1"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="block w-7 h-0.5 bg-gray-800 mb-1" />
            <span className="block w-7 h-0.5 bg-gray-800 mb-1" />
            <span className="block w-7 h-0.5 bg-gray-800" />
          </button>
        </div>
      </div>

      {/* Mobile overlay + panel */}
      <div className={`md:hidden fixed inset-0 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} aria-hidden />
        <div id="mobile-nav" role="dialog" aria-modal="true" className={`absolute left-0 right-0 top-16 bottom-0 bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-4"}`}>
          <div className="px-6 pt-6 pb-24 overflow-y-auto h-full flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="py-4 text-[17px] text-gray-800 border-b border-border/60 flex items-center justify-between">
                <span>{n.label}</span>
                {n.chevron && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            ))}
            <div className="mt-auto pt-4">
              <Button intent="primary" rounded="full" size="lg" href="/donate" className="w-full h-[57px] rounded-[21px] bg-[#128341]">
                Donate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}