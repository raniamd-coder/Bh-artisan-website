"use client";
import { useEffect, useRef, useState } from "react";

const delayMap: Record<number, string> = {
  0: "",
  80: "delay-75",
  100: "delay-100",
  120: "delay-100",
  150: "delay-150",
  200: "delay-200",
  240: "delay-200",
};

export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delayMap[delay] ?? "";

  return (
    <div
      ref={ref}
      className={`fade-in-base ${
        visible ? "fade-in-visible" : ""
      } ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
