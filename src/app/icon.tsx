import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fbbf24",
          color: "#0c0a09",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          borderRadius: 6,
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}
