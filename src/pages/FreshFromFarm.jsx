import React from 'react'
import { motion } from 'framer-motion'

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
    alt: 'Jackfruit Products',
    title: 'Jackfruit Products',
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const taglineHeaderVariants = {
  hidden: {
  },
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

const AnimatedLetters = ({ text, className }) => {
  const lineVariants = {
    hidden: {
    },
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      willChange: 'transform, opacity',
    },
    visible: {
      opacity: 1,
      y: 0,
      willChange: 'auto',
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 80,
        duration: 0.7,
      },
    },
  }

  return (
    <motion.span
      className={`block ${className}`}
      variants={lineVariants}
    >
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

const ProductCard = ({ img, alt, title, desc }) => (
  <motion.div
    className="w-full rounded-xl shadow-lg overflow-hidden border border-green-600/60 transition-shadow duration-300 hover:shadow-green-900/50"
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <img
      src={img}
      alt={alt}
      className="w-full h-56 object-cover"
    />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <hr className="my-2 border-t border-green-700/50" />
      <p className="text-gray-300">{desc}</p>
    </div>
  </motion.div>
)

const CategoryBanner = ({ imageUrl, title }) => (
  <motion.div
    className="relative z-10 w-full h-64 md:h-80 my-12 md:my-16 bg-cover bg-center"
    style={{ backgroundImage: `url(${imageUrl})` }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    <div className="absolute inset-0 bg-black/10" />
    <div className="relative z-10 h-full flex items-center justify-center overflow-hidden">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center font-serif tracking-tight"
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

export function FreshFromFarm() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          src="/videos/bg-video1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto pt-28 pb-12 md:pt-40 md:pb-16 px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={taglineHeaderVariants}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif tracking-tight animate-stream-text-green">
            <AnimatedLetters text="Fresh From the Farm" />
          </h1>
        </motion.div>

        <motion.hr
          className="w-1/4 mx-auto mb-10 border-t-2 border-green-500/80"
          variants={itemVariants}
        />

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Explore our premium collection of farm-fresh produce, organic
          powders, spices, and agri-goods, sourced directly from small
          farmers.
        </motion.p>
      </motion.div>

      <div className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-green-500/80 pb-4">
              Fresh Fruits
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {fruitsProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </motion.div>
        </div>
      </div>

      <CategoryBanner
        imageUrl="/images/FreshFromFarm/Banners/VegetableBanner1.webp"
        title="Vibrant & Farm-Fresh Vegetables"
      />

      <div className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-green-500/80 pb-4">
              Farm Vegetables
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {vegetablesProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}