import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Star, Sparkles, X, Play, Pause, Info } from 'lucide-react'

/* ──────────────  DEFAULT DATA  ────────────── */
const NAME = 'NIMISHA'
const DATE = 'MAY 28'
const AGE = 22

const MESSAGE = `HAPPY BIRTHDAY TO SOMEONE WHOSE STRENGTH, DIGNITY, AND DYNAMIC SPIRIT INSPIRE EVERYONE AROUND HER!
YOUR JOURNEY HAS BEEN A BEAUTIFUL TESTAMENT TO RESILIENCE AND GRACE.

MAY THIS SEASON BRING YOU GLOWING SUCCESS, ENDLESS ADVENTURES, AND THE FULFILLMENT OF YOUR DEAREST DREAMS.`

// Beautiful uploaded photos
const PHOTOS = [
  { url: '/photo1.jpg', title: 'THE THANOS INITIATIVE 👑', rating: '99% MATCH' },
  { url: '/photo2.jpg', title: 'PEACE & PASTA ALLIANCE 🍜', rating: '98% MATCH' },
  { url: '/photo3.jpg', title: 'THE EXCLUSIVE SCREENING 🎬', rating: '97% MATCH' }
]

// Beautiful copied videos
const VIDEOS = [
  { url: '/vid5.mp4', title: 'PASTRY MASSACRE 🍰', rating: '99% MATCH', description: 'THAT IS HOW I IMAGINE YOU CUTTING THE CAKE RN' },
  { url: '/vid1.mp4', title: 'UNCENSORED JOY 💖', rating: '99% MATCH' },
  { url: '/vid2.mp4', title: 'ROAD TRIP VIBES 🚗', rating: '98% MATCH' },
  { url: '/vid3.mp4', title: 'TOKYO DOME MEMORIES 🇯🇵', rating: '99% MATCH' },
  { url: '/vid4.mp4', title: 'GOLDEN HOUR REELS 💫', rating: '97% MATCH' }
]

// Netflix Styled Episodes mapped to her real journey and photos
const EPISODES = [
  {
    number: 1,
    title: 'THE TRI-STATE JOURNEY',
    duration: '45m',
    desc: 'FROM THE DRIER LANDS OF JHARKHAND TO THE ANCIENT HEART OF BIHAR, AND FINALLY THE RICH CULTURAL WINDS OF BENGAL. A GRIPPING CHAPTER TRACING HER FOOTSTEPS THROUGH THREE DIVERSE STATES, SHAPING THE DYNAMIC AND ADAPTABLE NIMISHA WE CELEBRATE TODAY.',
    url: '/photo1.jpg'
  },
  {
    number: 2,
    title: 'RESILIENCE IN THE SHADOWS',
    duration: '50m',
    desc: 'A DEEP LOOK INTO HER CHILDHOOD AS A YOUNGER SISTER AND DAUGHTER. GROWING UP WAS NOT AN EASY RIDE, WITH NUMEROUS RESPONSIBILITIES AND HARDSHIPS WEIGHING HEAVILY, YET HER INNER STRENGTH AND INDOMITABLE GRACE ALCHEMIZED ADVERSITY INTO A BRILLIANT SPIRIT.',
    url: '/photo2.jpg'
  },
  {
    number: 3,
    title: 'THE SUNLIGHT ALLIANCE',
    duration: '48m',
    desc: 'DESPITE EVERY SINGLE HURDLE AND UNFAIR CHANCE, HER WARMTH, MAGNETIC SMILE, AND BRILLIANT COMPASSION WIN THE DAY, PROVING THAT THE HARDEST ROADS ALWAY FORGE THE MOST RADIANT STARS.',
    url: '/photo3.jpg'
  }
]

/* ──────────────  AUDIO URLS  ────────────── */
const BDAY_SONG = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' // Track 1
const JAPANESE_SONG = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' // Track 2

/* ──────────────  UTILITIES  ────────────── */
function launchConfetti() {
  const count = 180
  const defaults = { origin: { y: 0.6 } }
  
  confetti({ ...defaults, particleCount: count, spread: 80, colors: ['#FF1493', '#E50914', '#FFF', '#FFD700', '#C084FC'] })
  setTimeout(() => confetti({ ...defaults, particleCount: 80, spread: 100, colors: ['#E50914', '#FFF'] }), 200)
  setTimeout(() => confetti({ ...defaults, particleCount: 80, spread: 120, colors: ['#C084FC', '#FFF'] }), 400)
}

/* ──────────────  HIGH-PERFORMANCE STARDUST CURSOR TRAIL  ────────────── */
function StardustCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.shadowBlur = 6
        ctx.shadowColor = p.color
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
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

