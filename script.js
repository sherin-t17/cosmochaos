/* ============================================================
   COSMOCHAOS – FULL UPGRADE
   Features: music toggle, birth year facts, theme switcher,
   Gen-Z messages, flashier animations, glassmorphism card,
   name badge, particle burst, ripple effects
   ============================================================ */

// ─── DOM REFS ────────────────────────────────────────────────
const page1    = document.getElementById("page1")
const page2    = document.getElementById("page2")
const page3    = document.getElementById("page3")
const startBtn = document.getElementById("startBtn")
const calcBtn  = document.getElementById("calcBtn")
const dob      = document.getElementById("dob")
const userName = document.getElementById("userName")
const warning  = document.getElementById("warning")
const ageYears = document.getElementById("ageYears")
const ageDays  = document.getElementById("ageDays")
const message  = document.getElementById("message")
const warp     = document.getElementById("warp")
const toast    = document.getElementById("toast")
const userBadge     = document.getElementById("userBadge")
const factsBox      = document.getElementById("factsBox")
const factsList     = document.getElementById("factsList")
const birthYearLabel = document.getElementById("birthYearLabel")

// ─── GREETINGS ───────────────────────────────────────────────
const greetings = [
  "Welcome, cosmic traveler ✨",
  "The universe noticed you 🌌",
  "Reality check incoming... 🚨",
  "Your timeline is being calculated 🔭",
  "Stars aligned for your arrival 💫",
  "Cosmic data retrieval in progress 🛸",
  "Loading your existence... please wait 🌀",
  "No cap, the cosmos has been waiting 🌠",
  "Slay. Your cosmic scan is ready 🔥",
  "It's giving main character energy 🚀"
]
document.getElementById("greeting").innerText = pick(greetings)

// ─── DATE LIMIT ──────────────────────────────────────────────
dob.max = new Date().toISOString().split("T")[0]
dob.addEventListener("change", () => {
  calcBtn.classList.remove("hidden")
  warning.innerText = ""
})

