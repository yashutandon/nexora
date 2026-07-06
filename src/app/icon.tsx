import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation for Favicon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
          {/* Solid color representations of the Helix for the tiny favicon */}
          <path
            d="M 15 30 C 50 30, 50 85, 85 85 L 85 65 C 50 65, 50 10, 15 10 Z"
            fill="#ef4444"
          />
          <path
            d="M 85 30 C 50 30, 50 85, 15 85 L 15 65 C 50 65, 50 10, 85 10 Z"
            fill="#f97316"
            opacity="0.9"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