/* ──────────────  GLOWING COSMIC DUST BACKGROUND  ────────────── */
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

    for (let i = 0; i < 55; i++) {
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
              className="lightbox-content relative max-w-lg overflow-hidden rounded-xl border border-neutral-800"
              onClick={e => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
                <X size={20} />
              </button>
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-auto max-h-[75vh] object-contain" />
              <div className="p-6 bg-neutral-950">
                <h3 className="text-xl font-bold mb-1 text-red-500 tracking-wider uppercase">{selectedPhoto.title}</h3>
                <p className="text-sm text-green-400 font-semibold mb-2">99% PERFECT SYNC • EXCLUSIVELY SHOT</p>
                <p className="text-sm text-neutral-400">Frozen in pure cinematic high definition, celebrating an unbreakable milestone worth cherishing eternally.</p>
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
              className="lightbox-content bg-neutral-950 rounded-xl overflow-hidden max-w-2xl w-full border border-neutral-800"
              onClick={e => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedVideo(null)}>
                <X size={20} />
              </button>
              <video src={selectedVideo.url} controls autoPlay playsInline className="w-full max-h-[65vh] object-contain" />
              <div className="p-6 bg-neutral-950">
                <h3 className="text-xl font-bold mb-1 text-red-500 tracking-wider uppercase">{selectedVideo.title}</h3>
                <p className="text-sm text-green-400 font-semibold mb-2">99% CRITICS MATCH • ORIGINAL DIRECT RECORDING</p>
                <p className="text-sm text-neutral-300 tracking-wide font-sans">{selectedVideo.description || 'An organic slice of life capturing the absolute dynamic humor, resilience, and lightheartedness that you carry.'}</p>
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
        <h2 className="episodes-title font-sans">EPISODE GUIDE: THE RESILIENT LIFESTYLE</h2>
        <span className="episodes-season">SEASON 22 (UHD)</span>
      </div>

      <div className="episodes-list">
        {EPISODES.map((ep, i) => (
          <motion.div 
            key={i} 
            className="episode-item"
            whileHover={{ scale: 1.01, translateY: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="episode-number">{ep.number}</div>
            
            <div className="episode-thumb-container">
              <img src={ep.url} alt={ep.title} className="episode-thumb" />
            </div>

            <div className="episode-details">
              <div className="episode-title-row">
                <h3 className="episode-item-title uppercase tracking-wider text-red-500 font-bold">{ep.title}</h3>
                <span className="episode-duration text-amber-400 font-semibold">{ep.duration}</span>
              </div>
              <p className="episode-desc leading-relaxed font-sans">{ep.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

interface StarParticle {
  id: number
  x: number
  delay: string
  drift: string
  scale: number
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
  const [wishOpened, setWishOpened] = useState(false)
  const [wishText, setWishText] = useState('')
  const [risingStars, setRisingStars] = useState<StarParticle[]>([])
  
  // Real smoke & ember particle lists
  const [smokeRings, setSmokeRings] = useState<SmokeRing[]>([])
  const [embers, setEmbers] = useState<Ember[]>([])
  
  const starId = useRef(0)
  const smokeId = useRef(0)
  const emberId = useRef(0)

  const handleCandleClick = (index: number) => {
    if (candlesBlown[index]) return
    const newBlown = [...candlesBlown]
    newBlown[index] = true
    setCandlesBlown(newBlown)

    // Flame position mapping coordinates based on SVG
    const candleX = 160 + index * 40
    const flameY = 65

    // 1. Emit realistic grey-white smoke ring
    const newSmoke = { id: smokeId.current++, x: candleX, y: flameY }
    setSmokeRings(prev => [...prev, newSmoke])

    // 2. Emit hot embers/sparks
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

    // Clean up smoke and sparks after animation finishes
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
        setWishOpened(true)
      }, 700)
    }
  }

  // Update embers gravity and motion
  useEffect(() => {
    if (embers.length === 0) return
    const interval = setInterval(() => {
      setEmbers(prev => 
        prev
          .map(e => ({
            ...e,
            x: e.x + e.vx,
            y: e.y + e.vy,
            vy: e.vy + 0.15 // gravity
          }))
          .filter(e => e.y < 300) // bounds check
      )
    }, 30)
    return () => clearInterval(interval)
  }, [embers])

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wishText.trim()) return
    setWishOpened(false)
    
    // Generate beautiful rising vector stars
    const starsList: StarParticle[] = []
    for (let i = 0; i < 45; i++) {
      starsList.push({
        id: starId.current++,
        x: 40 + Math.random() * 320,
        delay: `${Math.random() * 1.5}s`,
        drift: `${-150 + Math.random() * 300}px`,
        scale: Math.random() * 0.8 + 0.5
      })
    }
    setRisingStars(starsList)
    
    launchConfetti()
    onWishRevealed()

    setTimeout(() => {
      setRisingStars([])
    }, 4500)
  }

  return (
    <section className="section cake-section py-16">
      <div className="section-header text-center mb-8">
        <Sparkles size={28} className="inline text-red-500 animate-pulse mr-2" />
        <h2 className="section-title text-3xl font-extrabold tracking-widest text-white uppercase inline-block">MAKE A CELÈSTIAL WISH</h2>
        <p className="section-subtitle text-neutral-400 mt-2 tracking-wider font-sans">Tap each glowing candle flame to blow it out and launch your wish into the stardust canopy!</p>
      </div>

      <div className="cake-container glass-panel relative overflow-hidden mx-auto border border-neutral-800 rounded-2xl max-w-lg bg-neutral-950/80 p-8 shadow-2xl">
        {/* Glowing Vector Rising Stars */}
        {risingStars.map(star => (
          <span
            key={star.id}
            className="star-particle-gold"
            style={{
              left: `${star.x}px`,
              bottom: '50px',
              animationDelay: star.delay,
              // @ts-ignore
              '--drift': star.drift,
              transform: `scale(${star.scale})`
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" className="star-svg-glow fill-amber-300">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          </span>
        ))}

        {/* Smoke Emitter Overlay */}
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

        {/* Embers/Sparks Emitter Overlay */}
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
            {/* Elegant Background Glow */}
            <circle cx="200" cy="180" r="110" fill="radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 70%)" opacity="0.6" />

            {/* Premium Gold Stand */}
            <path d="M 100 240 L 300 240 L 280 260 L 120 260 Z" fill="url(#goldGrad)" className="filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
            <rect x="180" y="240" width="40" height="20" fill="url(#goldGrad)" />
            <ellipse cx="200" cy="240" rx="100" ry="10" fill="url(#goldGrad)" />

            {/* Red Velvet Base Layer with elegant 3D Gradients */}
            <rect x="120" y="165" width="160" height="75" rx="8" fill="url(#cakeRedGrad)" className="filter drop-shadow-md" />
            <ellipse cx="200" cy="165" rx="80" ry="10" fill="#E50914" opacity="0.8" />
            {/* Cream Piping Swirls Base */}
            <path d="M 120 230 C 130 240, 140 230, 150 240 C 160 230, 170 240, 180 230 C 190 240, 200 230, 210 240 C 220 230, 230 240, 240 230 C 250 240, 260 230, 270 240 C 280 230, 290 240, 280 230" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

            {/* Top Tier: Rose Gold & White Cream */}
            <rect x="142" y="105" width="116" height="60" rx="8" fill="url(#cakeRoseGrad)" />
            <ellipse cx="200" cy="105" rx="58" ry="8" fill="#FFF" opacity="0.9" />

            {/* Premium White Frosting Drips */}
            <path d="M 142 105 Q 152 125 162 105 Q 172 125 182 105 Q 192 125 202 105 Q 212 125 222 105 Q 232 125 242 105 Q 252 125 258 105 L 258 112 L 142 112 Z" fill="#FFF" opacity="0.95" />

            {/* Candles & Flickering Flames */}
            {[0, 1, 2].map(i => {
              const xPos = 160 + i * 40
              return (
                <g key={i} className="candle cursor-pointer group" onClick={() => handleCandleClick(i)}>
                  {/* Glowing wax drip lines */}
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

            {/* GRADIENT DEFINITIONS */}
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
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 animate-bounce">
              ✨ THE WISH HAS FLOWN INTO THE GALACTIC SPACE! ✨
            </span>
          ) : (
            <div className="flex items-center justify-center gap-2 text-neutral-400 uppercase tracking-widest text-xs font-bold">
              <Star size={16} className="animate-spin text-amber-400" />
              <span>Tap each candle flame to extinguish it</span>
            </div>
          )}
        </div>
      </div>

      {/* Wish Form Modal (Nebula Portal Redesign) */}
      <AnimatePresence>
        {wishOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop z-[999]"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="lightbox-content relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-10 max-w-md w-full shadow-2xl text-center"
              onClick={e => e.stopPropagation()}
            >
              {/* Spinning Space Nebula Core Background */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none rotating-space-portal" />

              <div className="relative z-10">
                <Sparkles size={36} className="mx-auto text-amber-300 animate-pulse mb-3" />
                <h3 className="section-title text-2xl font-extrabold uppercase tracking-widest text-amber-300">✨ THE CELESTIAL PORTAL ✨</h3>
                <p className="text-xs text-neutral-400 font-sans tracking-wide mt-2 mb-6">Your candles are extinguished. Type a secret dream below, and it will be sent straight to the stars.</p>
                
                <form onSubmit={handleWishSubmit}>
                  <textarea
                    className="form-textarea w-full h-32 mb-6 rounded-lg bg-neutral-900 border border-neutral-700 text-white p-4 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-sans"
                    placeholder="I wish for a year filled with..."
                    value={wishText}
                    onChange={e => setWishText(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="confetti-btn relative inline-flex mx-auto uppercase tracking-widest border border-amber-500/20 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 shadow-[0_4px_15px_rgba(245,158,11,0.25)]"
                    style={{ position: 'static' }}
                  >
                    SEND TO THE COSMOS 💫
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
  togglePlayback: () => void
  currentTrack: 'bday' | 'japanese'
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
            ? (currentTrack === 'bday' ? 'Happy Birthday 🎂' : 'Aoi Sangoshou 🌊') 
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
      <p className="footer-text uppercase tracking-widest">MADE WITH LOVE FOR {name}</p>
      <p className="footer-sub uppercase tracking-wider">HAVE A TRULY MAGNIFICENT BIRTHDAY CELEBRATION!</p>
    </footer>
  )
}

/* ──────────────  MAIN APP  ────────────── */
export default function App() {
  const [playing, setPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<'bday' | 'japanese'>('bday')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sequential Multi-track autoplay & play transition logic
  useEffect(() => {
    const audio = new Audio(currentTrack === 'bday' ? BDAY_SONG : JAPANESE_SONG)
    audio.loop = currentTrack === 'japanese'
    audioRef.current = audio

    if (playing) {
      audio.play().catch(e => console.log('Autoplay blocked:', e))
    }

    const handleEnded = () => {
      if (currentTrack === 'bday') {
        setCurrentTrack('japanese')
      }
    }

    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack])

  // Screen interaction trigger to start audio
  useEffect(() => {
    const playOnInteraction = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play()
          .then(() => {
            setPlaying(true)
            window.removeEventListener('click', playOnInteraction)
            window.removeEventListener('touchstart', playOnInteraction)
          })
          .catch(e => console.log('Interaction play blocked:', e))
      }
    }

    window.addEventListener('click', playOnInteraction)
    window.addEventListener('touchstart', playOnInteraction)

    return () => {
      window.removeEventListener('click', playOnInteraction)
      window.removeEventListener('touchstart', playOnInteraction)
    }
  }, [playing])

  const togglePlayback = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(err => console.log('Playback error:', err))
      setPlaying(true)
    }
  }

  // Launch initial confetti burst on load
  useEffect(() => {
    const timer = setTimeout(launchConfetti, 850)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      {/* High performance Canvas Trails */}
      <StardustCursorTrail />

      {/* Custom Particle Cosmic Background */}
      <CosmicStarfield />

      {/* Dynamic Header */}
      <header className="netflix-header">
        <div className="netflix-logo">{NAME}<span>FLIX</span></div>
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.9rem', fontWeight: 700 }} className="uppercase tracking-widest">
          <span style={{ color: '#E5E5E5', cursor: 'pointer' }}>HOME</span>
          <span style={{ color: '#A3A3A3', cursor: 'pointer' }}>SERIES</span>
          <span style={{ color: '#A3A3A3', cursor: 'pointer' }}>NEW & POPULAR</span>
        </div>
      </header>

      {/* Mini Music player widget */}
      <VinylPlayer playing={playing} togglePlayback={togglePlayback} currentTrack={currentTrack} />

      {/* Floating dynamic design elements */}
      <FloatingShape emoji="🎈" style={{ top: '15%', left: '3%' }} animation="float 6s ease-in-out infinite" />
      <FloatingShape emoji="✨" style={{ top: '25%', right: '5%' }} animation="float-reverse 5s ease-in-out infinite" />
      <FloatingShape emoji="🌸" style={{ top: '70%', left: '2%' }} animation="float 7s ease-in-out infinite 1s" />
      <FloatingShape emoji="💫" style={{ top: '88%', left: '5%' }} animation="float 6s ease-in-out infinite 2s" />

      {/* Main Netflix-style Sections */}
      <HeroBanner name={NAME} date={DATE} age={AGE} onPlayClick={() => {
        const el = document.getElementById('reels')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }} />
      
      {/* Row 1: Photos */}
      <PhotosRow />

      {/* Row 2: Videos */}
      <VideosRow />

      {/* Episodes List (Tailored Milestones) */}
      <EpisodesList />

      {/* Extinguish Candles Interaction */}
      <InteractiveCake onWishRevealed={launchConfetti} />

      <Footer name={NAME} />

      {/* Re-launch confetti button */}
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