// ─── RIPPLE EFFECT ───────────────────────────────────────────
document.querySelectorAll(".ripple").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const r = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    r.className = "ripple-effect"
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`
    this.appendChild(r)
    setTimeout(() => r.remove(), 600)
  })
})

// ─── SOUND ENGINE ────────────────────────────────────────────
const AudioCtx = window.AudioContext || window.webkitAudioContext
let audioCtx = null
function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioCtx()
  return audioCtx
}

function playClick() {
  try {
    const ctx = getAudioCtx()
    const osc = ctx.createOscillator(), g = ctx.createGain()
    osc.connect(g); g.connect(ctx.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08)
    g.gain.setValueAtTime(0.15, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    osc.start(); osc.stop(ctx.currentTime + 0.1)
  } catch(e) {}
}

function playWarp() {
  try {
    const ctx = getAudioCtx(), t = ctx.currentTime
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator(), g = ctx.createGain()
      osc.connect(g); g.connect(ctx.destination)
      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(150 + i * 120, t + i * 0.1)
      osc.frequency.exponentialRampToValueAtTime(2500 + i * 500, t + 0.7 + i * 0.1)
      g.gain.setValueAtTime(0.06, t + i * 0.1)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.8 + i * 0.1)
      osc.start(t + i * 0.1); osc.stop(t + 1 + i * 0.1)
    }
  } catch(e) {}
}

function playReveal() {
  try {
    const ctx = getAudioCtx()
    const notes = [523, 659, 784, 1047, 1319]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator(), g = ctx.createGain()
      osc.connect(g); g.connect(ctx.destination)
      osc.type = "sine"; osc.frequency.value = freq
      g.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.09)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.09 + 0.35)
      osc.start(ctx.currentTime + i * 0.09)
      osc.stop(ctx.currentTime + i * 0.09 + 0.4)
    })
  } catch(e) {}
}

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", playClick, { passive: true })
})

// ─── BACKGROUND MUSIC ────────────────────────────────────────
let musicPlaying = false
let musicNodes = null
const musicBtn = document.getElementById("musicBtn")

function buildMusic() {
  if (musicNodes) return
  try {
    const ctx = getAudioCtx()
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0, ctx.currentTime)
    masterGain.connect(ctx.destination)

    // Bass drone
    const bass = ctx.createOscillator()
    const bassGain = ctx.createGain()
    bass.type = "sine"; bass.frequency.value = 55
    bassGain.gain.value = 0.18
    bass.connect(bassGain); bassGain.connect(masterGain)
    bass.start()

    // Sub wobble
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.2; lfoGain.gain.value = 8
    lfo.connect(lfoGain); lfoGain.connect(bass.frequency)
    lfo.start()

    // Pad layer
    const padFreqs = [110, 165, 220, 275]
    padFreqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = "triangle"; osc.frequency.value = f
      g.gain.value = 0.04
      osc.connect(g); g.connect(masterGain)
      osc.start()
    })

    // Arp melody
    const arpNotes = [220, 277, 330, 415, 330, 277]
    let arpIdx = 0
    function playArp() {
      if (!musicPlaying) return
      try {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = "sine"
        osc.frequency.value = arpNotes[arpIdx % arpNotes.length]
        g.gain.setValueAtTime(0.07, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
        osc.connect(g); g.connect(masterGain)
        osc.start(); osc.stop(ctx.currentTime + 0.65)
        arpIdx++
      } catch(e) {}
      setTimeout(playArp, 700 + Math.random() * 300)
    }
    setTimeout(playArp, 800)

    musicNodes = { masterGain, ctx }
  } catch(e) {}
}

function fadeMusic(toValue, duration = 1.5) {
  if (!musicNodes) return
  const { masterGain, ctx } = musicNodes
  masterGain.gain.cancelScheduledValues(ctx.currentTime)
  masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime)
  masterGain.gain.linearRampToValueAtTime(toValue, ctx.currentTime + duration)
}

musicBtn.addEventListener("click", () => {
  if (!musicPlaying) {
    buildMusic()
    fadeMusic(1, 2)
    musicPlaying = true
    musicBtn.innerText = "🎵"
    showToast("🎵 Cosmic music on!")
  } else {
    fadeMusic(0, 1.5)
    musicPlaying = false
    musicBtn.innerText = "🔇"
    showToast("🔇 Music off")
  }
})

// ─── THEME SWITCHER ──────────────────────────────────────────
const themeBtn   = document.getElementById("themeBtn")
const themePanel = document.getElementById("themePanel")
let themePanelOpen = false

themeBtn.addEventListener("click", (e) => {
  e.stopPropagation()
  themePanelOpen = !themePanelOpen
  themePanel.classList.toggle("hidden", !themePanelOpen)
})
document.addEventListener("click", () => {
  themePanelOpen = false
  themePanel.classList.add("hidden")
})
themePanel.addEventListener("click", e => e.stopPropagation())

const themeNames = {
  default: "🟣 Default",
  solar:   "🔴 Solar Flare",
  nebula:  "🟢 Nebula Green",
  pink:    "🩷 Galaxy Pink",
  ocean:   "🔵 Deep Ocean"
}

let currentTheme = "default"
document.querySelectorAll(".theme-option").forEach(opt => {
  opt.addEventListener("click", () => {
    const t = opt.dataset.theme
    document.body.setAttribute("data-theme", t)
    currentTheme = t
    document.querySelectorAll(".theme-option").forEach(o => o.classList.remove("active"))
    opt.classList.add("active")
    themePanelOpen = false
    themePanel.classList.add("hidden")
    showToast("Theme: " + themeNames[t])
  })
})

// Helper: get current CSS variable value
function getCSSVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim()
}

// ─── WARP ANIMATION ──────────────────────────────────────────
const warpCanvas = document.getElementById("warpCanvas")
const wCtx = warpCanvas.getContext("2d")
let warpAnimId = null
let warpProgress = 0

function resizeWarpCanvas() {
  warpCanvas.width = window.innerWidth
  warpCanvas.height = window.innerHeight
}
resizeWarpCanvas()

function drawWarpFrame(progress) {
  const w = warpCanvas.width, h = warpCanvas.height
  const cx = w / 2, cy = h / 2
  wCtx.clearRect(0, 0, w, h)
  wCtx.fillStyle = `rgba(2,4,15,${Math.min(progress * 1.8, 0.97)})`
  wCtx.fillRect(0, 0, w, h)

  const numLines = 150
  for (let i = 0; i < numLines; i++) {
    const angle = (i / numLines) * Math.PI * 2
    const len = 80 + progress * 900
    const startR = 15 + progress * 50
    const alpha = Math.min(progress * 2.5, 0.9)
    const hue = 200 + (i / numLines) * 160 + progress * 60

    wCtx.beginPath()
    wCtx.moveTo(cx + Math.cos(angle) * startR, cy + Math.sin(angle) * startR)
    wCtx.lineTo(cx + Math.cos(angle) * (startR + len), cy + Math.sin(angle) * (startR + len))
    wCtx.strokeStyle = `hsla(${hue},100%,75%,${alpha})`
    wCtx.lineWidth = 1 + progress * 2
    wCtx.stroke()
  }
  if (progress > 0.65) {
    const fAlpha = (progress - 0.65) / 0.35
    const grad = wCtx.createRadialGradient(cx, cy, 0, cx, cy, 250)
    grad.addColorStop(0, `rgba(210,245,255,${fAlpha * 0.95})`)
    grad.addColorStop(1, "transparent")
    wCtx.fillStyle = grad
    wCtx.fillRect(0, 0, w, h)
  }
}

function warpJump(next) {
  playWarp()
  warp.classList.add("active")
  warpProgress = 0
  if (warpAnimId) cancelAnimationFrame(warpAnimId)
  function animateWarp() {
    warpProgress += 0.025
    drawWarpFrame(Math.min(warpProgress, 1))
    if (warpProgress < 0.88) {
      warpAnimId = requestAnimationFrame(animateWarp)
    } else {
      document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"))
      next.classList.remove("hidden")
      setTimeout(() => {
        warp.classList.remove("active")
        warpProgress = 0
        wCtx.clearRect(0, 0, warpCanvas.width, warpCanvas.height)
      }, 320)
    }
  }
  animateWarp()
}

// ─── PARTICLE BURST ──────────────────────────────────────────
const burstCanvas = document.getElementById("burstCanvas")
const bCtx = burstCanvas.getContext("2d")
burstCanvas.width = window.innerWidth
burstCanvas.height = window.innerHeight
let particles = []

function spawnBurst(x, y) {
  for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 2 + Math.random() * 6
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.02 + Math.random() * 0.03,
      size: 2 + Math.random() * 4,
      hue: 180 + Math.random() * 120
    })
  }
}

function drawBurst() {
  bCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height)
  particles = particles.filter(p => p.life > 0)
  particles.forEach(p => {
    bCtx.beginPath()
    bCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
    bCtx.fillStyle = `hsla(${p.hue},100%,70%,${p.life})`
    bCtx.fill()
    p.x += p.vx; p.y += p.vy
    p.vy += 0.1
    p.life -= p.decay
    p.size *= 0.97
  })
  requestAnimationFrame(drawBurst)
}
drawBurst()

// ─── PAGE FLOW ───────────────────────────────────────────────
startBtn.onclick = () => warpJump(page2)

calcBtn.onclick = () => {
  if (!dob.value) { warning.innerText = "⚠️ Enter your birth date, traveler"; return }
  const birth = new Date(dob.value)
  const today = new Date()
  if (birth > today) { warning.innerText = "⚠️ Future dates aren't in the database yet"; return }
  const years = calculateAge(birth)
  const days  = Math.floor((today - birth) / 86400000)
  const name  = userName.value.trim()

  // Set badge
  const displayName = name ? name.toUpperCase() : "COSMIC TRAVELER"
  userBadge.innerText = `🌌 ${displayName}'S GALAXY BRIEF`

  warpJump(page3)

  setTimeout(() => {
    playReveal()
    // Burst at center of screen
    spawnBurst(window.innerWidth / 2, window.innerHeight / 2 - 80)

    animateNumber(ageYears, years, " YEARS")
    animateNumber(ageDays,  days,  " DAYS")
    message.innerText = generateChaosMessage(years, birth)

    // Birth year facts
    const birthYear = birth.getFullYear()
    birthYearLabel.innerText = birthYear
    const facts = getBirthYearFacts(birthYear)
    factsList.innerHTML = ""
    facts.forEach(f => {
      const d = document.createElement("div")
      d.className = "fact-item"
      d.innerText = f
      factsList.appendChild(d)
    })
    factsBox.classList.remove("hidden")
  }, 600)
}

document.getElementById("retryBtn").onclick = () => {
  factsBox.classList.add("hidden")
  warpJump(page1)
}

// ─── AGE CALC ────────────────────────────────────────────────
function calculateAge(birth) {
  const today = new Date()
  let y = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) y--
  return y
}

// ─── COUNT-UP ANIMATION ──────────────────────────────────────
function animateNumber(el, target, text) {
  const duration = 1400, start = performance.now()
  function step(now) {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.innerText = Math.floor(eased * target).toLocaleString() + text
    if (p < 1) requestAnimationFrame(step)
    else el.innerText = target.toLocaleString() + text
  }
  requestAnimationFrame(step)
}

