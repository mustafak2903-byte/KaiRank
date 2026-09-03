"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

export function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

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
        preload="metadata"
        tabIndex={-1}
      >
        <source src={siteConfig.heroVideoUrl} type="video/mp4" />
      </video>
      <div className="v7-hero-film__colour" />
      <div className="v7-hero-film__shade" />
      <div className="v7-hero-film__grain" />
    </div>
  );
}
