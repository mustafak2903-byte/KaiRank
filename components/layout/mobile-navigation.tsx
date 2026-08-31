"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("has-menu-open", open);

    if (!open) return () => document.body.classList.remove("has-menu-open");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("has-menu-open");
    };
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button
        className="mobile-navigation__trigger"
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
        aria-hidden={!open}
      >
        <div className="mobile-navigation__meta data-label">KaiRank / Search pathways</div>
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
          <Link className="mobile-navigation__audit" href="#audit" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <span className="data-label">06</span>
            <span>Run my visibility audit</span>
            <span aria-hidden="true">↘</span>
          </Link>
        </nav>
        <div className="mobile-navigation__footer">
          <span className="data-label">Google / Maps / AI search</span>
          <p>Be visible where patients decide.</p>
        </div>
      </div>
    </div>
  );
}