// ─── 200+ MESSAGE DATABASE ───────────────────────────────────
const msgs = {
  milestones: {
    1:  "Year 1 complete. You survived gravity and humans. No cap, that's impressive.",
    5:  "Five years! The Earth did 5 full laps just for you. That's loyalty fr.",
    10: "A whole decade! You understood the assignment from day one.",
    13: "🚨 TEENAGER DETECTED. Chaos protocol activated. Parents sweating rn.",
    16: "Sweet 16. You now legally operate machinery. Society said bet.",
    18: "⚡ ADULT MODE ACTIVATED. No tutorial included. You're on your own bestie.",
    21: "Level 21. The universe ran out of tutorial levels. You're on freeplay.",
    25: "Halfway to 50. Quarter century unlocked. It's giving checkpoint energy.",
    30: "Level 30. Wisdom patch v3.0 installed. Back pain DLC drops soon ngl.",
    40: "The 40s hit different. You're not lost — you're on a scenic route bestie.",
    50: "HALF CENTURY SURVIVED. You're iconic. A legend. The real main character.",
    60: "60 trips around the sun. You've seen eras end and trends return 3 times.",
    70: "Seven decades. The universe respects the commitment fr fr.",
    75: "75 years. Veteran-level human. We stan a legend.",
    80: "80 years. Plot twist: you're still here. Absolutely ate and left no crumbs.",
    90: "90 years. At this point you're a historical landmark no cap.",
    100:"🎖️ CENTURY MODE UNLOCKED. You're a glitch in the simulation and we love it."
  },

  under13: [
    "You're in the tutorial zone bestie. Enjoy the lore.",
    "Mini human detected. Cosmic data still loading fr.",
    "You're so new the universe still has your receipt no cap.",
    "Age: early access. Full version dropping soon.",
    "The cosmos just handed you a starter pack. Slay.",
    "Still buffering. Main storyline loading...",
    "DLC not unlocked yet. Keep grinding.",
    "You have more future than past. That's lowkey terrifying and beautiful.",
    "Currently in: origin story arc. No spoilers.",
    "Your lore is being written rn. The universe is cooking.",
    "The multiverse is watching your beta run fr.",
    "Chaos level: adorable. Potential level: unlimited bestie.",
    "Your timeline is so fresh it smells like launch day.",
    "Main character origin sequence: activated. We're watching.",
    "Baby chaos unit. Fully operational. Understood the assignment."
  ],

  teen: [
    "🔥 Teenage chaos detected. Universe is bracing for impact no cap.",
    "Warning: teen identified. Emotional weather: absolutely unhinged.",
    "You're 13-17. Every feeling is a final boss. You got this bestie.",
    "The algorithm has been tracking you since you got a phone fr.",
    "Cosmic scan: maximum vibes, minimum sleep. It's giving survivor energy.",
    "Teen mode activated. Parents have been notified lmao.",
    "You are NOT a side character. You ARE the main character bestie.",
    "Running on caffeine, memes, and unresolved lore. Slay.",
    "The emo arc: optional but statistically inevitable fr.",
    "Teen years: where every song is literally about you personally.",
    "Certified chaotic teenager. The cosmos ate and left no crumbs.",
    "You exist in the golden age of chaos. Lowkey iconic.",
    "Social meter: maxed. Energy meter: zero. You're built different.",
    "The universe sees your potential. Your parents just want a clean room.",
    "Teenage chaos energy unlocked. No notes. Understood the assignment.",
    "You're in your character development arc rn. It's giving growth.",
    "The vibes? Immaculate. The sleep schedule? Criminal. Slay anyway.",
    "Real ones know: teen years built different hits different fr.",
    "You're cooking something. The universe can smell it. No cap.",
    "Bestie you're in your villain era and your glow-up era simultaneously."
  ],

  youngAdult: [
    "Adult mode unlocked. No cheat codes. No manual. Just vibes.",
    "18-24: the vibe is figuring it out at full send speed.",
    "The real world loaded. Lag detected. Buffering...",
    "Welcome to adulting. First bug report: everything costs money fr.",
    "Young enough to dream, old enough to be tired. It's giving duality.",
    "Running on 4 hours sleep, big dreams, and a concerning amount of coffee.",
    "Tutorial is OVER. Quick save activated. You're doing amazing bestie.",
    "Freedom unlocked. Rent unlocked. Existential dread unlocked. Slay.",
    "Gen-Z entering the arena. Everyone else: absolutely shaking.",
    "The universe believes in you. Your bank account has concerns ngl.",
    "You have Wi-Fi, ambition, and a unhinged sleep schedule. Let's go.",
    "Main character arc: early access edition. The lore is being written.",
    "One good idea away from changing everything. No cap.",
    "Still deciding what to do with your life? Same bestie. Keep going.",
    "You are the plot twist your younger self needed fr.",
    "Ate the tutorial, left no crumbs, now entering freeplay mode.",
    "Your potential is lowkey unmatched. The universe said bet.",
    "You're in your 'figure it out' era and you're absolutely cooking.",
    "The comeback arc starts now. You just don't know it yet bestie.",
    "Certified main character energy. Side quests optional. Chaos mandatory.",
    "You understood the assignment. The universe took notes.",
    "It's giving protagonist energy with a chaotic neutral alignment.",
    "Your era is loading. Estimated time: imminent. Stay ready bestie."
  ],

  midlife: [
    "25-39: you're not lost bestie, you're on a scenic route fr.",
    "Back pain update coming soon. Wisdom patch already installed. Slay.",
    "You're in your prime and the chaos is refined now. Elevated.",
    "Quarter-life crisis DLC installed. Sense of humor DLC also installed.",
    "You know what you want. Getting it is the side quest no cap.",
    "You're in your villain-glow-up-redemption arc. All three simultaneously.",
    "Old enough to know better. Young enough to do it anyway. Bestie behavior.",
    "You are not who you were. That's a compliment fr fr.",
    "30s hit different. Like a cosmic system update that actually slaps.",
    "Your energy is selective now. You only spend it on what slays.",
    "You've survived enough plot twists to write a memoir no cap.",
    "Running on experience, good coffee, and zero tolerance for nonsense.",
    "You've unlocked: self-awareness, good taste, and better boundaries. Iconic.",
    "The version of you from 10 years ago would be shook. In the best way.",
    "You are in the best chapter. Even if it's the hardest one bestie.",
    "Glow-up complete. Now entering the era of unbothered. Understood the assignment.",
    "You have earned your chaotic peace. The universe respects it fr.",
    "Mid-30s: you know the rules AND when to break them. Based.",
    "Cosmic log: subject is ascending. Silently. Powerfully. Slaying.",
    "Ate every challenge, left absolutely no crumbs. Bestie behavior.",
    "You're in your 'I don't explain myself anymore' era and it's giving power.",
    "The lore of your life? Absolutely unhinged. We love to see it.",
    "Real ones recognize: you understood the assignment years ago fr."
  ],

  fortyPlus: [
    "40+: you've earned the 'been there' badge and the 'survived it' trophy.",
    "Not old bestie. You're a vintage model with premium features. Slay.",
    "The 40s are the main event. Everything before was just the opening act fr.",
    "A decade of wisdom and zero patience for nonsense. Absolutely iconic.",
    "You've seen trends come and go three times. You ARE the trend no cap.",
    "Cosmic rank: elder chaos energy. Maximum respect.",
    "You're the main character of a long, complicated, beautiful story bestie.",
    "40+ means you've earned your opinions and you're keeping them fr.",
    "You remember dial-up internet. You are ancient and powerful. Based.",
    "You've survived: fashion disasters, multiple recessions, tech revolutions.",
    "Your story has so many plot twists it should be a limited series.",
    "Life tried several times. You're still here. That's the whole flex bestie.",
    "Cosmic status: legendary. You are a walking archive. Understood the assignment.",
    "You're operating at unlocked difficulty with expert-level stats. Slay.",
    "Gray hairs incoming. So is wisdom, confidence, and zero apologies fr.",
    "Level 40+: where you stop performing and start actually living bestie.",
    "You ate every era and left absolutely no crumbs. The universe noticed.",
    "Running the long game. Winning. No cap.",
    "You're in your unbothered era and it's giving main character energy.",
    "The chaos is elegant now. Refined. Like a fine cosmic vintage fr."
  ],

  senior: [
    "You're a historical figure. Still active. Still chaotic. We stan.",
    "50+: a legend operating in the physical realm. Absolutely iconic bestie.",
    "The universe put you through everything and you're STILL HERE. Based.",
    "You've outlasted trends, tech generations, and everyone's doubts fr.",
    "Cosmic archive status: active. Experience level: absolutely maxed.",
    "You've seen it all and kept going. That's the whole plot no cap.",
    "You ARE the wisdom others are desperately chasing bestie.",
    "Running the long game. Still winning. The universe takes notes.",
    "Senior chaos energy. There is no higher rank. Understood the assignment.",
    "60+: you're beyond levels. You ARE the game fr fr.",
    "You've outlived phones, trends, and everyone who doubted you. Slay.",
    "The cosmic leaderboard has your name near the top. Based and iconic.",
    "You are proof that persistence is the ultimate superpower bestie.",
    "You've watched the world change multiple times. You adapted. Ate.",
    "More than half a century of pure relentless human energy. No cap.",
    "You're not slowing down. You're just choosing your speed fr.",
    "Cosmic scan: subject is thriving. Against all odds. Absolutely ate.",
    "You are the definition of main character energy, long-run edition bestie."
  ],

  century: [
    "100+ YEARS. You're a glitch in the simulation and we absolutely love it.",
    "CENTURY UNLOCKED. The universe didn't expect this. Neither did you. Slay.",
    "You've been alive for multiple world events, 10+ world leaders, countless phone upgrades.",
    "At 100+, you're no longer just a human. You're a historical event bestie.",
    "The simulation cannot believe you're still running. Based behavior fr.",
    "100 years. The Earth has been loyal to you specifically. That's love.",
    "You've outlived the odds, the doctors, and the pessimists. Ate fr.",
    "Century mode: active. Maximum respect status: permanently achieved.",
    "At this point, you ARE the lore bestie. No cap.",
    "The cosmos bows to your persistence. Understood the assignment 100 years ago."
  ],

  rare: [
    "🌌 COSMIC RARITY DETECTED. One in a million scan result fr.",
    "Reality glitch confirmed. The universe is confused in the best way bestie.",
    "Hidden timeline discovered. How did you even find this??",
    "🎲 Universe RNG: CRITICAL HIT. Your timeline is absolutely blessed.",
    "Secret achievement unlocked: Cosmic Anomaly. Understood the assignment.",
    "The algorithm did not predict you. Based behavior fr.",
    "You exist outside the expected parameters. The universe is intrigued.",
    "Simulation devs are taking notes right now no cap.",
    "Your existence is statistically improbable. Proceed anyway bestie.",
    "ERROR 404: Normal outcome not found. You are built different."
  ],

  preMillennial: [
    "Born before 2000? You remember a world without smartphones. Lowkey powerful.",
    "Pre-2000 birth detected. Survived the analog-to-digital transition. Absolutely ate.",
    "You remember when the internet was new. Ancient and wise bestie.",
    "Born last century. Witnessed the full tech revolution. Two centuries one lifetime fr.",
    "You were born before Google existed. How did you find anything no cap?",
    "Last century edition. You're a walking time capsule. Based.",
    "Born before Wi-Fi. Survived anyway. Elite behavior fr.",
    "You remember Y2K. The universe respects your resilience bestie."
  ]
}

