const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return Math.round((x - Math.floor(x)) * 1000) / 1000
}

const particles = Array.from({ length: 34 }, (_, i) => ({
  left: `${(pseudoRandom(i + 1) * 100).toFixed(1)}%`,
  top: `${(pseudoRandom(i + 101) * 100).toFixed(1)}%`,
  size: pseudoRandom(i + 201) > 0.8 ? 2 : 1,
  delay: `${(pseudoRandom(i + 301) * 6).toFixed(2)}s`,
  duration: `${(4 + pseudoRandom(i + 401) * 6).toFixed(2)}s`,
}))

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_70%)]" />
      <div className="ambient-fx absolute inset-0">
        <div className="absolute -left-40 top-1/4 size-[520px] animate-float-slow rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 size-[460px] animate-float-slower rounded-full bg-[#4c1d95]/25 blur-[120px]" />
        <div className="absolute left-1/2 top-2/3 size-[300px] -translate-x-1/2 animate-float-slow rounded-full bg-neon/5 blur-[100px]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute inset-0 animate-drift">
          {particles.map((p, i) => (
            <span
              key={i}
              className="absolute animate-twinkle rounded-full bg-neon"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.55))]" />
    </div>
  )
}
