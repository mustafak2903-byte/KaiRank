"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "error" | "success";

export function FormSpecimen() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const url = String(form.get("url") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    if (!url || !email) {
      setState("error");
      setMessage("Add both a website address and an email to continue.");
      return;
    }

    if (!/^https?:\/\//i.test(url) && !url.includes(".")) {
      setState("error");
      setMessage("Use a website address such as yourclinic.com.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMessage("Check the email address and try again.");
      return;
    }

    setState("success");
    setMessage("Ready for analysis. This preview does not send your details.");
  }

  return (
    <form className="form-specimen" onSubmit={handleSubmit} noValidate>
      <div className="form-specimen__heading">
        <div>
          <span className="data-label">Conversion interface / specimen</span>
          <h3>Find the gaps in your visibility.</h3>
        </div>
        <span className="form-specimen__status" aria-hidden="true">Input / Analysis</span>
      </div>

      <label className="field">
        <span className="field__label">Website address</span>
        <span className="field__control">
          <span className="field__prefix" aria-hidden="true">URL</span>
          <input name="url" type="text" inputMode="url" placeholder="yourclinic.com" />
        </span>
      </label>

      <label className="field">
        <span className="field__label">Email</span>
        <span className="field__control">
          <span className="field__prefix" aria-hidden="true">@</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" />
        </span>
      </label>

      <div className="form-specimen__action">
        <button className="button button--primary" type="submit">
          <span>Analyse my visibility</span><span className="button__arrow" aria-hidden="true">↗</span>
        </button>
        <p>One useful response. No automated sequence.</p>
      </div>

      <div
        className={`form-message form-message--${state}`}
        aria-live="polite"
        role={state === "error" ? "alert" : "status"}
      >
        {message}
      </div>
    </form>
  );
}