function generateChaosMessage(age, birth) {
  if (msgs.milestones[age]) return msgs.milestones[age]
  if (Math.random() < 0.01) return pick(msgs.rare)
  const preMillennial = birth && birth.getFullYear() < 2000
  let base = ""
  if      (age < 13)  base = pick(msgs.under13)
  else if (age < 18)  base = pick(msgs.teen)
  else if (age < 25)  base = pick(msgs.youngAdult)
  else if (age < 40)  base = pick(msgs.midlife)
  else if (age < 65)  base = pick(msgs.fortyPlus)
  else if (age < 100) base = pick(msgs.senior)
  else                base = pick(msgs.century)
  if (preMillennial && age >= 20 && Math.random() < 0.5) {
    base += " " + pick(msgs.preMillennial)
  }
  return base
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ─── BIRTH YEAR FACTS DATABASE ───────────────────────────────
const birthYearFacts = {
  1924: ["First Winter Olympics held in Chamonix, France.", "Lenin died, reshaping Soviet politics.", "IBM was founded this year."],
  1925: ["The Great Gatsby was published by F. Scott Fitzgerald.", "First television broadcast happened.", "Adolf Hitler published Mein Kampf."],
  1926: ["Television demonstrated publicly by John Logie Baird.", "Winnie-the-Pooh was published.", "Route 66 was established in the USA."],
  1927: ["Charles Lindbergh completed the first solo transatlantic flight.", "The Jazz Singer, first talkie film, was released.", "BBC was established."],
  1928: ["Mickey Mouse debuted in Steamboat Willie.", "Penicillin was discovered by Alexander Fleming.", "First colour television demonstrated."],
  1929: ["The Great Depression began with the Wall Street Crash.", "The Vatican became an independent state.", "Popeye made his first appearance."],
  1930: ["Pluto was discovered as the ninth planet.", "The first World Cup football tournament was held.", "Twinkies were invented."],
  1931: ["The Empire State Building opened in New York.", "The Star-Spangled Banner became the US national anthem.", "Dracula and Frankenstein films were released."],
  1932: ["Amelia Earhart became first woman to fly solo across the Atlantic.", "The Sydney Harbour Bridge opened.", "Zippo lighters were invented."],
  1933: ["Adolf Hitler became Chancellor of Germany.", "The first drive-in cinema opened in New Jersey.", "Prohibition ended in the USA."],
  1934: ["Bonnie and Clyde were killed in a police ambush.", "Flash Gordon comic strip was created.", "Donald Duck debuted in a Disney film."],
  1935: ["Monopoly board game was officially released.", "Penguin Books was founded.", "Nylon was invented by DuPont."],
  1936: ["The Berlin Olympics were held.", "The BBC began the world's first regular TV service.", "Gone with the Wind was published."],
  1937: ["The Hindenburg disaster shocked the world.", "Snow White and the Seven Dwarfs was the first Disney feature film.", "The Golden Gate Bridge opened."],
  1938: ["Superman debuted in Action Comics #1.", "Orson Welles' War of the Worlds radio broadcast caused panic.", "Teflon was accidentally invented."],
  1939: ["World War II began with Germany's invasion of Poland.", "The Wizard of Oz premiered in cinemas.", "Batman made his first comic appearance."],
  1940: ["Dunkirk evacuation saved 338,000 Allied troops.", "McDonald's opened its first restaurant.", "Tom and Jerry debuted."],
  1941: ["Pearl Harbor attack brought the USA into WWII.", "Captain America debuted in comics.", "The Cheerios cereal was introduced."],
  1942: ["The Manhattan Project began to develop nuclear weapons.", "Casablanca was filmed.", "Stalingrad became the bloodiest battle in history."],
  1943: ["The Pentagon was completed in Washington DC.", "Penicillin was first used to treat a patient.", "ENIAC, an early computer, was being developed."],
  1944: ["D-Day: Allied forces landed on Normandy beaches.", "The first kidney dialysis machine was used.", "Bretton Woods monetary system was established."],
  1945: ["WWII ended with Germany and Japan's surrender.", "The United Nations was founded.", "The atomic bombs were dropped on Hiroshima and Nagasaki."],
  1946: ["The first computer ENIAC was unveiled.", "Winston Churchill gave his 'Iron Curtain' speech.", "Baby boom began after WWII."],
  1947: ["India gained independence from Britain.", "The Cold War officially began.", "The transistor was invented at Bell Labs."],
  1948: ["The State of Israel was established.", "The first McDonald's restaurant opened in California.", "NASCAR was officially founded."],
  1949: ["NATO was established.", "The Soviet Union tested its first nuclear weapon.", "George Orwell published Nineteen Eighty-Four."],
  1950: ["The Korean War began.", "The first credit card (Diners Club) was introduced.", "Peanuts comic strip debuted."],
  1951: ["Color television was introduced in the USA.", "UNIVAC I, the first commercial computer, was delivered.", "The first nuclear reactor for electricity was tested."],
  1952: ["Elizabeth II became Queen of England.", "The hydrogen bomb was first tested.", "Tetracycline antibiotic was discovered."],
  1953: ["Edmund Hillary and Tenzing Norgay summited Mount Everest.", "DNA double helix structure was discovered.", "The Korean War ended."],
  1954: ["Roger Bannister ran the first sub-4-minute mile.", "The first nuclear submarine, USS Nautilus, was launched.", "Lord of the Rings Vol.1 was published."],
  1955: ["Disneyland opened in California.", "Rosa Parks refused to give up her bus seat.", "McDonald's was incorporated as a company."],
  1956: ["Elvis Presley released Heartbreak Hotel.", "The first transatlantic telephone cable was laid.", "Velcro was patented."],
  1957: ["Sputnik 1 became the first satellite in space.", "The Soviet Union launched Sputnik 2 with dog Laika.", "The European Economic Community was created."],
  1958: ["NASA was established by US Congress.", "The Hula Hoop craze swept America.", "LEGO bricks received their modern design patent."],
  1959: ["Barbie doll was introduced by Mattel.", "The first microchip was developed.", "Hawaii and Alaska became US states."],
  1960: ["The first oral contraceptive pill was approved.", "The first weather satellite was launched.", "Psycho was released by Alfred Hitchcock."],
  1961: ["Yuri Gagarin became the first human in space.", "The Berlin Wall was constructed.", "JFK launched the Peace Corps."],
  1962: ["The Cuban Missile Crisis brought the world to the brink of nuclear war.", "The first James Bond film Dr. No was released.", "Walmart was founded by Sam Walton."],
  1963: ["JFK was assassinated in Dallas.", "Martin Luther King Jr gave his 'I Have a Dream' speech.", "The Beatles released their first album."],
  1964: ["The Civil Rights Act was signed in the USA.", "The Ford Mustang was introduced.", "Cassius Clay (Muhammad Ali) became world heavyweight champion."],
  1965: ["The first US combat troops arrived in Vietnam.", "The mini skirt became a fashion phenomenon.", "The Beatles played Shea Stadium, pioneering stadium concerts."],
  1966: ["The first Star Trek episode aired.", "England won the FIFA World Cup.", "The Miranda Rights were established in the USA."],
  1967: ["The first Super Bowl was played.", "The first ATM machine was installed in London.", "The Beatles released Sgt. Pepper's Lonely Hearts Club Band."],
  1968: ["Martin Luther King Jr was assassinated.", "The first 911 emergency number was established.", "2001: A Space Odyssey was released."],
  1969: ["Neil Armstrong walked on the Moon.", "Woodstock music festival brought 400,000 together.", "The internet's predecessor ARPANET was created."],
  1970: ["The Beatles officially broke up.", "Earth Day was celebrated for the first time.", "Floppy disks were introduced."],
  1971: ["Intel released its first microprocessor, the 4004.", "Walt Disney World opened in Florida.", "Email was invented by Ray Tomlinson."],
  1972: ["Pong, the first commercial arcade game, was released.", "The Munich Olympics massacre shocked the world.", "Atari was founded."],
  1973: ["The Sears Tower, world's tallest building, was completed.", "Pink Floyd released Dark Side of the Moon.", "Roe v. Wade was decided by the US Supreme Court."],
  1974: ["Richard Nixon resigned as US President over Watergate.", "Rubik's Cube was invented in Hungary.", "ABBA won Eurovision with Waterloo."],
  1975: ["The Vietnam War ended.", "Microsoft was founded by Bill Gates and Paul Allen.", "Saturday Night Live premiered on NBC."],
  1976: ["Apple was founded by Steve Jobs and Steve Wozniak.", "The first commercial Concorde flights began.", "The Ramones released their debut album."],
  1977: ["Star Wars was released and changed cinema forever.", "The first iPhone of its era, Apple II, was introduced.", "Elvis Presley died."],
  1978: ["The first test tube baby, Louise Brown, was born.", "The first spam email was sent.", "Space Invaders arcade game was released."],
  1979: ["Sony introduced the Walkman.", "Margaret Thatcher became UK Prime Minister.", "The Iranian Revolution occurred."],
  1980: ["Mount St. Helens erupted in Washington state.", "John Lennon was murdered in New York.", "CNN launched as the first 24-hour news channel."],
  1981: ["MTV launched with 'Video Killed the Radio Star'.", "IBM introduced its first personal computer.", "The first Space Shuttle Columbia was launched."],
  1982: ["Michael Jackson released Thriller, the best-selling album ever.", "The first CD player was released.", "The internet TCP/IP protocol was established."],
  1983: ["The internet was born with the adoption of TCP/IP.", "Motorola introduced the first mobile phone.", "Return of the Jedi was released."],
  1984: ["Apple launched the Macintosh computer.", "The LA Olympics were held.", "Tetris was created by Alexey Pajitnov."],
  1985: ["Back to the Future was released.", "The first .com domain was registered.", "New Coke launched and was quickly pulled."],
  1986: ["The Chernobyl nuclear disaster occurred.", "Pixar was founded by Steve Jobs.", "The first version of Windows was released."],
  1987: ["The first disposable camera was introduced.", "Black Monday: the largest stock market crash in one day.", "REM released Document and went mainstream."],
  1988: ["The first worm virus spread across the internet.", "Die Hard was released.", "Pixar's Tin Toy won the first Oscar for animated short."],
  1989: ["The Berlin Wall fell.", "The World Wide Web was invented by Tim Berners-Lee.", "Nintendo's Game Boy was released."],
  1990: ["The Hubble Space Telescope was launched.", "The World Wide Web went public.", "Nelson Mandela was released after 27 years in prison."],
  1991: ["The Soviet Union collapsed.", "Nirvana released Nevermind.", "The Gulf War ended with Coalition victory."],
  1992: ["The first text message was sent.", "The Euro Disney opened near Paris.", "Bill Clinton was elected US President."],
  1993: ["The World Wide Web opened to the public.", "Jurassic Park was released.", "The Mosaic web browser launched."],
  1994: ["The first PlayStation was released in Japan.", "Amazon was founded by Jeff Bezos.", "Nelson Mandela became President of South Africa."],
  1995: ["Windows 95 was launched to massive hype.", "Toy Story became the first fully CGI feature film.", "eBay and Java programming language launched."],
  1996: ["Pokémon Red and Green launched in Japan.", "The Dolly the sheep clone was created.", "The Spice Girls released Wannabe."],
  1997: ["Harry Potter and the Philosopher's Stone was published.", "Titanic became the highest-grossing film.", "The first Google prototype launched at Stanford."],
  1998: ["Google was officially founded.", "iMac G3 launched in its colourful design.", "The first MP3 player was released."],
  1999: ["The Matrix was released.", "Napster launched and disrupted the music industry.", "The Euro currency was introduced."],
  2000: ["Y2K came and went without disaster.", "The Sims video game was released.", "The first crew arrived at the International Space Station."],
  2001: ["Wikipedia was launched.", "The iPod was released by Apple.", "9/11 attacks changed the world."],
  2002: ["The Euro currency entered circulation.", "Spider-Man was released.", "Friendster, the first modern social network, launched."],
  2003: ["MySpace launched.", "The Human Genome Project was completed.", "Finding Nemo became the highest-grossing animated film."],
  2004: ["Facebook launched at Harvard.", "Gmail was introduced by Google.", "The Indian Ocean tsunami killed 230,000 people."],
  2005: ["YouTube was founded.", "Hurricane Katrina devastated New Orleans.", "The first ever tweet was posted."],
  2006: ["Twitter launched.", "Nintendo Wii was released.", "Pluto was reclassified as a dwarf planet."],
  2007: ["The first iPhone was released by Apple.", "The Kindle e-reader launched.", "The Great Recession began."],
  2008: ["Barack Obama became the first Black US President.", "The global financial crisis hit.", "The Large Hadron Collider was activated."],
  2009: ["Bitcoin was created by Satoshi Nakamoto.", "WhatsApp was founded.", "Avatar became the highest-grossing film ever."],
  2010: ["Instagram was launched.", "The iPad was introduced by Apple.", "The Deepwater Horizon oil spill occurred."],
  2011: ["Snapchat was founded.", "Osama bin Laden was killed.", "Steve Jobs died."],
  2012: ["SpaceX became the first private company to dock with the ISS.", "Gangnam Style became the first YouTube video to hit 1 billion views.", "The Higgs Boson particle was discovered."],
  2013: ["Edward Snowden leaked NSA surveillance secrets.", "Netflix released House of Cards, pioneering binge culture.", "Selfie was Oxford Dictionary's word of the year."],
  2014: ["Ice Bucket Challenge went viral globally.", "Ebola outbreak declared a global health emergency.", "The Apple Watch was announced."],
  2015: ["The first image of Pluto's surface was captured.", "Same-sex marriage was legalised in the USA.", "Back to the Future Day (Oct 21) was celebrated."],
  2016: ["Pokémon GO became a global phenomenon.", "David Bowie and Prince both died.", "Brexit vote shocked the world."],
  2017: ["Bitcoin hit $10,000 for the first time.", "The #MeToo movement went global.", "Fidget spinners became the world's most random craze."],
  2018: ["Fortnite became the biggest game on the planet.", "The first image of a black hole was captured.", "Avengers: Infinity War broke box office records."],
  2019: ["The first photo of a black hole was revealed.", "Area 51 raid meme went viral.", "Avengers: Endgame became the highest-grossing film ever."],
  2020: ["COVID-19 pandemic changed the entire world.", "Zoom calls became everyone's daily reality.", "Among Us became the most played game on earth."],
  2021: ["COVID vaccines rolled out globally.", "NFTs became a trillion-dollar market.", "Squid Game took over the world on Netflix."],
  2022: ["ChatGPT launched and changed tech forever.", "Russia invaded Ukraine.", "The Queen Elizabeth II passed away."],
  2023: ["AI tools went completely mainstream.", "Barbie became the highest-grossing film of the year.", "X (formerly Twitter) went through chaotic changes."],
  2024: ["AI became part of everyday life.", "The Paris Olympics were held.", "SpaceX Starship successfully completed orbital flight."]
}

function getBirthYearFacts(year) {
  // Find closest year if exact not found
  if (birthYearFacts[year]) {
    const facts = birthYearFacts[year]
    return facts.sort(() => 0.5 - Math.random()).slice(0, 3)
  }
  // Fallback for very old dates
  const closest = Object.keys(birthYearFacts)
    .map(Number)
    .reduce((prev, curr) => Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev)
  return getBirthYearFacts(closest)
}

// ─── SHARE SYSTEM ────────────────────────────────────────────
document.getElementById("shareBtn").onclick = async () => {
  const text = `🚨 Reality check just dropped...\n\n🚀 My cosmic age: ${ageYears.innerText}\n📅 I've lived ${ageDays.innerText}\n\n🌌 The cosmos has something to say about YOUR age too. No cap.\n\nDiscover yours 👇\n${window.location.href}`
  if (navigator.share) {
    try { await navigator.share({ title: "COSMOCHAOS", text, url: window.location.href }) } catch(e) {}
  } else {
    window.open("https://wa.me/?text=" + encodeURIComponent(text))
  }
}

// ─── COPY LINK ───────────────────────────────────────────────
document.getElementById("copyBtn").onclick = () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => showToast("🔗 Link copied! Spread the chaos"))
    .catch(() => {
      const el = document.createElement("textarea")
      el.value = window.location.href
      document.body.appendChild(el); el.select()
      document.execCommand("copy"); document.body.removeChild(el)
      showToast("🔗 Link copied!")
    })
}

