"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function ScrollExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(
      "[data-scroll-scene], .marketing-main > section, .marketing-main > article > header, .marketing-main > article > section, .marketing-main > article > div",
    ));
    const interactiveSurfaces = Array.from(document.querySelectorAll<HTMLElement>(
      "[data-interactive-surface], .marketing-work li, .service-map__list a, .case-index article, .insights-index article, .marketing-faq details, .case-evidence article, .service-related__links > a",
    ));
    const lenis = reduceMotion
      ? null
      : new Lenis({
          autoRaf: true,
          anchors: true,
          lerp: 0.082,
          smoothWheel: true,
          syncTouch: false,
          touchMultiplier: 1,
          wheelMultiplier: 0.86,
          prevent: (node) => Boolean(node.closest("[data-lenis-prevent], [role='dialog']")),
        });

    const updateProgress = () => {
      frame = 0;
      const distance = root.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      root.style.setProperty("--page-progress", progress.toFixed(4));

      if (!reduceMotion) {
        const viewport = window.innerHeight;
        scenes.forEach((scene) => {
          const bounds = scene.getBoundingClientRect();
          const localProgress = Math.min(1, Math.max(0, (viewport - bounds.top) / (viewport + bounds.height)));
          const shift = (localProgress - 0.5) * 34;
          scene.style.setProperty("--scene-progress", localProgress.toFixed(4));
          scene.style.setProperty("--scene-shift", `${shift.toFixed(2)}px`);
          scene.style.setProperty("--scene-shift-reverse", `${(-shift).toFixed(2)}px`);
          scene.style.setProperty("--scene-shift-soft", `${(shift * 0.38).toFixed(2)}px`);
        });
      }
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

    const surfaceCleanups = interactiveSurfaces.map((surface) => {
      const move = (event: PointerEvent) => {
        const bounds = surface.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 100;
        const y = ((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 100;
        surface.style.setProperty("--pointer-x", `${Math.min(100, Math.max(0, x)).toFixed(2)}%`);
        surface.style.setProperty("--pointer-y", `${Math.min(100, Math.max(0, y)).toFixed(2)}%`);
      };
      const leave = () => {
        surface.style.setProperty("--pointer-x", "50%");
        surface.style.setProperty("--pointer-y", "50%");
      };
      surface.addEventListener("pointermove", move, { passive: true });
      surface.addEventListener("pointerleave", leave, { passive: true });
      return () => {
        surface.removeEventListener("pointermove", move);
        surface.removeEventListener("pointerleave", leave);
      };
    });

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      lenis?.destroy();
      observer?.disconnect();
      surfaceCleanups.forEach((cleanup) => cleanup());
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
