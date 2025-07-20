"use client"

import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Single Testimonial Card - Now clickable */}
        <a
          href="#testimonials"
          aria-label="Read customer support automation success story"
          className="block relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
        >
          {/* Quote Icon */}
          <div className="absolute top-8 left-8 opacity-20">
            <Quote className="h-12 w-12 text-white" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Customer Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Customer success story"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Quote and Attribution */}
            <div className="flex-1 text-center lg:text-left">
              <blockquote className="mb-6">
                <p
                  className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  "Our response time went from{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                    4 hours to 30 seconds
                  </span>{" "}
                  with Replexify"
                </p>
              </blockquote>

              {/* Attribution */}
              <footer>
                <cite
                  className="not-italic text-white font-bold text-xl md:text-2xl block mb-2"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                  }}
                >
                  Phil Kwok 
                </cite>
                <p
                  className="text-white/80 text-base md:text-lg mb-2"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                  }}
                >
                  Head of Customer Success, TechFlow
                </p>
                <p
                  className="text-white/60 text-sm"
                  style={{
                    fontFamily:
                      'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  }}
                >
                  95% customer satisfaction with AI replies
                </p>
              </footer>
            </div>
          </div>

          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-orange-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </a>

        {/* Bottom Text */}
        <div className="text-center mt-12 md:mt-16">
          <p
            className="text-white/60 max-w-3xl mx-auto"
            style={{
              fontFamily:
                'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            Join thousands of businesses that have transformed their customer support with AI automation.
          </p>
        </div>
      </div>
    </section>
  )
}
