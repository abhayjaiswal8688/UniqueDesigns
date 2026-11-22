import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

//------------------------------------------------------------------
// Animation Variants & AnimatedLetters
//------------------------------------------------------------------

const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const taglineHeaderVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const AnimatedLetters = ({ text, className }) => {
  const lineVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 30, willChange: 'transform, opacity' },
    visible: {
      opacity: 1,
      y: 0,
      willChange: 'auto',
      transition: { type: 'spring', damping: 15, stiffness: 80, duration: 0.7 },
    },
  }

  return (
    <motion.span className={`block ${className}`} variants={lineVariants}>
      {text.split('').map((char, index) => (
        <motion.span
          key={char + '-' + index}
          variants={letterVariants}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

//------------------------------------------------------------------
// Product Card Helpers (for Insecticides & Pesticides)
//------------------------------------------------------------------

function FallbackArt({ label }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-green-800 via-green-900 to-black"
    >
      <svg
        viewBox="0 0 64 64"
        className="h-16 w-16 text-green-400/40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M32 56V30" />
        <path d="M32 34C32 22 24 14 10 14c0 12 8 20 22 20z" />
        <path d="M32 28c0-10 7-17 20-17 0 11-7 17-20 17z" />
      </svg>
      <span className="text-sm text-green-200/50">Photo coming soon</span>
    </div>
  )
}

function useWhiteTrim(src, manualZoom) {
  const [fit, setFit] = useState(null)

  useEffect(() => {
    setFit(null)
    if (!src) return
    if (manualZoom) {
      setFit({ scale: manualZoom, origin: '50% 50%' })
      return
    }

    let cancelled = false
    const probe = new Image()
    probe.crossOrigin = 'anonymous'
    probe.onload = () => {
      try {
        const W = 100
        const H = Math.max(10, Math.round((probe.naturalHeight / probe.naturalWidth) * W))
        const canvas = document.createElement('canvas')
        canvas.width = W
        canvas.height = H
        const ctx = canvas.getContext('2d')
        ctx.drawImage(probe, 0, 0, W, H)
        const d = ctx.getImageData(0, 0, W, H).data

        const white = (x, y) => {
          const i = (y * W + x) * 4
          return d[i + 3] < 20 || (d[i] > 235 && d[i + 1] > 235 && d[i + 2] > 235)
        }
        const rowWhite = (y) => {
          let n = 0
          for (let x = 0; x < W; x++) if (white(x, y)) n++
          return n / W >= 0.985
        }
        const colWhite = (x) => {
          let n = 0
          for (let y = 0; y < H; y++) if (white(x, y)) n++
          return n / H >= 0.985
        }

        let t = 0
        while (t < H && rowWhite(t)) t++
        let b = 0
        while (b < H - t && rowWhite(H - 1 - b)) b++
        let l = 0
        while (l < W && colWhite(l)) l++
        let r = 0
        while (r < W - l && colWhite(W - 1 - r)) r++

        const ty = t / H, by = b / H, lx = l / W, rx = r / W
        const cy = 1 - ty - by
        const cx = 1 - lx - rx
        if (cy < 0.3 || cx < 0.3) return

        const scale = Math.min(1.8, Math.max(1 / cy, 1 / cx))
        if (scale < 1.06 || cancelled) return

        const oy = ty + by > 0 ? ty / (ty + by) : 0.5
        const ox = lx + rx > 0 ? lx / (lx + rx) : 0.5
        setFit({ scale, origin: `${ox * 100}% ${oy * 100}%` })
      } catch {
        /* pixels not readable (CORS): leave the picture as is */
      }
    }
    probe.src = src

    return () => {
      cancelled = true
    }
  }, [src, manualZoom])

  return fit
}

function ProductCard({ product }) {
  const { name, description, dess, imageUrl, imageAlt, fallbackUrl, zoom } = product

  const [src, setSrc] = useState(imageUrl || null)
  const [triedFallback, setTriedFallback] = useState(false)
  const fit = useWhiteTrim(src, zoom)

  const handleError = () => {
    if (fallbackUrl && !triedFallback) {
      setTriedFallback(true)
      setSrc(fallbackUrl)
    } else {
      setSrc(null)
    }
  }

  return (
    <motion.article
      className="flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-green-600/60 shadow-lg transition-shadow duration-300 hover:shadow-green-900/50 md:flex-row"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="relative h-56 w-full flex-shrink-0 overflow-hidden md:h-auto md:min-h-[16rem] md:w-2/5">
        {src ? (
          <img
            src={src}
            alt={imageAlt || name}
            className="absolute inset-0 h-full w-full object-cover"
            style={fit ? { transform: `scale(${fit.scale})`, transformOrigin: fit.origin } : undefined}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={handleError}
          />
        ) : (
          <FallbackArt label={imageAlt || name} />
        )}
      </div>

      <div className="flex w-full flex-col p-6 md:p-8">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        {dess && <p className="mb-2 text-xl font-semibold text-white">{dess}</p>}
        <hr className="my-4 border-t border-green-700/50" />
        <p className="flex-grow leading-relaxed text-gray-300">{description}</p>
      </div>
    </motion.article>
  )
}

//------------------------------------------------------------------
// Data
//------------------------------------------------------------------

const intro = [
  'At Unique Designs, we bring India’s chemical manufacturing capabilities closer to global markets. Our portfolio encompasses a carefully selected range of industrial chemicals, specialty raw materials and agrochemicals, catering to the diverse requirements of international industries and agricultural markets.',
  'Working in coordination with established Indian manufacturers, we focus on sourcing products that meet defined quality specifications, industry requirements and buyer expectations. From product selection and quality coordination to export documentation, packaging and shipment arrangements, we work to make international procurement straightforward, transparent and dependable.',
  'Our objective is to build lasting global partnerships by combining India’s manufacturing strengths with competitive sourcing, responsive business support and a commitment to consistent supply.',
]

const chemicals = [
  'Carbon Black',
  'Soda Ash',
  'Caustic Soda Flake',
  'Barytes',
  'Calcium Carbonate',
  'Silicon Dioxide',
]

const insecticidesPesticides = [
  {
    name: 'Glyphosate',
    imageUrl: '/images/Fertilizers/Glyphosate.jpg',
    description:
      'Broad-spectrum, non-selective herbicide for post-emergence weed control.',
  },
  {
    name: 'Atrazine',
    imageUrl: '/images/Fertilizers/Atrazine.jpg',
    description:
      'Selective herbicide for control of broadleaf and grassy weeds in crops such as maize and sugarcane.',
  },
  {
    name: 'Pretilachlor & Butachlor',
    imageUrl: '/images/Fertilizers/PretilachlorButachlor.jpg',
    description:
      'Pre-emergence herbicides widely used for weed control in transplanted rice.',
  },
  {
    name: 'Lambda-cyhalothrin & Cypermethrin',
    imageUrl: '/images/Fertilizers/Pyrethroids.jpg',
    description:
      'Synthetic pyrethroid insecticides for control of a wide range of crop pests.',
  },
]

//------------------------------------------------------------------
// The Main Page Component
//------------------------------------------------------------------

export function IndustrialChemicals() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* --- Background Video --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed left-0 top-0 h-full w-full object-cover z-[-10]"
      >
        <source src="/videos/chemical.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- Dark Overlay --- */}
      <div className="fixed left-0 top-0 h-full w-full bg-black/80 z-[-5]" />

      {/* --- Page Content --- */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* --- Animated Header Section --- */}
        <motion.div
          className="text-center pt-20"
          variants={headerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={taglineHeaderVariants} className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif tracking-tight animate-stream-text-green uppercase">
              <AnimatedLetters text="INDUSTRIAL CHEMICALS" />
            </h1>
          </motion.div>

          <motion.hr
            className="w-1/4 mx-auto mb-10 border-t-2 border-green-500/80"
            variants={itemVariants}
          />
        </motion.div>

        {/* --- Introduction --- */}
        <motion.div
          className="mx-auto mb-12 max-w-4xl space-y-4 rounded-xl border border-green-600/60 bg-black/50 p-6 text-base leading-relaxed text-gray-300 shadow-lg backdrop-blur-sm text-justify md:p-10 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </motion.div>

        {/* --- Industrial Chemicals Product List --- */}
        <h2 className="mb-6 mt-9 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Our Product Range
        </h2>
        <hr className="w-1/6 mx-auto mb-10 border-t-2 border-green-500/80" />

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {chemicals.map((name) => (
            <motion.article
              key={name}
              className="flex items-center justify-center rounded-xl border border-green-600/60 p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-green-900/50"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3 className="text-2xl font-bold text-white">{name}</h3>
            </motion.article>
          ))}
        </motion.div>

        {/* --- Insecticides & Pesticides (Moved from Fertilizers / Agrochemicals) --- */}
        <h2 className="mb-6 mt-16 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Insecticides &amp; Pesticides
        </h2>
        <hr className="w-1/6 mx-auto mb-10 border-t-2 border-green-500/80" />

        <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {insecticidesPesticides.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </motion.div>

        {/* --- Expanding soon --- */}
        <div className="mt-14 text-center">
          <p className="mb-6 text-lg text-gray-300 md:text-xl">
            Our range is expanding soon. Kindly contact our team for more.
          </p>
          <Link
            to="/ContactUs"
            className="inline-block rounded-full bg-orange-500 px-8 py-3 text-lg font-bold text-white transition duration-300 hover:bg-orange-600"
          >
            Contact Our Team
          </Link>
        </div>
      </main>
    </div>
  )
}