import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Star, Sparkles, X, Play, Pause, Info } from 'lucide-react'

/* ──────────────  DEFAULT DATA  ────────────── */
const NAME = 'NIMISHA'
const DATE = 'MAY 28'
const AGE = 22

// Sharp, raw, cinematic non-cheesy copy
const MESSAGE = `ANOTHER SEASON, ANOTHER SET OF ABSOLUTELY UNFILTERED REALITIES. 
FROM NAVIGATING THREE DIVERSE STATES TO SURVIVING CHILDHOOD WITH AN EXTRAORDINARY DEGREE OF RESILIENCE, THIS SEASON MARKS 22 YEARS OF SHOT-CALLING. 

UHD DYNAMIC RATING: 100% RAW. NO HALO EFFECTS. NO HALLMARK CARDS.`

const PHOTOS = [
  { url: '/photo1.jpg', title: 'THE THANOS INITIATIVE 👑', rating: '99% MATCH' },
  { url: '/photo2.jpg', title: 'PEACE & PASTA ALLIANCE 🍜', rating: '98% MATCH' },
  { url: '/photo3.jpg', title: 'THE EXCLUSIVE SCREENING 🎬', rating: '97% MATCH' }
]

const VIDEOS = [
  { url: '/vid5.mp4', title: 'PASTRY MASSACRE 🍰', rating: '99% MATCH', description: 'THAT IS HOW I IMAGINE YOU CUTTING THE CAKE RN. NO MERCY.' },
  { url: '/vid1.mp4', title: 'UNCENSORED JOY 💖', rating: '99% MATCH' },
  { url: '/vid2.mp4', title: 'ROAD TRIP VIBES 🚗', rating: '98% MATCH' },
  { url: '/vid3.mp4', title: 'TOKYO DOME MEMORIES 🇯🇵', rating: '99% MATCH' },
  { url: '/vid4.mp4', title: 'GOLDEN HOUR REELS 💫', rating: '97% MATCH' }
]

const EPISODES = [
  {
    number: 1,
    title: 'THE TRI-STATE MIGRATION',
    duration: '45m',
    desc: 'JHARKHAND, BIHAR, AND BENGAL. A DUSTY, LONG-WINDED TRANSIT ACROSS TRIPLE FRONTIERS THAT FORGED THE UNCOMPROMISING AND MULTI-FACETED NIMISHA OF S22. DEVOID OF FICTION, FULL OF GRIT.',
    url: '/photo1.jpg'
  },
  {
    number: 2,
    title: 'THE SURVIVAL INITIATIVE',
    duration: '50m',
    desc: "GROWING UP AS A YOUNGER SISTER AND DAUGHTER ISN'T A CAKEWALK. NO CHEAP COZY BACKDROP HERE—JUST COLD HARD RESPONSIBILITY, DENSE EXPECTATIONS, AND AN UNBREAKABLE RESISTANCE THAT ROASTS ADVERSITY ON A DAILY BASIS.",
    url: '/photo2.jpg'
  },
  {
    number: 3,
    title: 'THE SHOT-CALLER S22',
    duration: '48m',
    desc: "NIMISHA DECIDES THAT INSTEAD OF COMPLAINING ABOUT LIFE'S HIGH-BATTERY DRAINS AND BORING CLICHÉS, SHE'LL JUST OUT-COMPASSION AND OUT-SMILE THE ENTIRE CRITIC SYSTEM. A STANDOUT FINALE.",
    url: '/photo3.jpg'
  }
]

/* ──────────────  AUDIO SYNTHESIZER AND MELODIES  ────────────── */
const NOTE_FREQS: Record<string, number> = {
  C3: 130.81, 'C#3': 138.59, D3: 146.83, 'D#3': 155.56, E3: 164.81, F3: 174.61, 'F#3': 185.00, G3: 196.00, 'G#3': 207.65, A3: 220.00, 'A#3': 233.08, B3: 246.94,
  C4: 261.63, 'C#4': 277.18, D4: 293.66, 'D#4': 311.13, E4: 329.63, F4: 349.23, 'F#4': 369.99, G4: 392.00, 'G#4': 415.30, A4: 440.00, 'A#4': 466.16, B4: 493.88,
  C5: 523.25, 'C#5': 554.37, D5: 587.33, 'D#5': 622.25, E5: 659.25, F5: 698.46, 'F#5': 739.99, G5: 783.99, 'G#5': 830.61, A5: 880.00, B5: 987.77, REST: 0
}

