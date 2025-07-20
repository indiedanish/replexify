import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "AI Version Control - Undo AI mistakes instantly — save progress and restore with one click."
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// This route generates the Open Graph image
export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/og.jpg-NkiwpAQfj6Pha1ranA4yjJXERgJtw3.jpeg"
        alt="AI Version Control"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>,
    {
      ...size,
    },
  )
}