function showToast(msg) {
  toast.innerText = msg
  toast.classList.add("show")
  setTimeout(() => toast.classList.remove("show"), 2800)
}

// ─── INSTAGRAM CARD DOWNLOAD ─────────────────────────────────
document.getElementById("downloadBtn").onclick = async () => {
  const W = 1080, H = 1080
  const canvas = document.createElement("canvas")
  canvas.width = W; canvas.height = H
  const c = canvas.getContext("2d")

  // Theme colors
  const themeColors = {
    default: { p: "#7C5CFF", s: "#00E5FF", bg1: "#02040f", bg2: "#0a0828", nb1: "rgba(100,40,220,0.22)", nb2: "rgba(0,180,255,0.18)" },
    solar:   { p: "#FF4500", s: "#FFA500", bg1: "#0f0200", bg2: "#1a0800", nb1: "rgba(220,60,0,0.22)",   nb2: "rgba(255,140,0,0.18)" },
    nebula:  { p: "#00FF88", s: "#00FFCC", bg1: "#00100a", bg2: "#001a12", nb1: "rgba(0,200,100,0.20)",  nb2: "rgba(0,220,160,0.16)" },
    pink:    { p: "#FF4ECD", s: "#BF00FF", bg1: "#0f0010", bg2: "#180020", nb1: "rgba(220,40,180,0.22)", nb2: "rgba(160,0,220,0.18)" },
    ocean:   { p: "#0088FF", s: "#00EEFF", bg1: "#000a14", bg2: "#00101e", nb1: "rgba(0,100,220,0.22)",  nb2: "rgba(0,200,220,0.18)" }
  }
  const tc = themeColors[currentTheme] || themeColors.default

  // Background
  const bg = c.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, tc.bg1); bg.addColorStop(0.5, tc.bg2); bg.addColorStop(1, tc.bg1)
  c.fillStyle = bg; c.fillRect(0, 0, W, H)

  // Nebula blobs
  drawCardBlob(c, W*0.12, H*0.2,  320, tc.nb1)
  drawCardBlob(c, W*0.85, H*0.72, 260, tc.nb2)
  drawCardBlob(c, W*0.5,  H*0.05, 220, tc.nb1.replace("0.22","0.12"))

  // Stars
  for (let i = 0; i < 250; i++) {
    const x = Math.random()*W, y = Math.random()*H, r = Math.random()*1.8+0.2
    c.beginPath(); c.arc(x, y, r, 0, Math.PI*2)
    c.fillStyle = `rgba(255,255,255,${0.2+Math.random()*0.8})`; c.fill()
  }

  // Star borders top & bottom
  drawStarBorder(c, W, H, tc.s)

  // COSMOCHAOS logo
  c.save()
  const logoGrad = c.createLinearGradient(0, 0, W, 0)
  logoGrad.addColorStop(0, "#ffffff"); logoGrad.addColorStop(0.45, tc.s); logoGrad.addColorStop(1, tc.p)
  c.fillStyle = logoGrad
  c.font = "bold 90px Orbitron, sans-serif"
  c.textAlign = "center"
  c.shadowColor = tc.s; c.shadowBlur = 50
  c.fillText("COSMOCHAOS", W/2, 175)
  c.restore()

  // Divider line 1
  drawDivider(c, W, 205, tc.s)

  // Name badge (glowing pill)
  const badgeText = userBadge.innerText || "🌌 COSMIC TRAVELER'S GALAXY BRIEF"
  c.save()
  const badgeW = 680, badgeH = 56, badgeX = (W-badgeW)/2, badgeY = 225
  // Pill background
  c.beginPath()
  c.roundRect(badgeX, badgeY, badgeW, badgeH, 28)
  c.fillStyle = "rgba(255,255,255,0.06)"; c.fill()
  c.strokeStyle = tc.p; c.lineWidth = 1.5
  c.shadowColor = tc.p; c.shadowBlur = 20; c.stroke()
  // Badge text
  c.fillStyle = tc.s; c.shadowColor = tc.s; c.shadowBlur = 18
  c.font = "bold 22px Orbitron, sans-serif"
  c.textAlign = "center"
  c.fillText(badgeText, W/2, badgeY + 37)
  c.restore()

  // STAT CARD 1 — Years
  drawGlassStatCard(c, W, 320, ageYears.innerText, tc)

  // STAT CARD 2 — Days
  drawGlassStatCard(c, W, 440, ageDays.innerText, tc)

  // Message box
  const msgText = message.innerText
  c.save()
  // Quote marks
  c.font = "italic 64px Georgia, serif"
  c.fillStyle = tc.p; c.globalAlpha = 0.5; c.textAlign = "left"
  c.fillText('"', 140, 600)
  c.textAlign = "right"
  c.fillText('"', W-140, 650)
  c.globalAlpha = 1
  // Message text wrapped
  c.fillStyle = "rgba(255,255,255,0.92)"
  c.font = "28px Poppins, sans-serif"
  c.textAlign = "center"; c.shadowBlur = 0
  const msgLines = wrapText(msgText, 42)
  msgLines.forEach((line, i) => c.fillText(line, W/2, 605 + i*42))
  c.restore()

  // Divider 2
  drawDivider(c, W, 720, tc.s)

  // Birth year facts box (dim glassmorphism)
  const birthYear = birthYearLabel.innerText
  c.save()
  // Glass bg
  c.beginPath(); c.roundRect(120, 735, W-240, 185, 18)
  c.fillStyle = "rgba(255,255,255,0.03)"; c.fill()
  c.strokeStyle = "rgba(255,255,255,0.07)"; c.lineWidth = 1; c.stroke()
  // Year label
  c.fillStyle = tc.s; c.shadowColor = tc.s; c.shadowBlur = 12
  c.font = "bold 18px Orbitron, sans-serif"
  c.textAlign = "left"
  c.fillText(`🌍  BORN IN ${birthYear}`, 155, 768)
  // Facts
  c.fillStyle = "rgba(255,255,255,0.72)"; c.shadowBlur = 0
  c.font = "20px Poppins, sans-serif"
  const allFacts = Array.from(factsList.querySelectorAll(".fact-item")).map(f => f.innerText)
  allFacts.slice(0,2).forEach((fact, i) => {
    const wrapped = wrapText(fact, 55)
    c.fillText("• " + wrapped[0], 155, 800 + i*46)
  })
  c.restore()

  // Divider 3
  drawDivider(c, W, 935, tc.p)

  // Watermark
  c.save()
  c.fillStyle = "rgba(255,255,255,0.35)"
  c.font = "22px Orbitron, sans-serif"
  c.textAlign = "center"; c.shadowBlur = 0
  c.fillText("✨  cosmochaos.app  ✨", W/2, 975)
  c.fillStyle = `${tc.s}88`
  c.font = "16px Poppins, sans-serif"
  c.fillText(window.location.href, W/2, 1005)
  c.restore()

  // Download
  const a = document.createElement("a")
  a.href = canvas.toDataURL("image/png")
  a.download = "cosmochaos_galaxy_brief.png"
  a.click()
  showToast("📸 Galaxy Brief saved! Go slay 🚀")
}

