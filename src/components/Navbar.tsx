"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#hero", label: "Accueil" },
  { href: "#about", label: "À propos" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Réalisations" },
  { href: "#booking", label: "Rendez-vous" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2">
          {/* BH cursive monogram */}
          <span
            className={`bh-logo text-2xl select-none transition-colors ${
              scrolled ? "text-blue-600" : "text-white"
            }`}
          >
            <span className="relative">
              &#x212C;
              <span className="text-xl">&#x210B;</span>
            </span>
          </span>
          <span className={`text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${
            scrolled ? "text-gray-600" : "text-white/70"
          }`}>
            Artisan
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium hover:text-blue-600 transition-colors ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Phone CTA */}
        <a
          href="tel:+33758105944"
          className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-all ${
            scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-300"
          }`}
        >
          <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            scrolled ? "bg-blue-600 text-white" : "bg-white/15 border border-white/30 text-white"
          }`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </span>
          <span>07 58 10 59 44</span>
        </a>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded focus:outline-none ${scrolled ? "text-gray-700" : "text-white"}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-gray-700 font-medium py-1 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
