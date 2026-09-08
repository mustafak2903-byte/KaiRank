"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function ScrollExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const lenis = reduceMotion
      ? null
      : new Lenis({
          autoRaf: true,
          anchors: true,
          lerp: 0.095,
          smoothWheel: true,
          syncTouch: false,
          touchMultiplier: 1,
          wheelMultiplier: 0.9,
          prevent: (node) => Boolean(node.closest("[data-lenis-prevent], [role='dialog']")),
        });

    const updateProgress = () => {
      frame = 0;
      const distance = root.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      root.style.setProperty("--page-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = !reduceMotion && "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.remove("is-pending");
                entry.target.classList.add("is-visible");
                observer?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -12%", threshold: 0.12 },
        )
      : null;

    revealTargets.forEach((target) => {
      const beginsInViewport = target.getBoundingClientRect().top < window.innerHeight * 0.96;
      if (observer && !beginsInViewport) {
        target.classList.add("is-pending");
        observer.observe(target);
      } else target.classList.add("is-visible");
    });

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      lenis?.destroy();
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="experience-progress" aria-hidden="true">
      <span />
    </div>
  );
}
