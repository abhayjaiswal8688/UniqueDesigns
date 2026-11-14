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

const farmGridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
// Cards
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

// Image-top card used by Fresh from Farm.
// Picture fills a fixed-height box; a placeholder shows if it fails to load.
const FarmProductCard = ({ img, alt, title, desc }) => {
  const [src, setSrc] = useState(img || null)

  return (
    <motion.div
      className="w-full overflow-hidden rounded-xl border border-green-600/60 shadow-lg transition-shadow duration-300 hover:shadow-green-900/50"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="relative h-56 w-full overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={() => setSrc(null)}
          />
        ) : (
          <FallbackArt label={alt} />
        )}
      </div>
      <div className="p-6">
        <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
        <hr className="my-2 border-t border-green-700/50" />
        <p className="text-gray-300">{desc}</p>
      </div>
    </motion.div>
  )
}

// Full-width banner used by Fresh from Farm
const CategoryBanner = ({ imageUrl, title }) => (
  <motion.div
    className="relative z-10 my-12 h-64 w-full bg-cover bg-center md:my-16 md:h-80"
    style={{ backgroundImage: `url(${imageUrl})` }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    <div className="absolute inset-0 bg-black/10" />
    <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
      <motion.h2
        className="text-center font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
    </div>
  </motion.div>
)

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
// Images expected in /public/images/FoodProductPage/:
//   puffed-rice.jpg, beetroot-chips.jpg, apple-chips.jpg, cucumber-chips.jpg, tamarind.jpg
// Spice images in /public/images/FreshFromFarm/Spices/:
//   Turmeric.jpg, Ginger.jpg, Garlic.jpg, Cumin.jpg
// Until a file exists, that card shows a placeholder in the picture box.
//------------------------------------------------------------------

const superfoods = [
  {
    name: 'Makhana (Lotus Seed)',
    dess: 'Raw & Flavoured',
    imageUrl: '/images/FoodProductPage/makhana.jpg',
    imageAlt: 'Makhana (Lotus Seed)',
    description:
      'Enjoy the subtle, nutty flavor and delightful crunch of our naturally grown organic lotus seeds, cultivated purely without chemicals. Available raw and in flavoured varieties, perfect as a wholesome roasted snack or added to soups and desserts for a unique texture.',
  },
  {
    name: 'Ragi (Finger Millet)',
    imageUrl: '/images/FoodProductPage/ragi.jpg',
    imageAlt: 'Ragi (Finger Millet)',
    description:
      'Boost your nutrition with our naturally grown organic finger millet (Ragi), cultivated purely without chemicals.',
  },
  {
    name: 'Puffed Rice',
    dess: 'Light & Crunchy',
    imageUrl: '/images/FoodProductPage/puffed-rice.jpg',
    imageAlt: 'Puffed Rice',
    description:
      'Light, crisp puffed rice, a popular ready-to-eat snack and the base for many traditional preparations. Hygienically processed and packed.',
  },
]

const spices = [
  {
    name: 'Turmeric',
    imageUrl: '/images/FreshFromFarm/Spices/Turmeric.jpg',
    imageAlt: 'Turmeric',
    description:
      'Brings bold flavor and aroma to kitchens. Available in powder and standard form.',
  },
  {
    name: 'Ginger',
    imageUrl: '/images/FreshFromFarm/Spices/Ginger.jpg',
    imageAlt: 'Ginger',
    description:
      'An authentic Indian spice, carefully processed and hygienically packed.',
  },
  {
    name: 'Garlic',
    imageUrl: '/images/FreshFromFarm/Spices/Garlic.jpg',
    imageAlt: 'Garlic',
    description:
      'Part of our rich array of spices delivered with the essence of tradition.',
  },
  {
    name: 'Cumin',
    imageUrl: '/images/FreshFromFarm/Spices/Cumin.jpg',
    imageAlt: 'Cumin',
    description:
      'A traditional spice that adds bold flavor to global kitchens.',
  },
  {
    name: 'Tamarind',
    imageUrl: '/images/FoodProductPage/tamarind.jpg',
    imageAlt: 'Tamarind',
    description:
      'Savor the rich, tangy flavor of our naturally grown organic tamarind, cultivated purely without any harmful chemicals.',
  },
]

const chips = [
  {
    name: 'Beetroot Chips',
    imageUrl: '/images/FoodProductPage/beetroot-chips.jpg',
    imageAlt: 'Beetroot Chips',
    description:
      'Crisp dehydrated beetroot slices with a naturally earthy sweetness, a wholesome ready-to-eat snack.',
  },
  {
    name: 'Apple Chips',
    imageUrl: '/images/FoodProductPage/apple-chips.jpg',
    imageAlt: 'Apple Chips',
    description:
      'Light, crunchy dehydrated apple slices that keep their natural fruit flavour.',
  },
  {
    name: 'Cucumber Chips',
    imageUrl: '/images/FoodProductPage/cucumber-chips.jpg',
    imageAlt: 'Cucumber Chips',
    description:
      'Refreshing, crunchy dehydrated cucumber slices, a light and healthy snack.',
  },
]

const fruitsProducts = [
  {
    img: '/images/FreshFromFarm/Fruits/Mango.jpg',
    alt: 'Mangoes',
    title: 'Mangoes',
    desc: 'Sweet, juicy, and packed with flavor. Sourced directly from our partner farms.',
  },
  {
    img: '/images/FreshFromFarm/Fruits/Banana.jpg',
    alt: 'Bananas',
    title: 'Bananas',
    desc: 'A rich source of potassium and essential nutrients, perfect for a healthy diet.',
  },
  {
    img: '/images/FreshFromFarm/Fruits/Papaya.jpg',
    alt: 'Papayas',
    title: 'Papayas',
    desc: 'A tropical delight known for its digestive benefits and rich vitamin content.',
  },
  {
    img: '/images/FreshFromFarm/Fruits/Guava.jpg',
    alt: 'Guavas',
    title: 'Guavas',
    desc: 'A crunchy, flavorful fruit loaded with more Vitamin C than an orange.',
  },
  {
    img: '/images/FreshFromFarm/Fruits/Pomegranate.jpg',
    alt: 'Pomegranates',
    title: 'Pomegranates',
    desc: 'Packed with ruby-red arils, known for their powerful antioxidant properties.',
  },
  {
    img: '/images/FreshFromFarm/Fruits/Lychee.jpg',
    alt: 'Lychees',
    title: 'Lychees',
    desc: 'A sweet, fragrant, and juicy tropical fruit, a perfect summer delicacy.',
  },
  {
    img: '/images/FreshFromFarm/Fruits/Amla.jpg',
    alt: 'Amla (Indian Gooseberry)',
    title: 'Amla (Indian Gooseberry)',
    desc: 'Rich in vitamin C and antioxidants for immunity and overall wellness.',
  },
  {
    img: '/images/FreshFromFarm/Fruits/Jackfruit.jpg',
    alt: 'Jackfruit',
    title: 'Jackfruit',
    desc: 'Sustainably sourced Jackfruits from our network of dedicated farmers.',
  },
]

const vegetablesProducts = [
  {
    img: '/images/FreshFromFarm/Vegetables/Tomato.webp',
    alt: 'Tomatoes',
    title: 'Tomatoes',
    desc: 'Red and versatile, a staple for any kitchen. Sourced for peak quality.',
  },
  {
    img: '/images/FreshFromFarm/Vegetables/Potato.webp',
    alt: 'Potatoes',
    title: 'Potatoes',
    desc: 'High-quality, all-purpose potatoes perfect for a wide variety of dishes.',
  },
  {
    img: '/images/FreshFromFarm/Vegetables/Onion.webp',
    alt: 'Onions',
    title: 'Onions',
    desc: 'The essential aromatic base for countless recipes, delivered from the farm.',
  },
  {
    img: '/images/FreshFromFarm/Vegetables/Cauliflower.webp',
    alt: 'Cauliflower',
    title: 'Cauliflower',
    desc: 'A versatile and nutrient-dense vegetable, great for roasting, steaming, or ricing.',
  },
  {
    img: '/images/FreshFromFarm/Vegetables/Brinjal.webp',
    alt: 'Brinjal (Eggplant)',
    title: 'Brinjal (Eggplant)',
    desc: 'Perfect for curries, grilling, and roasting, with a rich, creamy texture.',
  },
  {
    img: '/images/FreshFromFarm/Vegetables/Okra.webp',
    alt: 'Okra (Ladyfinger)',
    title: 'Okra (Ladyfinger)',
    desc: 'A popular vegetable, tender and flavorful, sourced from our trusted farmers.',
  },
]

//------------------------------------------------------------------
// The Main Page Component
//------------------------------------------------------------------

export function NaturalProductPage() {
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
        <source src="/videos/natural_product.mp4" type="video/mp4" />
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
              <AnimatedLetters text="Nature's Purity" />
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
            Explore our collection of carefully crafted and collected natural and organic products.
          </motion.p>
        </motion.div>

        <ProductSection title="Superfoods" products={superfoods} />
        <ProductSection title="Spices" products={spices} />
        <ProductSection title="Dehydrated Chips" products={chips} />

        <p className="mt-10 text-center text-gray-300 md:text-lg">
          …and many more varieties.{' '}
          <Link
            to="/ContactUs"
            className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
          >
            Contact our team
          </Link>{' '}
          for the full range.
        </p>

        {/* --- Fresh from Farm: heading + fruits --- */}
        <h2 className="mb-6 mt-20 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Fresh from Farm
        </h2>
        <hr className="mx-auto mb-10 w-1/6 border-t-2 border-green-500/80" />
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-300 md:text-xl">
          Explore our premium collection of farm-fresh fruits and vegetables, sourced directly from small farmers.
        </p>

        <div className="mb-12 text-center md:mb-16">
          <h3 className="inline-block border-b-2 border-green-500/80 pb-4 text-3xl font-bold text-white sm:text-4xl">
            Fresh Fruits
          </h3>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={farmGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {fruitsProducts.map((product) => (
            <FarmProductCard key={product.title} {...product} />
          ))}
        </motion.div>
      </main>

      {/* --- Fresh from Farm: full-width banner + vegetables --- */}
      <CategoryBanner
        imageUrl="/images/FreshFromFarm/Banners/VegetableBanner1.webp"
        title="Vibrant & Farm-Fresh Vegetables"
      />

      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center md:mb-16">
            <h3 className="inline-block border-b-2 border-green-500/80 pb-4 text-3xl font-bold text-white sm:text-4xl">
              Farm Vegetables
            </h3>
          </div>
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={farmGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {vegetablesProducts.map((product) => (
              <FarmProductCard key={product.title} {...product} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}