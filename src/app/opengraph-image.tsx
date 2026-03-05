import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MAIA Management — Miami Apartments & Property Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1d1d1b",
          color: "#f3eee7",
        }}
      >
        <div
          style={{
            fontSize: 120,
            letterSpacing: "0.2em",
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          MAIA
        </div>
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: 8,
            opacity: 0.8,
          }}
        >
          Management
        </div>
        <div
          style={{
            fontSize: 22,
            marginTop: 48,
            opacity: 0.5,
            letterSpacing: "0.05em",
          }}
        >
          Miami Apartments & Property Management
        </div>
      </div>
    ),
    { ...size }
  );
}
