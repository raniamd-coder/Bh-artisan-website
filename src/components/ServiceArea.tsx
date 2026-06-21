import FadeIn from "./FadeIn";

const zones = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux",
  "Nantes", "Strasbourg", "Saint-Priest", "Villeurbanne", "Et partout en France",
];

export default function ServiceArea() {
  return (
    <section id="service-area" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
            Déplacement
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Zone d&apos;intervention
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Bandar intervient <strong>partout en France</strong>, chez les particuliers
            comme les professionnels. Déplacement sur devis.
          </p>
        </FadeIn>

        {/* Zone badges */}
        <FadeIn delay={100} className="flex flex-wrap gap-3 justify-center mb-12">
          {zones.map((zone) => (
            <span
              key={zone}
              className="bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full border border-gray-200 shadow-sm"
            >
              {zone}
            </span>
          ))}
        </FadeIn>

        {/* Map */}
        <FadeIn delay={150} className="rounded-3xl overflow-hidden shadow-md border border-gray-200">
          <iframe
            title="Zone d'intervention — France"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5543205.480071236!2d-1.7395!3d46.2276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd54a02933785731%3A0x27c4394474e509bc!2sFrance!5e0!3m2!1sfr!2sfr!4v1700000000000"
            width="100%"
            height="420"
            className="border-0"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </FadeIn>
      </div>
    </section>
  );
}
