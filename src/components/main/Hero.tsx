import HeroContent from '../sub/HeroContent'

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* ── Background image ── */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage: 'url(/backgrounds/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.12,
        }}
      />

      {/* ── Background mesh gradient ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Large ambient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] float-animation" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[100px] float-animation" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-900/15 rounded-full blur-[80px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)]" />
      </div>

      <HeroContent />
    </section>
  )
}

export default Hero