function drawGlassStatCard(c, W, y, text, tc) {
  const cardW = W - 240, cardH = 90, cardX = 120
  c.save()
  // Frosted glass bg
  c.beginPath(); c.roundRect(cardX, y, cardW, cardH, 18)
  c.fillStyle = "rgba(255,255,255,0.06)"; c.fill()
  // Glow border
  c.strokeStyle = tc.p; c.lineWidth = 1.5
  c.shadowColor = tc.p; c.shadowBlur = 25; c.stroke()
  // Inner shimmer
  const shimmer = c.createLinearGradient(cardX, y, cardX + cardW, y + cardH)
  shimmer.addColorStop(0, "rgba(255,255,255,0.03)")
  shimmer.addColorStop(0.5, "rgba(255,255,255,0.08)")
  shimmer.addColorStop(1, "rgba(255,255,255,0.01)")
  c.fillStyle = shimmer; c.fill()
  // Text
  c.shadowBlur = 15; c.shadowColor = tc.s
  c.fillStyle = "#ffffff"
  c.font = "bold 38px Orbitron, sans-serif"
  c.textAlign = "center"
  c.fillText(text, W/2, y + 57)
  c.restore()
}

function drawCardBlob(c, x, y, r, color) {
  const g = c.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, color); g.addColorStop(1, "transparent")
  c.fillStyle = g; c.fillRect(x-r, y-r, r*2, r*2)
}

