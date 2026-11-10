import type { NextConfig } from "next";
// Validate the same canonical origin consumed by every public SEO surface.
import "./lib/site";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://app.cal.com https://cal.com https://*.cal.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' https:",
  "connect-src 'self' https://cal.com https://*.cal.com",
  "frame-src https://cal.com https://*.cal.com",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  agentRules: false,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    const redirects = [
      { source: "/seo", destination: "/healthcare-seo", permanent: true },
    ];
    if (process.env.VERCEL_ENV !== "production") return redirects;
    return [
      ...redirects,
      { source: "/visual-system", destination: "/", permanent: true },
      { source: "/experiments", destination: "/", permanent: true },
      { source: "/experiments/:path*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/kairank-hero-v1-720.mp4",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/kairank-hero-v1-poster.jpg",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
