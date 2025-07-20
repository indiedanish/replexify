import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 md:py-12 text-center">
      <p
        className="text-white/50 text-sm font-mono flex items-center justify-center gap-1.5"
        style={{
          fontFamily:
            'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
        }}
      >
        Built by founders who hated repetitive support tickets and knew there had to be a better way.
      </p>
    </footer>
  )
}
