import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#080a0f",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <svg width="124" height="124" viewBox="0 0 64 64">
        <path d="M8 12h48v40H8z" fill="none" stroke="#93a4ff" strokeWidth="2" />
        <path d="M14 44h11V20h15v15h10" fill="none" stroke="#f3efe6" strokeWidth="5" />
        <circle cx="50" cy="35" r="5" fill="#8fcdb5" />
      </svg>
    </div>,
    size,
  );
}