const BDAY_MELODY = [
  { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'D4', dur: 1.0 }, { note: 'C4', dur: 1.0 }, { note: 'F4', dur: 1.0 }, { note: 'E4', dur: 2.0 },
  { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'D4', dur: 1.0 }, { note: 'C4', dur: 1.0 }, { note: 'G4', dur: 1.0 }, { note: 'F4', dur: 2.0 },
  { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'C5', dur: 1.0 }, { note: 'A4', dur: 1.0 }, { note: 'F4', dur: 1.0 }, { note: 'E4', dur: 1.0 }, { note: 'D4', dur: 2.0 },
  { note: 'A#4', dur: 0.75 }, { note: 'A#4', dur: 0.25 }, { note: 'A4', dur: 1.0 }, { note: 'F4', dur: 1.0 }, { note: 'G4', dur: 1.0 }, { note: 'F4', dur: 2.5 }
]

const AOI_MELODY = [
  { note: 'G4', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'E5', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'C5', dur: 1.6 },
  { note: 'A4', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'E5', dur: 0.8 }, { note: 'D5', dur: 1.6 },
  { note: 'G4', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'E5', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'C5', dur: 1.6 },
  { note: 'A4', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'B4', dur: 0.8 }, { note: 'C5', dur: 2.0 },
  { note: 'E5', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'E5', dur: 1.6 },
  { note: 'G5', dur: 0.8 }, { note: 'E5', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'D5', dur: 1.6 }
]

const CELESTIAL_MELODY = [
  { note: 'C5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 0.5 }, { note: 'C6', dur: 1.0 },
  { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 0.5 }, { note: 'C6', dur: 0.5 }, { note: 'E6', dur: 1.0 },
  { note: 'D5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'A5', dur: 0.5 }, { note: 'D6', dur: 1.0 },
  { note: 'F5', dur: 0.5 }, { note: 'A5', dur: 0.5 }, { note: 'D6', dur: 0.5 }, { note: 'F6', dur: 1.0 }
]

class ChiptunePlayer {
  private ctx: AudioContext | null = null
  private activeNodes: Array<{ osc: OscillatorNode; gain: GainNode }> = []
  private timerId: any = null
  private nextNoteTime = 0
  private tempo = 135
  private currentIndex = 0
  private melody: Array<{ note: string; dur: number }> = []
  private onTrackEndedCallback: (() => void) | null = null
  private loopMelody = true

  constructor() {}

  public init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public start(melody: Array<{ note: string; dur: number }>, loop = true, tempo = 135, onEnded?: () => void) {
    this.init()
    this.stop()
    this.melody = melody
    this.loopMelody = loop
    this.tempo = tempo
    this.onTrackEndedCallback = onEnded || null
    this.currentIndex = 0
    this.nextNoteTime = this.ctx!.currentTime + 0.05

    this.scheduler()
  }

  public stop() {
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }
    this.activeNodes.forEach(node => {
      try {
        node.osc.stop()
        node.osc.disconnect()
        node.gain.disconnect()
      } catch (e) {}
    })
    this.activeNodes = []
  }

  private scheduler() {
    if (!this.ctx) return
    const lookahead = 0.2
    while (this.nextNoteTime < this.ctx.currentTime + lookahead) {
      this.scheduleNote(this.currentIndex, this.nextNoteTime)
      this.advanceNote()
    }
    this.timerId = setTimeout(() => this.scheduler(), 50)
  }

  private scheduleNote(index: number, time: number) {
    if (!this.ctx || !this.melody[index]) return
    const step = this.melody[index]
    const freq = NOTE_FREQS[step.note] || 0
    const duration = step.dur * (60 / this.tempo)

    if (freq > 0) {
      const osc = this.ctx.createOscillator()
      const gainNode = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, time)

      const subOsc = this.ctx.createOscillator()
      const subGain = this.ctx.createGain()
      subOsc.type = 'triangle'
      subOsc.frequency.setValueAtTime(freq / 2, time)

      gainNode.gain.setValueAtTime(0, time)
      gainNode.gain.linearRampToValueAtTime(0.45, time + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration - 0.02)

      subGain.gain.setValueAtTime(0, time)
      subGain.gain.linearRampToValueAtTime(0.20, time + 0.04)
      subGain.gain.exponentialRampToValueAtTime(0.0001, time + duration - 0.02)

      osc.connect(gainNode)
      gainNode.connect(this.ctx.destination)

      subOsc.connect(subGain)
      subGain.connect(this.ctx.destination)

      osc.start(time)
      subOsc.start(time)

      osc.stop(time + duration)
      subOsc.stop(time + duration)

      this.activeNodes.push({ osc, gain: gainNode })
      this.activeNodes.push({ osc: subOsc, gain: subGain })
    }
  }

  private advanceNote() {
    const secondsPerBeat = 60 / this.tempo
    this.nextNoteTime += this.melody[this.currentIndex].dur * secondsPerBeat

    this.currentIndex++
    if (this.currentIndex >= this.melody.length) {
      if (this.loopMelody) {
        this.currentIndex = 0
      } else {
        this.stop()
        if (this.onTrackEndedCallback) {
          this.onTrackEndedCallback()
        }
      }
    }
  }
}

