"use client";

import { useEffect } from "react";

type ExperimentRuntimeProps = {
  scope: string;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ExperimentRuntime({ scope }: ExperimentRuntimeProps) {
  useEffect(() => {
    const root = document.getElementById(scope);
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointerFrame = 0;
    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.45;

    const updateScroll = () => {
      frame = 0;
      const heroDistance = Math.max(window.innerHeight * 0.9, 1);
      const heroProgress = clamp(window.scrollY / heroDistance);
      const journey = root.querySelector<HTMLElement>("[data-exp-journey]");
      const journeyTop = journey?.offsetTop ?? window.innerHeight;
      const journeyRange = Math.max((journey?.offsetHeight ?? window.innerHeight * 1.4) - window.innerHeight, window.innerHeight * 0.7);
      const journeyProgress = clamp((window.scrollY - journeyTop + window.innerHeight * 0.12) / journeyRange);

      root.style.setProperty("--hero-progress", heroProgress.toFixed(4));
      root.style.setProperty("--journey-progress", journeyProgress.toFixed(4));
      root.style.setProperty("--journey-enter", clamp(journeyProgress / 0.32).toFixed(4));
      root.style.setProperty("--journey-resolve", clamp((journeyProgress - 0.36) / 0.42).toFixed(4));
      root.style.setProperty("--journey-end", clamp((journeyProgress - 0.72) / 0.28).toFixed(4));
    };

    const queueScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };

    const paintPointer = () => {
      pointerFrame = 0;
      const bounds = root.getBoundingClientRect();
      const localY = pointerY - bounds.top;
      root.style.setProperty("--pointer-x", `${pointerX.toFixed(1)}px`);
      root.style.setProperty("--pointer-y", `${localY.toFixed(1)}px`);
      root.style.setProperty("--pointer-nx", ((pointerX / window.innerWidth - 0.5) * 2).toFixed(4));
      root.style.setProperty("--pointer-ny", ((pointerY / window.innerHeight - 0.5) * 2).toFixed(4));
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(paintPointer);
    };

    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>("[data-exp-reveal]"));
    const observer = !reduceMotion.matches && "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.remove("is-pending");
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -10%", threshold: 0.12 },
        )
      : null;

    revealTargets.forEach((target) => {
      const beginsInViewport = target.getBoundingClientRect().top < window.innerHeight * 0.96;
      if (observer && !beginsInViewport) {
        target.classList.add("is-pending");
        observer.observe(target);
      } else target.classList.add("is-visible");
    });

    root.classList.add("is-ready");
    updateScroll();
    paintPointer();
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", queueScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", queueScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, [scope]);

  return (
    <div className="exp-progress" aria-hidden="true">
      <span />
    </div>
  );
}
