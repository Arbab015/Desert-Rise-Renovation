/**
 * Animated Dubai skyline drawn on a <canvas>: night sky, Burj Khalifa, three parallax building
 * layers with flickering windows, drifting clouds and traffic. Used as the hero fallback when no video is present.
 */
export const NIGHT = {
  top: '#03060d',
  mid: '#12204a',
  base: '#c98a3d',
  glow: '#e3bb52',
  stars: true,
}

const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`
}

export function createSkyline(canvas, palette = NIGHT) {
  const ctx = canvas.getContext('2d')
  let w = 0,
    h = 0,
    t = 0,
    layers = []

  function build() {
    let seed = 11
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
    layers = [
      [0.1, 0.22],
      [0.14, 0.34],
      [0.2, 0.5],
    ].map(([min, max], l) => {
      const items = []
      let x = 0
      while (x < w * 1.4 + 200) {
        const bw = (22 + rnd() * 40) * (1 + l * 0.35)
        items.push({ x, w: bw, h: h * (min + rnd() * (max - min)) })
        x += bw + rnd() * 8
      }
      items.total = x
      return items
    })
  }

  function resize() {
    const parent = canvas.parentElement
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    w = parent.clientWidth
    h = parent.clientHeight
    if (!w || !h) return
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    build()
    frame(0)
  }

  function layer(i, speed, color, alpha, horizon, windows) {
    const items = layers[i]
    ctx.fillStyle = color
    ctx.globalAlpha = alpha
    items.forEach((b, j) => {
      const x = ((((b.x - t * speed * 60) % items.total) + items.total) % items.total) - b.w
      ctx.fillRect(x, horizon - b.h, b.w, b.h)
      if (windows) {
        for (let y = horizon - b.h + 8; y < horizon - 6; y += 11) {
          for (let k = 4; k < b.w - 5; k += 9) {
            if ((y * 7 + k * 3 + j) % 5 < 2) {
              ctx.fillStyle = rgba(
                palette.glow,
                0.15 + (Math.sin(t * 0.5 + j * 3 + y * 0.3 + k) * 0.5 + 0.5) * 0.55,
              )
              ctx.fillRect(x + k, y, 3, 4)
            }
          }
        }
        ctx.fillStyle = color
      }
    })
    ctx.globalAlpha = 1
  }

  function burj(horizon) {
    const x = w * 0.72,
      s = h / 640
    const tiers = [
      [26, 110],
      [21, 215],
      [16, 310],
      [11, 390],
      [7, 450],
      [4, 500],
    ]
    const pts = []
    tiers.forEach((q, i) => {
      pts.push([q[0], q[1]])
      if (tiers[i + 1]) pts.push([tiers[i + 1][0], q[1]])
    })
    pts.push([1.2, 500], [0.4, 610])
    ctx.fillStyle = palette.top
    ctx.beginPath()
    ctx.moveTo(x - 26 * s, horizon)
    pts.forEach((p) => ctx.lineTo(x - p[0] * s, horizon - p[1] * s))
    for (let i = pts.length - 1; i >= 0; i--) ctx.lineTo(x + pts[i][0] * s, horizon - pts[i][1] * s)
    ctx.lineTo(x + 26 * s, horizon)
    ctx.fill()
    ctx.fillStyle = rgba(palette.glow, 0.12)
    ctx.fillRect(x - 1.5 * s, horizon - 500 * s, 3 * s, 500 * s)
    const pulse = 0.5 + 0.5 * Math.sin(t * 2)
    const g = ctx.createRadialGradient(x, horizon - 610 * s, 0, x, horizon - 610 * s, 26)
    g.addColorStop(0, rgba(palette.glow, 0.9 * pulse))
    g.addColorStop(1, rgba(palette.glow, 0))
    ctx.fillStyle = g
    ctx.fillRect(x - 30, horizon - 640 * s, 60, 60)
  }

  function frame(dt = 0.016) {
    if (!w) return
    t += dt
    const horizon = h * 0.86
    const sky = ctx.createLinearGradient(0, 0, 0, h)
    sky.addColorStop(0, palette.top)
    sky.addColorStop(0.55, palette.mid)
    sky.addColorStop(1, palette.base)
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, w, h)
    if (palette.stars) {
      for (let i = 0; i < 70; i++) {
        ctx.fillStyle = `rgba(255,255,255,${(0.3 + 0.5 * Math.abs(Math.sin(t * 0.8 + i))) * 0.7})`
        ctx.fillRect((i * 173) % w, (i * 97) % (h * 0.5), 1.4, 1.4)
      }
    }
    const glow = ctx.createRadialGradient(w * 0.72, horizon, 0, w * 0.72, horizon, h * 0.75)
    glow.addColorStop(0, rgba(palette.glow, 0.55))
    glow.addColorStop(1, rgba(palette.glow, 0))
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 4; i++) {
      const cx = (((i * w) / 3 + t * (8 + i * 3)) % (w + 400)) - 200,
        cy = h * (0.12 + i * 0.1)
      ctx.fillStyle = rgba(palette.glow, 0.07)
      ctx.beginPath()
      ctx.ellipse(cx, cy, 160, 22, 0, 0, 7)
      ctx.ellipse(cx + 90, cy + 8, 120, 18, 0, 0, 7)
      ctx.fill()
    }
    layer(0, 0.04, palette.mid, 0.8, horizon, false)
    burj(horizon)
    layer(1, 0.09, palette.top, 0.92, horizon, false)
    layer(2, 0.18, '#050505', 1, horizon, true)
    const ground = ctx.createLinearGradient(0, horizon, 0, h)
    ground.addColorStop(0, '#050505')
    ground.addColorStop(1, palette.top)
    ctx.fillStyle = ground
    ctx.fillRect(0, horizon, w, h - horizon)
    for (let i = 0; i < 16; i++) {
      const dir = i % 2 ? 1 : -1,
        lane = i % 3,
        y = horizon + (h - horizon) * (0.3 + lane * 0.2)
      const x =
        (((((i * w) / 16 + t * dir * (40 + lane * 25)) % (w + 60)) + w + 60) % (w + 60)) - 30
      const c = dir > 0 ? '255,255,255' : '255,70,50'
      ctx.fillStyle = `rgba(${c},.18)`
      ctx.fillRect(x - 8, y - 2, 16, 5)
      ctx.fillStyle = `rgba(${c},.95)`
      ctx.fillRect(x - 4, y - 1, 8, 2.5)
    }
  }
  return { resize, frame }
}
