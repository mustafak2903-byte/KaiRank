"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { siteConfig } from "@/lib/site";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle("has-menu-open", open);

    if (!open) return () => document.body.classList.remove("has-menu-open");

    const focusFrame = window.requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a, button")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("has-menu-open");
    };
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button
        className="mobile-navigation__trigger"
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span className={`mobile-navigation__glyph${open ? " is-open" : ""}`} aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <div
        className={`mobile-navigation__panel${open ? " is-open" : ""}`}
        id="mobile-navigation-panel"
        ref={panelRef}
        aria-hidden={!open}
      >
        <div className="mobile-navigation__meta data-label">KaiRank / Visibility system</div>
        <nav aria-label="Mobile navigation">
          {siteConfig.navigation.map((item, index) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span className="data-label">0{index + 1}</span>
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link className="mobile-navigation__audit" data-event="primary_cta_clicked" data-event-label="Mobile navigation: check my clinic" data-event-source="mobile-navigation" href="/#audit" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <span className="data-label">05</span>
            <span>Check my clinic</span>
            <span aria-hidden="true">↘</span>
          </Link>
          <BookingTrigger className="mobile-navigation__booking" label="Talk through my search strategy" source="mobile-navigation" tabIndex={open ? 0 : -1} />
        </nav>
        <div className="mobile-navigation__footer">
          <span className="data-label">Google / Maps / AI search</span>
          <p>Search visibility for private clinics.</p>
        </div>
      </div>
    </div>
  );
}