const synthPlayer = new ChiptunePlayer()

/* ──────────────  UTILITIES  ────────────── */
function launchConfetti() {
  const count = 180
  const defaults = { origin: { y: 0.6 } }
  
  confetti({ ...defaults, particleCount: count, spread: 80, colors: ['#FF1493', '#E50914', '#FFF', '#FFD700', '#C084FC'] })
  setTimeout(() => confetti({ ...defaults, particleCount: 80, spread: 100, colors: ['#E50914', '#FFF'] }), 200)
  setTimeout(() => confetti({ ...defaults, particleCount: 80, spread: 120, colors: ['#C084FC', '#FFF'] }), 400)
}

/* ──────────────  STARDUST CURSOR TRAIL  ────────────── */
function StardustCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768
    if (isTouchDevice) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let animationFrameId: number

    const particles: Array<{
      x: number
      y: number
      size: number
      vx: number
      vy: number
      alpha: number
      color: string
    }> = []

    const colors = ['#E50914', '#FFD700', '#FFF', '#C084FC', '#FF1493']

    const addParticle = (x: number, y: number) => {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x,
          y,
          size: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.6,
          alpha: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      addParticle(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addParticle(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.022
        
        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, opacity: 0.9 }} />
}

/* ──────────────  FLOATING NOTE EMITTER  ────────────── */
interface Note {
  id: number
  x: number
  y: number
  char: string
}

function FloatingNotesEmitter({ active }: { active: boolean }) {
  const [notes, setNotes] = useState<Note[]>([])
  const noteId = useRef(0)

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      const chars = ['🎵', '🎶', '♩', '♪', '♫', '♥', '✨']
      const newNote = {
        id: noteId.current++,
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40,
        char: chars[Math.floor(Math.random() * chars.length)]
      }
      setNotes(prev => [...prev.slice(-12), newNote])
    }, 500)
    return () => clearInterval(interval)
  }, [active])

  return (
    <div className="floating-notes-container">
      {notes.map(note => (
        <span
          key={note.id}
          className="music-note text-red-500"
          style={{ left: `${note.x}px`, top: `${note.y}px`, animation: 'float-note 2s ease-out forwards' }}
        >
          {note.char}
        </span>
      ))}
    </div>
  )
}

