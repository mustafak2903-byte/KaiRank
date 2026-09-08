"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { KaiRobot } from "@/components/experience/kai-assistant";
import { kaiVoiceAssets } from "@/lib/kai-voice";

type Point = { x: number; y: number };

export function ExperimentKai() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLButtonElement>(null);
  const positionRef = useRef<Point>({ x: 0, y: 0 });
  const inertiaRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startY: 0, originX: 0, originY: 0, lastX: 0, lastY: 0, lastTime: 0, vx: 0, vy: 0 });
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const [waving, setWaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [surprised, setSurprised] = useState(false);

  function setPosition(point: Point) {
    positionRef.current = point;
    mascotRef.current?.style.setProperty("--exp-kai-x", `${point.x}px`);
    mascotRef.current?.style.setProperty("--exp-kai-y", `${point.y}px`);
  }

  function bounds() {
    const node = mascotRef.current;
    const width = node?.offsetWidth ?? 70;
    const height = node?.offsetHeight ?? 82;
    const baseX = window.innerWidth - 22 - width;
    const baseY = window.innerHeight - 20 - height;
    return {
      minX: 8 - baseX,
      maxX: window.innerWidth - 8 - width - baseX,
      minY: 68 - baseY,
      maxY: window.innerHeight - 8 - height - baseY,
    };
  }

  function clampPoint(point: Point) {
    const limit = bounds();
    return {
      x: Math.min(limit.maxX, Math.max(limit.minX, point.x)),
      y: Math.min(limit.maxY, Math.max(limit.minY, point.y)),
    };
  }

  function stopInertia() {
    if (inertiaRef.current !== null) window.cancelAnimationFrame(inertiaRef.current);
    inertiaRef.current = null;
  }

  function pointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (window.matchMedia("(pointer: coarse), (max-width: 767px)").matches) return;
    stopInertia();
    const now = performance.now();
    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      originX: positionRef.current.x,
      originY: positionRef.current.y,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: now,
      vx: 0,
      vy: 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function pointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    updateDrag(event.clientX, event.clientY);
  }

  function updateDrag(clientX: number, clientY: number) {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = clientX - drag.startX;
    const dy = clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 4) drag.moved = true;
    const now = performance.now();
    const elapsed = Math.max(4, now - drag.lastTime);
    drag.vx = ((clientX - drag.lastX) / elapsed) * 16.67;
    drag.vy = ((clientY - drag.lastY) / elapsed) * 16.67;
    drag.lastX = clientX;
    drag.lastY = clientY;
    drag.lastTime = now;
    setPosition(clampPoint({ x: drag.originX + dx, y: drag.originY + dy }));
  }

  function pointerUp() {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    setDragging(false);
    if (!drag.moved) return;

    suppressClickRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.hypot(drag.vx, drag.vy) < 1.2) return;

    setSurprised(true);
    let velocityX = drag.vx;
    let velocityY = drag.vy;
    const tick = () => {
      const limit = bounds();
      const next = { x: positionRef.current.x + velocityX, y: positionRef.current.y + velocityY };
      if (next.x <= limit.minX || next.x >= limit.maxX) velocityX *= -0.5;
      if (next.y <= limit.minY || next.y >= limit.maxY) velocityY *= -0.5;
      velocityX *= 0.95;
      velocityY *= 0.95;
      setPosition(clampPoint(next));
      if (Math.hypot(velocityX, velocityY) > 0.18) inertiaRef.current = window.requestAnimationFrame(tick);
      else {
        inertiaRef.current = null;
        setSurprised(false);
      }
    };
    inertiaRef.current = window.requestAnimationFrame(tick);
  }

  function toggle() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setIntro(false);
    setOpen((value) => !value);
  }

  useEffect(() => {
    const seen = window.sessionStorage.getItem("kairank-kai-experiment-intro") === "seen";
    const timer = seen ? null : window.setTimeout(() => {
      setIntro(true);
      setWaving(true);
      window.sessionStorage.setItem("kairank-kai-experiment-intro", "seen");
      window.setTimeout(() => setWaving(false), 1050);
    }, 1700);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setIntro(false);
        mascotRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      stopInertia();
    };
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => updateDrag(event.clientX, event.clientY);
    const onPointerUp = () => pointerUp();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let frame = 0;

    const updateDock = () => {
      frame = 0;
      if (!window.matchMedia("(max-width: 767px)").matches || open || intro) {
        wrapper.classList.remove("is-docked");
        return;
      }
      const safeZone = { left: window.innerWidth - 96, right: window.innerWidth, top: window.innerHeight - 116, bottom: window.innerHeight };
      const collision = Array.from(document.querySelectorAll<HTMLElement>("[data-kai-avoid]")).some((node) => {
        const box = node.getBoundingClientRect();
        return box.right > safeZone.left && box.left < safeZone.right && box.bottom > safeZone.top && box.top < safeZone.bottom;
      });
      wrapper.classList.toggle("is-docked", collision);
    };
    const queueDock = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDock);
    };

    updateDock();
    window.addEventListener("scroll", queueDock, { passive: true });
    window.addEventListener("resize", queueDock, { passive: true });
    return () => {
      window.removeEventListener("scroll", queueDock);
      window.removeEventListener("resize", queueDock);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [intro, open]);

  return (
    <div className="exp-kai" data-voice-ready={Boolean(kaiVoiceAssets.kai_intro)} ref={wrapperRef}>
      {intro || open ? (
        <aside className="exp-kai__intro" id="kai-experiment-intro" aria-label="Introduction from Kai">
          <button className="exp-kai__close" type="button" onClick={() => { setIntro(false); setOpen(false); }} aria-label="Close Kai introduction">×</button>
          <strong>Hi — I’m Kai.</strong>
          <p>I find search problems<br />for a living.</p>
          <span>Want me to check yours?</span>
          <div>
            <Link href="/#audit">Check my clinic</Link>
            <Link href="/#proof">Show me proof</Link>
          </div>
        </aside>
      ) : null}
      <button
        aria-controls="kai-experiment-intro"
        aria-expanded={intro || open}
        aria-label="Open Kai. Drag Kai around the screen on desktop."
        className={`exp-kai__mascot${dragging ? " is-dragging" : ""}`}
        onClick={toggle}
        onPointerCancel={pointerUp}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        ref={mascotRef}
        type="button"
      >
        <KaiRobot surprised={surprised} waving={waving} />
        <span>KAI</span>
      </button>
    </div>
  );
}
