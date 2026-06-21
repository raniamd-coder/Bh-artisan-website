import Image from "next/image";
import FadeIn from "./FadeIn";

const services = [
  {
    num: "01",
    title: "Plâtrerie",
    description:
      "Pose de plaques de plâtre, cloisons, doublages, enduits de finition. Travaux soignés pour des murs et plafonds parfaitement lisses.",
    photo: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12.jpeg",
    alt: "Chantier plâtrerie",
  },
  {
    num: "02",
    title: "Peinture",
    description:
      "Peinture intérieure et extérieure, lasure, vernis. Préparation des surfaces, choix des couleurs, application professionnelle.",
    photo: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(1).jpeg",
    alt: "Travaux de peinture",
  },
  {
    num: "03",
    title: "Rénovation",
    description:
      "Rénovation complète de pièces ou d'appartements : démolition, remise à neuf, coordination des travaux du début à la fin.",
    photo: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.33.38.jpeg",
    alt: "Rénovation plafond LED",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-20">
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
            Ce que nous faisons
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Nos Services
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-28">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={80}>
              <div
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Photo */}
                <div className="w-full md:w-1/2 aspect-4/3 rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={s.photo}
                    alt={s.alt}
                    width={700}
                    height={525}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
                    {s.num}
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base">
                    {s.description}
                  </p>
                  <a
                    href="#booking"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Demander un devis
                    <span>→</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