function drawDivider(c, W, y, color) {
  const g = c.createLinearGradient(120, 0, W-120, 0)
  g.addColorStop(0, "transparent"); g.addColorStop(0.5, color + "99"); g.addColorStop(1, "transparent")
  c.strokeStyle = g; c.lineWidth = 1.5
  c.beginPath(); c.moveTo(120, y); c.lineTo(W-120, y); c.stroke()
}

function drawStarBorder(c, W, H, color) {
  c.save(); c.fillStyle = `${color}88`; c.font = "18px sans-serif"; c.textAlign = "left"
  const stars = "✦ · · · · · · · · · · · · · · · · · · · · · ✦"
  c.fillText(stars, 60, 55)
  c.fillText(stars, 60, H - 30)
  c.restore()
}

function wrapText(text, maxChars) {
  const words = text.split(" ")
  const lines = []; let current = ""
  words.forEach(w => {
    if ((current + " " + w).trim().length > maxChars) { lines.push(current.trim()); current = w }
    else current += " " + w
  })
  if (current.trim()) lines.push(current.trim())
  return lines
}

// ─── STAR FIELD ──────────────────────────────────────────────
const bgCanvas = document.getElementById("space")
const ctx = bgCanvas.getContext("2d")
function resizeBgCanvas() { bgCanvas.width = window.innerWidth; bgCanvas.height = window.innerHeight }
resizeBgCanvas()

