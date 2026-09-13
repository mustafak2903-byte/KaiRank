"use client";

import { useEffect, useRef } from "react";

export function ConversionSignal() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const section = field?.closest<HTMLElement>(".v3-conversion");
    if (!field || !section) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reduceMotion.matches) return;
      const bounds = section.getBoundingClientRect();
      field.style.setProperty("--field-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      field.style.setProperty("--field-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    };

    const onPointerLeave = () => {
      field.style.setProperty("--field-x", "50%");
      field.style.setProperty("--field-y", "52%");
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      field.classList.add("is-active");
      observer.disconnect();
    }, { threshold: 0.28 });

    observer.observe(section);
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="v3-conversion__signal v9-conversion-field" aria-hidden="true" ref={fieldRef}>
      <span />
      <i /><i /><i /><i />
      <b />
    </div>
  );
}
