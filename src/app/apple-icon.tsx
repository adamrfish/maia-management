import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1d1d1b",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            letterSpacing: "0.05em",
            color: "#f3eee7",
            lineHeight: 1,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
