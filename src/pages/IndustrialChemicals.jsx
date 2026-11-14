import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

//------------------------------------------------------------------
// Animation Variants & AnimatedLetters (same as the other product pages)
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif tracking-tight animate-stream-text-green">
              <AnimatedLetters text="Industrial Chemicals" />
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

        {/* --- Product list --- */}
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