const stars = []
const shooting = []
for (let i = 0; i < 420; i++) {
  stars.push({
    x: Math.random()*bgCanvas.width, y: Math.random()*bgCanvas.height,
    size: Math.random()*2+0.2, speed: Math.random()*0.35+0.05,
    twinkle: Math.random()*Math.PI*2, twinkleSpeed: 0.015+Math.random()*0.04
  })
}

function drawBg() {
  ctx.fillStyle = "rgba(2,4,15,0.42)"; ctx.fillRect(0,0,bgCanvas.width,bgCanvas.height)
  stars.forEach(s => {
    s.twinkle += s.twinkleSpeed
    ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2)
    ctx.fillStyle = `rgba(255,255,255,${0.4+Math.sin(s.twinkle)*0.6})`; ctx.fill()
    s.y += s.speed
    if (s.y > bgCanvas.height) { s.y = 0; s.x = Math.random()*bgCanvas.width }
  })
  if (Math.random() < 0.012) {
    shooting.push({
      x: Math.random()*bgCanvas.width, y: Math.random()*bgCanvas.height*0.5,
      vx: 5+Math.random()*6, vy: 3+Math.random()*4,
      life: 80+Math.random()*50, maxLife: 130,
      hue: [200,300,180,260][Math.floor(Math.random()*4)]
    })
  }
  shooting.forEach((s, i) => {
    const alpha = s.life / s.maxLife
    const grad = ctx.createLinearGradient(s.x,s.y,s.x-90,s.y-45)
    grad.addColorStop(0, `hsla(${s.hue},100%,90%,${alpha})`)
    grad.addColorStop(1, "transparent")
    ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(s.x-90,s.y-45)
    ctx.strokeStyle = grad; ctx.lineWidth = 2.5; ctx.stroke()
    s.x += s.vx; s.y += s.vy; s.life--
    if (s.life <= 0) shooting.splice(i,1)
  })
  requestAnimationFrame(drawBg)
}
drawBg()

window.addEventListener("resize", () => { resizeBgCanvas(); resizeWarpCanvas(); burstCanvas.width = window.innerWidth; burstCanvas.height = window.innerHeight })