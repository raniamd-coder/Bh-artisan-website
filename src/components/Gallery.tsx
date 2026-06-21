"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { useRef } from "react";

const items = [
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(3).jpeg", label: "Finitions intérieures" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.33.38.jpeg", label: "Plafond design LED" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12.jpeg", label: "Grand chantier" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(1).jpeg", label: "Pose de cloisons" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(2).jpeg", label: "Travaux intérieurs" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(4).jpeg", label: "Rénovation" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(5).jpeg", label: "Plâtrerie" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(6).jpeg", label: "Chantier" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(7).jpeg", label: "Pose de plaques" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.12%20(8).jpeg", label: "Finitions" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.13.jpeg", label: "Réalisation" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.30.13%20(1).jpeg", label: "Travaux" },
  { src: "/gallery/WhatsApp%20Image%202026-06-15%20at%2017.33.38%20(1).jpeg", label: "Plafond" },
];

const SCROLL_STEP = 396; // card + gap

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? SCROLL_STEP : -SCROLL_STEP,
      behavior: "smooth",
    });
  };

  return (
    <section id="gallery" className="py-24 bg-gray-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeIn className="text-center">
          <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Nos Réalisations
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm">
            Faites glisser pour découvrir nos chantiers.
          </p>
        </FadeIn>
      </div>

      {/* Carousel wrapper — arrows positioned over it */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          aria-label="Précédent"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 group"
        >
          <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Suivant"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 group"
        >
          <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-16 sm:px-24 pb-4 scrollbar-hide"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="gallery-card snap-start relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="380px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-sm font-semibold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
