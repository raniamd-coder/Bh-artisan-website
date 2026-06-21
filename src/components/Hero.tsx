export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden hero-bg">
      {/* Animated blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Badge */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-12 bg-blue-400/60" />
          <span className="text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase">
            Artisan qualifié · Partout en France
          </span>
          <div className="h-px w-12 bg-blue-400/60" />
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
          Plâtrerie
          <span className="block text-blue-400">&amp; Peinture</span>
        </h1>

        <p className="mt-6 max-w-md text-gray-400 text-sm sm:text-base leading-relaxed">
          Finitions soignées, délais respectés — votre intérieur mérite le meilleur.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#booking"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-blue-500/30 transition-all text-sm"
          >
            Prendre rendez-vous
          </a>
          <a
            href="#gallery"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors underline underline-offset-4"
          >
            Voir nos réalisations
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
