"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";

export function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sourceReady, setSourceReady] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    }).connection;
    const constrainedConnection = connection?.saveData
      || connection?.effectiveType === "slow-2g"
      || connection?.effectiveType === "2g";
    if (reduceMotion.matches || constrainedConnection) return;
    const timer = window.setTimeout(() => setSourceReady(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sourceReady) return;
    video.load();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = (visible = true) => {
      if (reduceMotion.matches || !visible || document.hidden) video.pause();
      else void video.play().catch(() => undefined);
    };
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => syncPlayback(entry.isIntersecting), { threshold: 0.02 })
      : null;
    const onVisibility = () => syncPlayback(true);
    const onMotionPreference = () => syncPlayback(true);

    observer?.observe(video);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotionPreference);
    syncPlayback(true);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotionPreference);
    };
  }, [sourceReady]);

  return (
    <div className="v7-hero-film" aria-hidden="true">
      <video
        ref={videoRef}
        className="v7-hero-film__video"
        autoPlay
        disablePictureInPicture
        loop
        muted
        playsInline
        poster={siteConfig.heroPosterUrl}
        preload="none"
        tabIndex={-1}
      >
        {sourceReady ? <source src={siteConfig.heroVideoUrl} type="video/mp4" /> : null}
      </video>
      <div className="v7-hero-film__colour" />
      <div className="v7-hero-film__shade" />
      <div className="v7-hero-film__grain" />
    </div>
  );
}