/* ──────────────  COSMIC DUST BACKGROUND  ────────────── */
function CosmicStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Array<{ x: number; y: number; size: number; speedY: number; opacity: number }> = []
    const isMobile = window.innerWidth <= 768
    const particleCount = isMobile ? 18 : 55

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        opacity: Math.random() * 0.45 + 0.15
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach(p => {
        p.y += p.speedY
        if (p.y < 0) {
          p.y = height
          p.x = Math.random() * width
        }
        ctx.fillStyle = `rgba(229, 9, 20, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4 }} />
}

/* ──────────────  COMPONENTS  ────────────── */

function FloatingShape({ emoji, style, animation }: { emoji: string; style: React.CSSProperties; animation: string }) {
  return (
    <div
      className="floating-shape hidden md:block"
      style={{
        animation: animation,
        ...style,
      }}
    >
      {emoji}
    </div>
  )
}

function HeroBanner({ name, date, age, onPlayClick }: { name: string; date: string; age: number; onPlayClick: () => void }) {
  return (
    <section className="hero-banner">
      <video 
        src="/vid2.mp4" 
        className="hero-video-bg" 
        muted 
        loop 
        playsInline 
        autoPlay 
      />

      <div className="hero-info">
        <div className="hero-tag">
          <Star size={14} fill="currentColor" />
          <span>NIMISHAFLIX ORIGINAL SYNOPSIS</span>
        </div>
        <h1 className="hero-title">{name}</h1>
        
        <div className="hero-meta">
          <span className="meta-match">99% RATING</span>
          <span className="meta-year">{date}</span>
          <span className="meta-age">SEASON {age}</span>
          <span className="meta-hd">ULTRA HD</span>
          <span className="meta-hd">5.1 SOUND</span>
        </div>

        <p className="hero-desc">{MESSAGE}</p>

        <div className="hero-btn-row">
          <button className="hero-btn hero-btn-red" onClick={onPlayClick}>
            <Play size={18} fill="currentColor" />
            PLAY MEMORY REELS
          </button>
          <button className="hero-btn hero-btn-trans" onClick={() => {
            const el = document.getElementById('episodes')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}>
            <Info size={18} />
            BIOGRAPHICAL EPISODES
          </button>
        </div>
      </div>
    </section>
  )
}

function PhotosRow() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string } | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const amount = direction === 'left' ? -350 : 350
      rowRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <div className="netflix-row relative group">
      <h2 className="row-title">POPULAR RELEASES: CAPTURED FRAMES</h2>
      
      <button className="slider-arrow slider-arrow-left" onClick={() => handleScroll('left')}>‹</button>
      
      <div className="row-container" ref={rowRef}>
        {PHOTOS.map((photo, i) => (
          <motion.div 
            key={i} 
            className="movie-card"
            onClick={() => setSelectedPhoto(photo)}
            whileHover={{ scale: 1.1, translateY: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img src={photo.url} alt={photo.title} className="movie-img" />
            <div className="movie-overlay">
              <div className="movie-card-title">
                <span>{photo.title}</span>
                <span className="movie-card-subtitle">{photo.rating}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">EXCLUSIVE PORTRAIT</div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="slider-arrow slider-arrow-right" onClick={() => handleScroll('right')}>›</button>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="lightbox-content"
              onClick={e => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
                <X size={20} />
              </button>
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="lightbox-media" />
              <div className="lightbox-text-container">
                <h3 className="lightbox-title uppercase">{selectedPhoto.title}</h3>
                <p className="lightbox-match">99% PERFECT SYNC • EXCLUSIVELY SHOT</p>
                <p className="lightbox-desc">Frozen in pure cinematic high definition, celebrating a milestone worth cherishing eternally.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function VideosRow() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; description?: string } | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const amount = direction === 'left' ? -350 : 350
      rowRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <div className="netflix-row relative group" id="reels">
      <h2 className="row-title">TRENDING SERIES: CINEMATIC REELS</h2>

      <button className="slider-arrow slider-arrow-left" onClick={() => handleScroll('left')}>‹</button>

      <div className="row-container" ref={rowRef}>
        {VIDEOS.map((vid, i) => (
          <motion.div 
            key={i} 
            className="movie-card"
            onClick={() => setSelectedVideo(vid)}
            whileHover={{ scale: 1.1, translateY: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <video src={vid.url} muted loop playsInline autoPlay />
            <div className="movie-overlay">
              <div className="movie-card-title animate-pulse">
                <span>{vid.title}</span>
                <span className="movie-card-subtitle">{vid.rating}</span>
              </div>
              <div className="text-[10px] text-red-500 mt-1 uppercase font-bold tracking-wider">TAP TO PLAY FULL AUDIO</div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="slider-arrow slider-arrow-right" onClick={() => handleScroll('right')}>›</button>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="lightbox-content"
              onClick={e => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedVideo(null)}>
                <X size={20} />
              </button>
              <video src={selectedVideo.url} controls autoPlay playsInline className="lightbox-media" />
              <div className="lightbox-text-container">
                <h3 className="lightbox-title uppercase">{selectedVideo.title}</h3>
                <p className="lightbox-match">99% CRITICS MATCH • ORIGINAL DIRECT RECORDING</p>
                <p className="lightbox-desc font-sans">{selectedVideo.description || 'An organic slice of life capturing the absolute dynamic humor, resilience, and lightheartedness that you carry.'}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function EpisodesList() {
  return (
    <section className="episodes-section" id="episodes">
      <div className="episodes-header">
        <h2 className="episodes-title">EPISODE GUIDE: THE RESILIENT LIFESTYLE</h2>
        <span className="episodes-season">SEASON 22 (UHD)</span>
      </div>

      <div className="episodes-list font-sans">
        {EPISODES.map((ep, i) => (
          <motion.div 
            key={i} 
            className="episode-item"
            whileHover={{ scale: 1.01, translateY: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="episode-number font-display">{ep.number}</div>
            
            <div className="episode-thumb-container">
              <img src={ep.url} alt={ep.title} className="episode-thumb" />
            </div>

            <div className="episode-details">
              <div className="episode-title-row">
                <h3 className="episode-item-title uppercase tracking-wider text-red-500 font-display text-xl">{ep.title}</h3>
                <span className="episode-duration text-amber-400 font-semibold font-sans">{ep.duration}</span>
              </div>
              <p className="episode-desc leading-relaxed font-sans mt-2">{ep.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ──────────────  IMMERSIVE WISH CANVAS ANIMATION  ────────────── */
interface WishAnimationCanvasProps {
  state: 'idle' | 'pop' | 'shooting' | 'constellation' | 'done'
  onAnimationComplete: () => void
}

function WishAnimationCanvas({ state, onAnimationComplete }: WishAnimationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (state !== 'shooting' && state !== 'constellation') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let comet = {
      x: width / 2,
      y: height / 2 + 50,
      targetX: width - 240,
      targetY: 160,
      speed: 0.05,
      active: state === 'shooting'
    }

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
      decay: number
      sparkle?: boolean
    }> = []

    const constellationStars: Array<{
      x: number
      y: number
      targetX: number
      targetY: number
      size: number
      alpha: number
      twinkleSpeed: number
    }> = []

    const centerX = width > 768 ? width - 240 : width / 2
    const centerY = width > 768 ? 160 : 120
    const pointsCount = 42
    for (let i = 0; i < pointsCount; i++) {
      const t = (i / pointsCount) * Math.PI * 2
      const rX = 16 * Math.pow(Math.sin(t), 3)
      const rY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
      const scale = width > 768 ? 6.5 : 4.5
      
      const targetX = centerX + rX * scale
      const targetY = centerY + rY * scale

      const startX = width / 2
      const startY = height / 2 + 50

      const constellationStar = {
        x: startX,
        y: startY,
        targetX,
        targetY,
        size: Math.random() * 2.5 + 1.5,
        alpha: 0,
        twinkleSpeed: Math.random() * 0.04 + 0.02
      }
      constellationStars.push(constellationStar)
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const tick = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        
        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.shadowBlur = p.sparkle ? 12 : 5
        ctx.shadowColor = p.color
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      if (comet.active) {
        const dx = comet.targetX - comet.x
        const dy = comet.targetY - comet.y
        comet.x += dx * comet.speed
        comet.y += dy * comet.speed

        for (let k = 0; k < 8; k++) {
          particles.push({
            x: comet.x,
            y: comet.y,
            vx: (Math.random() - 0.5) * 4 - (dx * 0.015),
            vy: (Math.random() - 0.5) * 4 - (dy * 0.015),
            size: Math.random() * 5 + 1.5,
            color: ['#FFF', '#FFD700', '#FF4500', '#C084FC'][Math.floor(Math.random() * 4)],
            alpha: 1.0,
            decay: Math.random() * 0.035 + 0.015,
            sparkle: Math.random() > 0.4
          })
        }

        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 8) {
          comet.active = false
          for (let m = 0; m < 90; m++) {
            const angle = Math.random() * Math.PI * 2
            const velocity = Math.random() * 6 + 2
            particles.push({
              x: comet.targetX,
              y: comet.targetY,
              vx: Math.cos(angle) * velocity,
              vy: Math.sin(angle) * velocity,
              size: Math.random() * 3.5 + 1.2,
              color: ['#FFD700', '#FF1493', '#FFF', '#C084FC'][Math.floor(Math.random() * 4)],
              alpha: 1.0,
              decay: Math.random() * 0.02 + 0.01,
              sparkle: true
            })
          }
          onAnimationComplete()
        }
      }

      if (state === 'constellation') {
        constellationStars.forEach(s => {
          const dx = s.targetX - s.x
          const dy = s.targetY - s.y
          s.x += dx * 0.08
          s.y += dy * 0.08

          if (s.alpha < 1) {
            s.alpha += 0.025
          }

          const sizeMod = Math.abs(Math.sin(Date.now() * s.twinkleSpeed)) * 1.5

          ctx.save()
          ctx.globalAlpha = s.alpha
          ctx.shadowBlur = 10
          ctx.shadowColor = '#FFD700'
          ctx.fillStyle = '#FFF'
          ctx.beginPath()

          ctx.moveTo(s.x, s.y - s.size - sizeMod)
          ctx.lineTo(s.x + s.size / 2, s.y - s.size / 2)
          ctx.lineTo(s.x + s.size + sizeMod, s.y)
          ctx.lineTo(s.x + s.size / 2, s.y + s.size / 2)
          ctx.lineTo(s.x, s.y + s.size + sizeMod)
          ctx.lineTo(s.x - s.size / 2, s.y + s.size / 2)
          ctx.lineTo(s.x - s.size - sizeMod, s.y)
          ctx.lineTo(s.x - s.size / 2, s.y - s.size / 2)
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        })
      }

      animationRef.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [state])

  if (state !== 'shooting' && state !== 'constellation') return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full"
      style={{ zIndex: 100000 }}
    />
  )
}

interface SmokeRing {
  id: number
  x: number
  y: number
}

interface Ember {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
}

function InteractiveCake({ onWishRevealed }: { onWishRevealed: () => void }) {
  const [candlesBlown, setCandlesBlown] = useState([false, false, false])
  const [wishState, setWishState] = useState<'idle' | 'pop' | 'shooting' | 'constellation' | 'done'>('idle')
  const [wishText, setWishText] = useState('')
  
  const [smokeRings, setSmokeRings] = useState<SmokeRing[]>([])
  const [embers, setEmbers] = useState<Ember[]>([])
  
  const smokeId = useRef(0)
  const emberId = useRef(0)

  const handleCandleClick = (index: number) => {
    if (candlesBlown[index]) return
    const newBlown = [...candlesBlown]
    newBlown[index] = true
    setCandlesBlown(newBlown)

    const candleX = 160 + index * 40
    const flameY = 65

    const newSmoke = { id: smokeId.current++, x: candleX, y: flameY }
    setSmokeRings(prev => [...prev, newSmoke])

    const sparkCount = 8
    const newSparks: Ember[] = []
    const sparkColors = ['#FFD700', '#FF4500', '#FF1493', '#FFF']
    
    for (let i = 0; i < sparkCount; i++) {
      newSparks.push({
        id: emberId.current++,
        x: candleX,
        y: flameY,
        vx: (Math.random() - 0.5) * 4,
        vy: -(Math.random() * 3 + 1),
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)]
      })
    }
    setEmbers(prev => [...prev, ...newSparks])

    setTimeout(() => {
      setSmokeRings(prev => prev.filter(s => s.id !== newSmoke.id))
    }, 1500)

    confetti({
      particleCount: 15,
      spread: 30,
      origin: { y: 0.5, x: 0.4 + index * 0.1 }
    })

    if (newBlown.every(c => c)) {
      setTimeout(() => {
        setWishState('pop')
      }, 700)
    }
  }

  useEffect(() => {
    if (embers.length === 0) return
    const interval = setInterval(() => {
      setEmbers(prev => 
        prev
          .map(e => ({
            ...e,
            x: e.x + e.vx,
            y: e.y + e.vy,
            vy: e.vy + 0.15
          }))
          .filter(e => e.y < 300)
      )
    }, 30)
    return () => clearInterval(interval)
  }, [embers])

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wishText.trim()) return
    setWishState('shooting')
  }

  return (
    <section className="section cake-section py-16" id="wish">
      <div className="section-header text-center mb-8">
        <Sparkles size={28} className="inline text-red-500 animate-pulse mr-2" />
        <h2 className="section-title text-3xl font-extrabold tracking-widest text-white uppercase inline-block">MAKE A CELESTIAL WISH</h2>
        <p className="section-subtitle text-neutral-400 mt-2 tracking-wider font-sans">Tap each candle flame to extinguish it, popping open a cosmic scroll that shoots your wish to the sky!</p>
      </div>

      <WishAnimationCanvas 
        state={wishState} 
        onAnimationComplete={() => {
          setWishState('constellation')
          launchConfetti()
          onWishRevealed()
          setTimeout(() => {
            setWishState('done')
          }, 3500)
        }}
      />

      <div className="cake-container glass-panel relative overflow-hidden mx-auto border border-neutral-800 rounded-2xl max-w-lg bg-neutral-950/80 p-8 shadow-2xl">
        {smokeRings.map(smoke => (
          <div
            key={smoke.id}
            className="absolute pointer-events-none"
            style={{
              left: `calc(50% - 200px + ${smoke.x}px)`,
              top: `${smoke.y}px`
            }}
          >
            <div className="smoke-puff-animation" />
          </div>
        ))}

        {embers.map(emb => (
          <div
            key={emb.id}
            className="absolute pointer-events-none w-1.5 h-1.5 rounded-full"
            style={{
              left: `calc(50% - 200px + ${emb.x}px)`,
              top: `${emb.y}px`,
              backgroundColor: emb.color,
              boxShadow: `0 0 8px ${emb.color}`
            }}
          />
        ))}

        <div className="cake-box flex justify-center items-center">
          <svg viewBox="0 0 400 300" width="100%" height="240">
            <circle cx="200" cy="180" r="110" fill="radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 70%)" opacity="0.6" />

            <path d="M 100 240 L 300 240 L 280 260 L 120 260 Z" fill="url(#goldGrad)" className="filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
            <rect x="180" y="240" width="40" height="20" fill="url(#goldGrad)" />
            <ellipse cx="200" cy="240" rx="100" ry="10" fill="url(#goldGrad)" />

            <rect x="120" y="165" width="160" height="75" rx="8" fill="url(#cakeRedGrad)" className="filter drop-shadow-md" />
            <ellipse cx="200" cy="165" rx="80" ry="10" fill="#E50914" opacity="0.8" />
            <path d="M 120 230 C 130 240, 140 230, 150 240 C 160 230, 170 240, 180 230 C 190 240, 200 230, 210 240 C 220 230, 230 240, 240 230 C 250 240, 260 230, 270 240 C 280 230, 290 240, 280 230" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

            <rect x="142" y="105" width="116" height="60" rx="8" fill="url(#cakeRoseGrad)" />
            <ellipse cx="200" cy="105" rx="58" ry="8" fill="#FFF" opacity="0.9" />
            <path d="M 142 105 Q 152 125 162 105 Q 172 125 182 105 Q 192 125 202 105 Q 212 125 222 105 Q 232 125 242 105 Q 252 125 258 105 L 258 112 L 142 112 Z" fill="#FFF" opacity="0.95" />

            {[0, 1, 2].map(i => {
              const xPos = 160 + i * 40
              return (
                <g key={i} className="candle cursor-pointer group" onClick={() => handleCandleClick(i)}>
                  <rect x={xPos - 4} y="72" width="8" height="36" fill={i === 0 ? 'url(#candlePurple)' : i === 1 ? 'url(#candleAmber)' : 'url(#candleBlue)'} rx="2" className="transition-all duration-300 group-hover:brightness-125" />
                  <line x1={xPos} y1="72" x2={xPos} y2="65" stroke="#222" strokeWidth="2.5" />
                  {!candlesBlown[i] && (
                    <path
                      d={`M ${xPos} 44 C ${xPos - 6} 54 ${xPos} 65 ${xPos} 65 C ${xPos} 65 ${xPos + 6} 54 ${xPos} 44 Z`}
                      fill="url(#flameGrad)"
                      className="candle-flame-premium animate-pulse"
                      style={{
                        transformOrigin: `${xPos}px 65px`,
                        filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.85))'
                      }}
                    />
                  )}
                </g>
              )
            })}

            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF0D4" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA7C11" />
              </linearGradient>
              <linearGradient id="cakeRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF2E3B" />
                <stop offset="100%" stopColor="#8A040C" />
              </linearGradient>
              <linearGradient id="cakeRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFAEC9" />
                <stop offset="50%" stopColor="#E03A64" />
                <stop offset="100%" stopColor="#8F1534" />
              </linearGradient>
              <linearGradient id="candlePurple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D8B4FE" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <linearGradient id="candleAmber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="candleBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="35%" stopColor="#FDE047" />
                <stop offset="70%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="cake-instruction text-center mt-6">
          {candlesBlown.every(c => c) ? (
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
              ✨ WISH TRANSFERRED TO THE HEART CONSTELLATION! ✨
            </span>
          ) : (
            <div className="flex items-center justify-center gap-2 text-neutral-400 uppercase tracking-widest text-xs font-bold font-sans">
              <Star size={16} className="animate-spin text-amber-400" />
              <span>Tap each candle flame to extinguish it</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Parchment Wish Modal */}
      <AnimatePresence>
        {wishState === 'pop' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="wish-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.85, y: 50, rotateX: 45 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0, y: -100, rotateY: 90 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              className="wish-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute inset-0 z-0 opacity-25 pointer-events-none rotating-space-portal" />

              <div className="relative z-10">
                <Sparkles size={36} className="mx-auto text-amber-300 animate-pulse mb-3" />
                <h3 className="wish-modal-title">✨ THE CELESTIAL SCROLL ✨</h3>
                <p className="wish-modal-desc font-sans">Write a dream onto this scroll. When submitted, the letter will fold into a comet and shoot into the sky!</p>
                
                <form onSubmit={handleWishSubmit} className="wish-form">
                  <textarea
                    className="wish-textarea"
                    placeholder="I wish for a year filled with..."
                    value={wishText}
                    onChange={e => setWishText(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="wish-submit-btn"
                  >
                    RELEASE TO THE GALAXY ☄️
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface VinylPlayerProps {
  playing: boolean
  togglePlayback: (e: React.MouseEvent) => void
  currentTrack: 'bday' | 'japanese' | 'celestial'
}

function VinylPlayer({ playing, togglePlayback, currentTrack }: VinylPlayerProps) {
  return (
    <div className="vinyl-player-widget" onClick={togglePlayback}>
      <div className="vinyl-disc-container">
        <div className={`vinyl-disc ${playing ? 'spinning' : ''}`} />
        <div className="vinyl-tonearm" />
      </div>
      <div className="vinyl-info flex items-center gap-2">
        {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        <span className="uppercase tracking-wider font-bold">
          {playing 
            ? (currentTrack === 'bday' 
                ? 'Happy Birthday 🎂' 
                : currentTrack === 'japanese' 
                  ? 'Aoi Sangoshou 🌊' 
                  : 'Star Box 💫') 
            : 'Play Music'}
        </span>
      </div>
      <FloatingNotesEmitter active={playing} />
    </div>
  )
}

function Footer({ name }: { name: string }) {
  return (
    <footer className="footer font-sans">
      <div className="footer-hearts">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <Heart size={20} fill="var(--netflix-red)" color="var(--netflix-red)" />
          </motion.span>
        ))}
      </div>
      <p className="footer-text uppercase tracking-widest font-display text-2xl">CONSTANT CRITICISM & ZERO Hallmark POETRY FOR {name}</p>
      <p className="footer-sub uppercase tracking-wider font-sans text-xs mt-2 text-neutral-500">ANOTHER YEAR CLOSER TO PENSION. HAVE A DYNAMIC CELEBRATION!</p>
    </footer>
  )
}

/* ──────────────  MAIN APP  ────────────── */
export default function App() {
  const [playing, setPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<'bday' | 'japanese' | 'celestial'>('bday')

  // Synthesizer playback reactive control
  useEffect(() => {
    if (playing) {
      if (currentTrack === 'bday') {
        synthPlayer.start(BDAY_MELODY, false, 155, () => {
          setCurrentTrack('japanese')
        })
      } else if (currentTrack === 'japanese') {
        synthPlayer.start(AOI_MELODY, true, 175)
      } else {
        synthPlayer.start(CELESTIAL_MELODY, true, 115)
      }
    } else {
      synthPlayer.stop()
    }

    return () => {
      synthPlayer.stop()
    }
  }, [playing, currentTrack])

  // Screen interaction trigger to resume/init audio context
  useEffect(() => {
    const playOnInteraction = (e: MouseEvent | TouchEvent) => {
      if (e.target && (e.target as HTMLElement).closest('.vinyl-player-widget')) {
        return
      }
      if (!playing) {
        synthPlayer.init()
        setPlaying(true)
      }
    }

    window.addEventListener('click', playOnInteraction)
    window.addEventListener('touchstart', playOnInteraction)

    return () => {
      window.removeEventListener('click', playOnInteraction)
      window.removeEventListener('touchstart', playOnInteraction)
    }
  }, [playing])

  // Dynamic Scroll-based Music Changer
  useEffect(() => {
    const options = { threshold: 0.15 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'wish') {
            setCurrentTrack('celestial')
          } else if (entry.target.id === 'reels' || entry.target.id === 'episodes') {
            setCurrentTrack('japanese')
          } else if (entry.target.id === 'hero') {
            setCurrentTrack('bday')
          }
        }
      })
    }, options)

    const hero = document.getElementById('hero')
    const reels = document.getElementById('reels')
    const episodes = document.getElementById('episodes')
    const wish = document.getElementById('wish')

    if (hero) observer.observe(hero)
    if (reels) observer.observe(reels)
    if (episodes) observer.observe(episodes)
    if (wish) observer.observe(wish)

    return () => observer.disconnect()
  }, [])

  const togglePlayback = (e: React.MouseEvent) => {
    e.stopPropagation()
    synthPlayer.init()
    setPlaying(!playing)
  }

  useEffect(() => {
    const timer = setTimeout(launchConfetti, 850)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <StardustCursorTrail />
      <CosmicStarfield />

      <header className="netflix-header">
        <div className="netflix-logo">{NAME}<span>FLIX</span></div>
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.9rem', fontWeight: 700 }} className="uppercase tracking-widest">
          <span style={{ color: '#E5E5E5', cursor: 'pointer' }}>HOME</span>
          <span style={{ color: '#A3A3A3', cursor: 'pointer' }}>SERIES</span>
          <span style={{ color: '#A3A3A3', cursor: 'pointer' }}>NEW & POPULAR</span>
        </div>
      </header>

      <VinylPlayer playing={playing} togglePlayback={togglePlayback} currentTrack={currentTrack} />

      <FloatingShape emoji="🎈" style={{ top: '15%', left: '3%' }} animation="float 6s ease-in-out infinite" />
      <FloatingShape emoji="✨" style={{ top: '25%', right: '5%' }} animation="float-reverse 5s ease-in-out infinite" />
      <FloatingShape emoji="🌸" style={{ top: '70%', left: '2%' }} animation="float 7s ease-in-out infinite 1s" />
      <FloatingShape emoji="💫" style={{ top: '88%', left: '5%' }} animation="float 6s ease-in-out infinite 2s" />

      <div id="hero">
        <HeroBanner name={NAME} date={DATE} age={AGE} onPlayClick={() => {
          const el = document.getElementById('reels')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }} />
      </div>
      
      <PhotosRow />
      <VideosRow />
      <EpisodesList />
      
      <InteractiveCake onWishRevealed={launchConfetti} />

      <Footer name={NAME} />

      <motion.button
        className="confetti-btn"
        onClick={launchConfetti}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Sparkles size={20} />
        <span className="uppercase tracking-widest">MORE MAGIC!</span>
      </motion.button>
    </div>
  )
}
