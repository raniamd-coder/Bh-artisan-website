const links = [
  { href: "#about", label: "À propos" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Réalisations" },
  { href: "#booking", label: "Rendez-vous" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand */}
        <div>
          <p className="text-white font-bold tracking-tight bh-logo italic text-2xl">ℬℋ</p>
          <p className="mt-1 text-xs font-semibold tracking-widest uppercase text-gray-500">Artisan</p>
          <p className="mt-2 text-sm leading-relaxed max-w-xs">
            Artisan plâtrier-peintre à Saint-Priest.<br />
            Finitions soignées, délais respectés.
          </p>
          <a
            href="tel:+33758105944"
            className="mt-4 inline-block text-sm font-semibold text-white hover:text-blue-400 transition-colors"
          >
            07 58 10 59 44
          </a>
        </div>

        {/* Nav */}
        <div>
          <p className="text-white text-sm font-semibold mb-4">Navigation</p>
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Bandar Hamoud — Plâtrerie &amp; Peinture</p>
          <p>Saint-Priest · Lyon · Rhône</p>
          <p className="text-gray-700 hover:text-gray-500 transition-colors">
            Design &amp; développement{" "}
            <span className="bh-logo italic text-sm text-gray-600">ℛℳ</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
