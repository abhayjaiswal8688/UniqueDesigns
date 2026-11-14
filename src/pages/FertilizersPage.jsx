import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

//------------------------------------------------------------------
// Animation Variants & AnimatedLetters
//------------------------------------------------------------------

const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const taglineHeaderVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const AnimatedLetters = ({ text, className }) => {
  const lineVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
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
// Product card
// - Picture fills the whole box (object-cover); white borders baked into
//   a source picture are trimmed automatically (or set `zoom` by hand).
// - No picture / failed load = placeholder in the same box.
//------------------------------------------------------------------

// Shown when a product has no picture yet (or its file is missing).
// Fills the same box a photo would, so every card keeps the same layout.
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

// Some source pictures have white bands baked in (top/bottom or sides).
// This reads the picture, finds those bands and zooms in to hide them.
// If the browser blocks reading the pixels, nothing changes. In that case
// set `zoom: 1.3` (or similar) on the product to do it by hand.
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

  // 1st failure: try fallbackUrl (if any). 2nd failure: show the placeholder.
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
      {/* Picture fills the whole box. */}
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

function ProductSection({ title, products }) {
  return (
    <>
      <h2 className="mb-6 mt-9 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      <hr className="mx-auto mb-10 w-1/6 border-t-2 border-green-500/80" />
      <motion.div
        className="flex flex-wrap justify-center gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </motion.div>
    </>
  )
}

//------------------------------------------------------------------
// Product data
// A product whose image file is missing shows a placeholder in the picture box.
// To add a picture later, add: imageUrl: '/images/Fertilizers/<file>.jpg'
//------------------------------------------------------------------

const tbn = (id) => `https://encrypted-tbn0.gstatic.com/images?q=tbn:${id}`

const mineralFertilizers = [
  {
    name: 'Ammonium Sulphate (Crystalline)',
    dess: '21% N, 24% S',
    imageUrl: tbn('ANd9GcS7HwGgkvdMQokYDRxeBhAZWR8i2jgXIioSH4BMdMPu4g&s=10'),
    zoom: 1.3, // hides the white bands baked into this photo
    imageAlt: 'Ammonium Sulphate (Crystalline)',
    description:
      'High-quality white crystalline Ammonium Sulphate containing 21% Nitrogen (N) and 24% Sulphur (S), supplied in fertilizer grade with consistent specifications to support balanced crop nutrition and healthy plant growth. Suitable for a wide range of agricultural applications and international markets.',
  },
  {
    name: 'SOP – Sulphate of Potash (Powder)',
    dess: '50% K₂O, 17.5% S',
    imageUrl: tbn('ANd9GcT85sxC_EK5rQZZerrhsI7XeJThxGwuvf1d3aryIvvXWA&s=10'),
    imageAlt: 'Sulphate of Potash (Powder)',
    description:
      'High-quality water-soluble Sulphate of Potash (SOP) containing 50% Potassium Oxide (K₂O) and 17.5% Sulphur (S), providing essential potassium and sulphur for balanced crop nutrition. A chloride-free potassium fertilizer, ideal for fruits, vegetables and other chloride-sensitive crops.',
  },
  {
    name: 'MOP – Muriate of Potash',
    dess: '60% K₂O',
    imageUrl: tbn('ANd9GcRQedAG40w57-CiYyBKc32S1rgh48YfDcuL2VXPADY7tg&s=10'),
    imageAlt: 'Muriate of Potash',
    description:
      'High-quality Muriate of Potash (MOP) containing 60% Potassium Oxide (K₂O), providing an essential source of potassium to support plant growth, improve crop quality and enhance overall nutrient balance. Suitable for a wide range of agricultural crops and soil conditions.',
  },
  {
    name: 'DAP – Di-Ammonium Phosphate',
    dess: '18% N, 46% P₂O₅',
    imageUrl: tbn('ANd9GcRPLB3faOpBd_ZVpGFIGaYtR2n_J5Jirbg6tLG_hvED-w&s=10'),
    imageAlt: 'Di-Ammonium Phosphate',
    description:
      'High-quality Di-Ammonium Phosphate (DAP) containing 18% Nitrogen (N) and 46% Phosphate (P₂O₅), delivering essential nutrients for strong root development, early plant growth and improved crop establishment. Widely used as a basal fertilizer across a variety of agricultural crops.',
  },
  {
    name: 'MKP – Mono Potassium Phosphate',
    dess: '00-52-34',
    imageUrl: tbn('ANd9GcQbu6SC7LgVD20jceupf80mIKqX_BUraCRoBztxdKXkCA&s=10'),
    imageAlt: 'Mono Potassium Phosphate',
    description:
      'Fully water-soluble fertilizer containing 52% Phosphate (P₂O₅) and 34% Potassium (K₂O), supporting strong root development, flowering and fruit quality. Ideal for fertigation and foliar application.',
  },
]

const otherFertilizers = [
  {
    name: 'Magnesium Sulphate',
    dess: '9.6% Mg, 13% S',
    imageUrl: tbn('ANd9GcSLAUeIHV2RIlBHrMYySxg98gCSap4xG9vISdQ6rovCgQ&s=10'),
    imageAlt: 'Magnesium Sulphate',
    description:
      'Magnesium Sulphate containing 9.6% Magnesium (Mg) and 13% Sulphur (S), supporting chlorophyll formation, photosynthesis and balanced crop nutrition. Suitable for fruits, vegetables and other agricultural crops.',
  },
  {
    name: 'Zinc Sulphate Monohydrate',
    dess: '33% Zn',
    imageUrl: tbn('ANd9GcTpzWnzlUYiBisj37Yz2idpXLiSyhTDI6w22pIUw4RIOQ&s=10'),
    imageAlt: 'Zinc Sulphate Monohydrate',
    description:
      'High-quality Zinc Sulphate Monohydrate containing 33% Zinc (Zn), providing an essential micronutrient for enzyme activity, plant growth and improved crop development. Suitable for a wide range of agricultural applications.',
  },
  {
    name: 'Ferrous Sulphate (Iron Sulphate)',
    dess: '19–20% Fe',
    // The link in the PDF was cut short, so it can never load. Add a photo here:
    imageUrl: '/images/Fertilizers/FerrousSulphate.jpg',
    imageAlt: 'Ferrous Sulphate (Iron Sulphate)',
    description:
      'Ferrous Sulphate containing 19–20% Iron (Fe), providing an essential micronutrient that supports chlorophyll formation, prevents iron deficiency and promotes healthy plant growth. Suitable for various agricultural applications.',
  },
  {
    name: 'Calcium Sulphate (Gypsum)',
    dess: '~23% Ca, 18% S',
    imageUrl: tbn('ANd9GcT3oIjpRfbSKtJl2sv0wQDAxQ7Dgoy9FRXOfjCVGiyfQw&s=10'),
    imageAlt: 'Calcium Sulphate (Gypsum)',
    description:
      'Calcium Sulphate containing approximately 23% Calcium (Ca) and 18% Sulphur (S), supporting soil conditioning, root development and balanced crop nutrition. Suitable for a wide range of agricultural applications.',
  },
  {
    name: 'EDTA Chelated Micronutrients',
    imageUrl: '/images/Fertilizers/EDTA.jpg',
    dess: 'Fe, Zn, Mn, Cu',
    description:
      'Premium-quality EDTA-chelated micronutrients, including Fe-EDTA, Zn-EDTA, Mn-EDTA and Cu-EDTA, designed to improve nutrient availability and support efficient plant absorption. These highly water-soluble formulations help prevent micronutrient deficiencies, promote chlorophyll formation and support healthy plant growth. Suitable for foliar application, fertigation and precision agriculture.',
  },
]

const npkBlends = [
  {
    name: 'NPK 19-19-19',
    dess: 'Water-soluble',
    imageUrl: tbn('ANd9GcQ9XJHVntVLpp1Z3nFuJicclCA_-nOMMBsyHkXjP51H1A&s=10'),
    imageAlt: 'NPK 19-19-19',
    description:
      'Fully water-soluble fertilizer containing 19% Nitrogen, 19% Phosphate (P₂O₅) and 19% Potassium (K₂O), providing balanced nutrition for healthy plant growth, strong roots and improved crop development. Suitable for foliar spray and fertigation.',
  },
  {
    name: 'NPK 15-15-15',
    dess: 'Balanced compound',
    imageUrl: tbn('ANd9GcQMMqe6aVz1m17Vz75yZuPq5r0PH_lCPriGZXpmuaLYkw&s=10'),
    imageAlt: 'NPK 15-15-15',
    description:
      'Balanced compound fertilizer containing 15% Nitrogen (N), 15% Phosphate (P₂O₅) and 15% Potassium (K₂O), supporting healthy plant growth, strong root development and improved crop performance. Suitable for a wide range of agricultural crops.',
  },
  {
    name: 'NPK 10-26-26',
    dess: 'Balanced compound',
    imageUrl: tbn('ANd9GcRHLvLaLyp-O332ZJQHvp5f4iA3fkxDVn6P0WVagev9AQ&s'),
    imageAlt: 'NPK 10-26-26',
    description:
      'Balanced compound fertilizer containing 10% Nitrogen (N), 26% Phosphate (P₂O₅) and 26% Potassium (K₂O), supporting root development, flowering, fruit formation and overall crop performance. Suitable for a wide range of agricultural crops.',
  },
  {
    name: 'Custom NPK Blends',
    imageUrl: '/images/Fertilizers/CustomNPK.jpg',
    dess: 'Made to your specification',
    description:
      'Customized NPK fertilizer formulations with tailored Nitrogen (N), Phosphate (P₂O₅) and Potassium (K₂O) ratios to meet specific crop, soil and agricultural requirements. Available in different grades to support balanced crop nutrition and productivity.',
  },
]

const biostimulants = [
  {
    name: 'Humic Acid',
    imageUrl: tbn('ANd9GcRRQTGUHfdy_ROvJ7ehaVmdLToOPcujGQVwZofDemNYpA&s=10'),
    imageAlt: 'Humic Acid',
    description:
      'High-quality Humic Acid that improves soil structure, enhances nutrient availability and supports root development. Helps improve soil fertility and promotes healthy, vigorous plant growth. Suitable for a wide range of crops.',
  },
  {
    name: 'Fulvic Acid',
    imageUrl: tbn('ANd9GcQb3u0ct3OZJSkJPnfRN_c2GUKRkIkvDyYy7bdtEQSN0w&s=10'),
    imageAlt: 'Fulvic Acid',
    description:
      'High-quality Fulvic Acid that enhances nutrient uptake, improves nutrient mobility and supports efficient plant absorption. Promotes healthy root development and overall crop growth, suitable for foliar application and fertigation.',
  },
  {
    name: 'Seaweed Extract',
    imageUrl: tbn('ANd9GcR0VzWggaB4ZEvAmRU9oeSgHOQcHrX27hZjoJ-23zxi8w&s'),
    imageAlt: 'Seaweed Extract',
    description:
      'Natural plant-based biostimulant rich in bioactive compounds that supports root development, improves nutrient uptake and enhances plant growth. Helps improve crop vigour and tolerance to environmental stress. Suitable for foliar application and fertigation.',
  },
  {
    name: 'Potassium Humate (Flakes)',
    imageUrl: tbn('ANd9GcSlJM9Bc39BU7auGnfmUb0pCUpweRSOsQrvpP2aeoZRxA&s=10'),
    imageAlt: 'Potassium Humate (Flakes)',
    description:
      'High-quality Potassium Humate flakes containing humic acid and soluble potassium (K₂O), designed to improve soil structure, enhance nutrient availability and promote strong root development. Suitable for soil application and fertigation.',
  },
  {
    name: 'Humic Fulvic Amino Complex',
    imageUrl: '/images/Fertilizers/HumicFulvicAmino.jpg',
    fallbackUrl: tbn('ANd9GcRRQTGUHfdy_ROvJ7ehaVmdLToOPcujGQVwZofDemNYpA&s=10'), // same as Humic Acid until its own photo is added
    description:
      'Advanced biostimulant combining Humic Acid, Fulvic Acid and Amino Acids to enhance nutrient absorption, stimulate root development and improve soil fertility. Supports healthy plant growth and overall crop performance.',
  },
  {
    name: 'Seaweed Extract + Amino Acids',
    imageUrl: '/images/Fertilizers/SeaweedAmino.jpg',
    fallbackUrl: tbn('ANd9GcR0VzWggaB4ZEvAmRU9oeSgHOQcHrX27hZjoJ-23zxi8w&s'), // same as Seaweed Extract until its own photo is added
    description:
      'Advanced plant biostimulant combining Seaweed Extract and Amino Acids to promote root development, enhance nutrient uptake and support healthy plant growth. Helps improve crop vigour and tolerance to environmental stress.',
  },
]

const organicManure = [
  {
    name: 'Vermicompost',
    imageUrl: tbn('ANd9GcQiH9lnaOs6LtQIsg9yB7R3_PVZmAaaSVmhP8B6L1Fmlg&s=10'),
    fallbackUrl: '/images/Manures/earthworm.jpg',
    imageAlt: 'Vermicompost',
    description:
      'Nutrient-rich organic manure produced through earthworm composting, enriched with organic matter and beneficial microorganisms. Improves soil structure, enhances nutrient availability and supports healthy plant growth.',
  },
  {
    name: 'Neem Cake',
    imageUrl: tbn('ANd9GcR-R3b2xNiSdPDo2mxeXRwH5aSQEwtc8c-yvcHJZDoKyg&s=10'),
    imageAlt: 'Neem Cake',
    description:
      'Natural organic soil amendment derived from neem seeds, rich in organic matter and plant nutrients. Helps improve soil fertility, supports root health and contributes to balanced crop nutrition.',
  },
]

// Photos go in /public/images/Fertilizers/ (placeholder shows until they exist).
const pesticidesHerbicides = [
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

export function FertilizersPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* --- Background Video --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed left-0 top-0 z-[-10] h-full w-full object-cover"
      >
        <source src="/videos/manure.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- Dark Overlay --- */}
      <div className="fixed left-0 top-0 z-[-5] h-full w-full bg-black/80" />

      {/* --- Page Content --- */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
        <motion.div
          className="pt-20 text-center"
          variants={headerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={taglineHeaderVariants} className="mb-6">
            <h1 className="animate-stream-text-green mb-6 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              <AnimatedLetters text="Fertilizers & Agrochemicals" />
            </h1>
          </motion.div>

          <motion.hr
            className="mx-auto mb-10 w-1/4 border-t-2 border-green-500/80"
            variants={itemVariants}
          />

          <motion.p
            className="mb-12 text-center text-lg text-gray-300 md:text-xl"
            variants={itemVariants}
          >
            Quality fertilizers, micronutrients, biostimulants and organic manures for healthy crops and productive soil.
          </motion.p>
        </motion.div>

        <ProductSection title="Mineral Fertilizers" products={mineralFertilizers} />
        <ProductSection title="Other Fertilizers and Micronutrients" products={otherFertilizers} />
        <ProductSection title="NPK Blends" products={npkBlends} />
        <ProductSection title="Biostimulants" products={biostimulants} />
        <ProductSection title="Organic Manure" products={organicManure} />
        <ProductSection title="Pesticides & Herbicides" products={pesticidesHerbicides} />

        <p className="mt-10 text-center text-gray-300 md:text-lg">
          Need something else?{' '}
          <Link
            to="/ContactUs"
            className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
          >
            Contact our team
          </Link>{' '}
          for more.
        </p>
      </main>
    </div>
  )
}