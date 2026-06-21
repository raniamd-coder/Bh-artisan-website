import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
        {/* Avatar */}
        <FadeIn>
          <div className="shrink-0 w-52 h-52 rounded-3xl bg-linear-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-2xl">
            <span className="text-6xl font-black text-white select-none">BH</span>
          </div>
        </FadeIn>

        {/* Text */}
        <FadeIn delay={150} className="flex-1">
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
            À propos
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
            Bandar Hamoud
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Artisan plâtrier-peintre avec plus de <strong>10 ans d&apos;expérience</strong>,
            Bandar Hamoud réalise des travaux de plâtrerie, peinture et rénovation
            pour les particuliers et les professionnels, partout en France.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Passionné par la qualité des finitions et le respect des délais,
            Bandar met son savoir-faire au service de vos projets avec
            sérieux et professionnalisme.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
