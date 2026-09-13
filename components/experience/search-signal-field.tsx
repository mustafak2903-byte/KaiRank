"use client";

import { useEffect, useRef } from "react";

type SignalMode = "idle" | "focus" | "scanning" | "resolved" | "context" | "error";

type DiagnosticContextEvent = CustomEvent<{
  website?: string;
  scanning?: boolean;
}>;

type DiagnosticStateEvent = CustomEvent<{
  gapReady?: boolean;
}>;

const lineCount = 9;

export function SearchSignalField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    const targetLabel = targetLabelRef.current;
    const section = field?.closest<HTMLElement>(".v6-diagnostic");
    const context = canvas?.getContext("2d");
    if (!field || !canvas || !section || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let mode: SignalMode = "idle";
    let hasResolved = false;
    let visible = false;
    let frame = 0;
    let lastFrame = 0;
    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    const setMode = (nextMode: SignalMode) => {
      mode = nextMode;
      field.dataset.signalMode = nextMode;
      if (targetLabel) {
        targetLabel.textContent = nextMode === "context"
          ? "Search context connected"
          : nextMode === "resolved"
            ? "Public signal resolved"
            : nextMode === "scanning"
              ? "Reading visibility terrain"
              : "Public signal surface";
      }
      if (reducedMotion.matches) draw(performance.now());
    };

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(performance.now());
    };

    const routePoint = (progress: number, line: number, time: number) => {
      const startY = height * (0.14 + (line / (lineCount - 1)) * 0.72);
      const convergence = Math.pow(progress, 1.55);
      const targetY = height * (0.51 + pointerY * 0.032);
      const amplitude = height * (0.012 + (line % 3) * 0.004) * (1 - progress * 0.72);
      const wave = Math.sin(progress * 8.2 + line * 1.14 + time * 0.00022) * amplitude;
      return {
        x: width * (0.015 + progress * 0.89) + pointerX * width * 0.012 * progress,
        y: startY * (1 - convergence) + targetY * convergence + wave,
      };
    };

    const drawNode = (x: number, y: number, radius: number, colour: string, glow = 0) => {
      if (glow > 0) {
        const halo = context.createRadialGradient(x, y, 0, x, y, glow);
        halo.addColorStop(0, colour);
        halo.addColorStop(1, "rgba(116, 136, 255, 0)");
        context.fillStyle = halo;
        context.beginPath();
        context.arc(x, y, glow, 0, Math.PI * 2);
        context.fill();
      }
      context.fillStyle = colour;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const drawTerrain = (time: number, energy: number) => {
      const ridges = 8;
      const steps = 72;
      context.save();
      context.globalCompositeOperation = "screen";

      for (let ridge = 0; ridge < ridges; ridge += 1) {
        const depth = ridge / (ridges - 1);
        const baseline = height * (0.27 + depth * 0.077);
        const amplitude = height * (0.012 + depth * 0.01);
        context.beginPath();

        for (let step = 0; step <= steps; step += 1) {
          const progress = step / steps;
          const focus = Math.exp(-Math.pow((progress - 0.79) / 0.16, 2));
          const drift = reducedMotion.matches ? 0 : time * (0.000045 + ridge * 0.000002);
          const wave = Math.sin(progress * 9.2 + ridge * 0.82 + drift) * amplitude;
          const detail = Math.sin(progress * 27 + ridge * 1.7 - drift * 1.4) * amplitude * 0.24;
          const resolvedLift = (mode === "resolved" || mode === "context" ? -height * 0.018 : 0) * focus * energy;
          const x = width * (0.04 + progress * 0.9) + pointerX * width * 0.006 * depth;
          const y = baseline + wave + detail + resolvedLift + pointerY * height * 0.004 * depth;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = ridge === 4
          ? `rgba(143, 205, 181, ${0.1 * energy})`
          : `rgba(116, 136, 255, ${(0.045 + depth * 0.035) * energy})`;
        context.lineWidth = ridge === 4 ? 0.95 : 0.65;
        context.stroke();

        if (ridge % 2 === 0) {
          for (let step = 9; step < steps; step += 9) {
            const progress = step / steps;
            const focus = Math.exp(-Math.pow((progress - 0.79) / 0.16, 2));
            const drift = reducedMotion.matches ? 0 : time * (0.000045 + ridge * 0.000002);
            const wave = Math.sin(progress * 9.2 + ridge * 0.82 + drift) * amplitude;
            const detail = Math.sin(progress * 27 + ridge * 1.7 - drift * 1.4) * amplitude * 0.24;
            const resolvedLift = (mode === "resolved" || mode === "context" ? -height * 0.018 : 0) * focus * energy;
            drawNode(
              width * (0.04 + progress * 0.9) + pointerX * width * 0.006 * depth,
              baseline + wave + detail + resolvedLift + pointerY * height * 0.004 * depth,
              0.8 + depth * 0.45,
              `rgba(200, 208, 255, ${0.1 + depth * 0.05})`,
            );
          }
        }
      }

      context.restore();
    };

    const draw = (time: number) => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);

      pointerX += (targetPointerX - pointerX) * 0.045;
      pointerY += (targetPointerY - pointerY) * 0.045;

      const modeEnergy = mode === "scanning" ? 1 : mode === "resolved" || mode === "context" ? 0.74 : mode === "focus" ? 0.55 : mode === "error" ? 0.28 : 0.38;
      const targetX = width * (0.82 + pointerX * 0.012);
      const targetY = height * (0.51 + pointerY * 0.032);

      const atmosphere = context.createRadialGradient(targetX, targetY, 0, targetX, targetY, width * 0.42);
      atmosphere.addColorStop(0, `rgba(116, 136, 255, ${0.055 * modeEnergy})`);
      atmosphere.addColorStop(0.36, `rgba(71, 91, 182, ${0.035 * modeEnergy})`);
      atmosphere.addColorStop(1, "rgba(5, 7, 11, 0)");
      context.fillStyle = atmosphere;
      context.fillRect(0, 0, width, height);

      drawTerrain(time, modeEnergy);

      for (let line = 0; line < lineCount; line += 1) {
        context.beginPath();
        for (let step = 0; step <= 54; step += 1) {
          const progress = step / 54;
          const point = routePoint(progress, line, time);
          if (step === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.strokeStyle = line === 4
          ? `rgba(200, 208, 255, ${0.18 * modeEnergy})`
          : `rgba(116, 136, 255, ${0.075 * modeEnergy})`;
        context.lineWidth = line === 4 ? 1 : 0.7;
        context.stroke();

        const start = routePoint(0.025, line, time);
        drawNode(start.x, start.y, line === 4 ? 1.8 : 1.1, line === 4 ? "rgba(143, 205, 181, 0.75)" : "rgba(200, 208, 255, 0.34)");

        if (!reducedMotion.matches && mode !== "error") {
          const travel = ((time * (mode === "scanning" ? 0.00013 : 0.000055) + line * 0.113) % 1);
          const signal = routePoint(travel, line, time);
          drawNode(signal.x, signal.y, line === 4 ? 1.9 : 1.25, line === 4 ? "rgba(143, 205, 181, 0.9)" : "rgba(200, 208, 255, 0.66)", line === 4 ? 18 : 10);
        }
      }

      context.save();
      context.translate(targetX, targetY);
      const pulse = reducedMotion.matches ? 0 : Math.sin(time * 0.0018) * 4;
      const ringAlpha = 0.11 + modeEnergy * 0.12;
      [34 + pulse, 66 + pulse * 0.6, 105 + pulse * 0.35].forEach((radius, index) => {
        context.strokeStyle = index === 0
          ? `rgba(143, 205, 181, ${ringAlpha + 0.08})`
          : `rgba(200, 208, 255, ${ringAlpha / (index + 1)})`;
        context.lineWidth = index === 0 ? 1.1 : 0.65;
        context.setLineDash(index === 1 ? [3, 7] : []);
        context.beginPath();
        context.arc(0, 0, radius, -0.82 * Math.PI, 0.78 * Math.PI);
        context.stroke();
      });
      context.setLineDash([]);
      context.strokeStyle = `rgba(200, 208, 255, ${0.2 * modeEnergy})`;
      context.lineWidth = 0.7;
      context.beginPath();
      context.moveTo(-126, 0);
      context.lineTo(126, 0);
      context.moveTo(0, -126);
      context.lineTo(0, 126);
      context.stroke();
      drawNode(0, 0, mode === "resolved" || mode === "context" ? 3 : 2, mode === "error" ? "rgba(225, 126, 126, 0.7)" : "rgba(143, 205, 181, 0.9)", 24 * modeEnergy);
      context.restore();
    };

    const animate = (time: number) => {
      if (!visible || document.hidden) {
        frame = 0;
        return;
      }
      if (time - lastFrame >= 32) {
        draw(time);
        lastFrame = time;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frame && visible && !document.hidden && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const bounds = section.getBoundingClientRect();
      targetPointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      targetPointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    };

    const onPointerLeave = () => {
      targetPointerX = 0;
      targetPointerY = 0;
    };

    const onContext = (event: Event) => {
      const detail = (event as DiagnosticContextEvent).detail;
      if (detail?.scanning) {
        hasResolved = false;
        setMode("scanning");
      }
      else if (hasResolved) setMode("resolved");
      else if (detail?.website) setMode("focus");
      else setMode("idle");
    };

    const onComplete = () => {
      hasResolved = true;
      setMode("resolved");
    };
    const onDiagnosticState = (event: Event) => {
      const detail = (event as DiagnosticStateEvent).detail;
      hasResolved = true;
      setMode(detail?.gapReady ? "context" : "resolved");
    };
    const onError = () => {
      hasResolved = false;
      setMode("error");
    };
    const onVisibility = () => document.hidden ? stop() : start();
    const onMotionPreference = () => {
      stop();
      draw(performance.now());
      start();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    }, { rootMargin: "320px 0px", threshold: 0.01 });
    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(section);
    intersectionObserver.observe(section);
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("kairank:diagnostic-context", onContext);
    window.addEventListener("kairank:diagnostic-complete", onComplete);
    window.addEventListener("kairank:diagnostic-state", onDiagnosticState);
    window.addEventListener("kairank:diagnostic-error", onError);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionPreference);
    resize();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("kairank:diagnostic-context", onContext);
      window.removeEventListener("kairank:diagnostic-complete", onComplete);
      window.removeEventListener("kairank:diagnostic-state", onDiagnosticState);
      window.removeEventListener("kairank:diagnostic-error", onError);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionPreference);
    };
  }, []);

  return (
    <div className="search-signal-field" data-signal-mode="idle" ref={fieldRef} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="search-signal-field__legend">
        <span>Technical</span><i /><span>Local</span><i /><span>Authority</span>
      </div>
      <div className="search-signal-field__target"><i /><span ref={targetLabelRef}>Public signal surface</span></div>
    </div>
  );
}
