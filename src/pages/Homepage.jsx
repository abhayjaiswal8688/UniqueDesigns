import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import CountUp from 'react-countup'
import { motion } from 'framer-motion'

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

const taglineHeaderVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
}

const AnimatedLine = ({ text, className = '' }) => {
  const lineVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.035, delayChildren: 0.08 },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 24, willChange: 'transform, opacity' },
    visible: {
      opacity: 1,
      y: 0,
      willChange: 'auto',
      transition: { type: 'spring', damping: 16, stiffness: 90, duration: 0.6 },
    },
  }

  return (
    <motion.span className={`block ${className}`} variants={lineVariants}>
      {text.split(' ').map((word, wIdx, arr) => (
        <span key={word + '-' + wIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((char, cIdx) => (
            <motion.span
              key={char + '-' + cIdx}
              variants={letterVariants}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
          {wIdx < arr.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </motion.span>
  )
}

// Styles for Swiper & Continuous Credentials Carousel
const customStyles = `
  .featured-products-slider { padding-left: 12px; padding-right: 12px; }
  .featured-products-slider .swiper-pagination { position: relative !important; bottom: auto !important; margin-top: 24px !important; }
  .featured-products-slider .swiper-pagination-bullet { background-color: #ffffff; opacity: 0.4; }
  .featured-products-slider .swiper-pagination-bullet-active { background-color: #f97316; opacity: 1; }

  @keyframes credentials-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .credentials-marquee-track {
    display: flex;
    width: max-content;
    animation: credentials-marquee 34s linear infinite;
  }

  .credentials-marquee-wrapper:hover .credentials-marquee-track {
    animation-play-state: paused;
  }

  .credentials-edge-fade {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
  }
`

const tbn = (id) => `https://encrypted-tbn0.gstatic.com/images?q=tbn:${id}`

// Balanced multi-sector hero slideshow
const slideImages = [
  {
    url: tbn('ANd9GcRPLB3faOpBd_ZVpGFIGaYtR2n_J5Jirbg6tLG_hvED-w&s=10'),
    alt: 'DAP and Granular Fertilizers',
    badge: 'Fertilizers & Nutrients',
  },
  {
    url: '/images/Homepage/SlideShow/Spices.webp',
    alt: 'Indian Spices & Agricultural Commodities',
    badge: 'Agricultural Commodities',
  },
  {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ferrous_sulfate.jpg?width=800',
    fallback: '/images/Fertilizers/FerrousSulphate.jpg',
    alt: 'Micronutrients & Industrial Chemicals',
    badge: 'Micronutrients & Chemicals',
  },
  {
    url: '/images/Homepage/SlideShow/Makhana.webp',
    alt: 'Makhana & Processed Food Products',
    badge: 'Food Products',
  },
  {
    url: tbn('ANd9GcT85sxC_EK5rQZZerrhsI7XeJThxGwuvf1d3aryIvvXWA&s=10'),
    alt: 'Water-Soluble & Speciality Fertilizers',
    badge: 'Speciality Fertilizers',
  },
]

// 5 Core Business Verticals
const businessVerticals = [
  {
     code: 'A',
    title: 'Industrial Chemicals',
    link: '/IndustrialChemicals',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kaliumdihydrogenphosphat.jpg?width=800',
    fallback: '/images/Fertilizers/FerrousSulphate.jpg',
    items: [
      'Barytes',
      'Carbon Black',
      'Other Industrial Chemical Requirements',
    ],
    spanClass: 'lg:col-span-2',
  },
  {
    code: 'B',
    title: 'Fertilizers & Agricultural Nutrients',
    link: '/Fertilizers',
    image: tbn('ANd9GcRPLB3faOpBd_ZVpGFIGaYtR2n_J5Jirbg6tLG_hvED-w&s=10'),
    fallback: '/images/Homepage/FeaturedProducts/Vermicompost.webp',
    items: [
      'Ammonium Sulphate',
      'MOP & SOP',
      'NPK Fertilizers and Customized Grades',
      'Water-Soluble Fertilizers',
      'Speciality Fertilizers',
    ],
    spanClass: 'lg:col-span-2',
  },
  {
    code: 'C',
    title: 'Micronutrients & Biostimulants',
    link: '/Fertilizers',
    image: tbn('ANd9GcRRQTGUHfdy_ROvJ7ehaVmdLToOPcujGQVwZofDemNYpA&s=10'),
    fallback: tbn('ANd9GcTpzWnzlUYiBisj37Yz2idpXLiSyhTDI6w22pIUw4RIOQ&s=10'),
    items: [
      'Zinc, Magnesium, Manganese and Ferrous Sulphates',
      'EDTA Chelated Micronutrients',
      'Humic Acid & Fulvic Acid',
      'Seaweed Extracts',
      'Amino Acid Formulations',
      'Potassium Humate',
    ],
    spanClass: 'lg:col-span-2',
  },
  {
    code: 'D',
    title: 'Agrochemicals',
    link: '/IndustrialChemicals',
    image: tbn('ANd9GcQOV67QwHqbZ2oxT05Mq3qJFIOzfKyEfCQpsgdiXwF6HA&s=10'),
    fallback: tbn('ANd9GcQ9XJHVntVLpp1Z3nFuJicclCA_-nOMMBsyHkXjP51H1A&s=10'),
    items: [
      'Pesticides',
      'Herbicides',
      'Other Agricultural Chemical Formulations',
    ],
    spanClass: 'lg:col-span-3',
  },
  {
    code: 'E',
    title: 'Agricultural Commodities & Food Products',
    link: '/FoodProducts',
    image: '/images/Homepage/SlideShow/Spices.webp',
    fallback: '/images/Homepage/AgriProducts.webp',
    items: [
      'Fresh Fruits & Vegetables',
      'Grains & Pulses',
      'Spices',
      'Processed Food Products',
      'Herbal Powders & Ingredients',
    ],
    spanClass: 'lg:col-span-3',
  },
]

// Balanced Featured Products across all verticals
const featuredProducts = [
  {
    img: tbn('ANd9GcS7HwGgkvdMQokYDRxeBhAZWR8i2jgXIioSH4BMdMPu4g&s=10'),
    alt: 'Ammonium Sulphate (Crystalline)',
    title: 'Ammonium Sulphate',
    desc: '21% N, 24% S crystalline fertilizer grade for balanced crop nutrition.',
  },
  {
    img: tbn('ANd9GcRPLB3faOpBd_ZVpGFIGaYtR2n_J5Jirbg6tLG_hvED-w&s=10'),
    alt: 'DAP – Di-Ammonium Phosphate',
    title: 'DAP – Di-Ammonium Phosphate',
    desc: '18% N, 46% P₂O₅ basal fertilizer for strong roots and early crop establishment.',
  },
  {
    img: tbn('ANd9GcT85sxC_EK5rQZZerrhsI7XeJThxGwuvf1d3aryIvvXWA&s=10'),
    alt: 'SOP – Sulphate of Potash',
    title: 'SOP – Sulphate of Potash',
    desc: '50% K₂O, 17.5% S chloride-free potash for fruits and vegetables.',
  },
  {
    img: tbn('ANd9GcTpzWnzlUYiBisj37Yz2idpXLiSyhTDI6w22pIUw4RIOQ&s=10'),
    alt: 'Zinc Sulphate Monohydrate',
    title: 'Zinc Sulphate Monohydrate',
    desc: '33% Zn essential micronutrient for enzyme activity and plant growth.',
  },
  {
    img: tbn('ANd9GcRRQTGUHfdy_ROvJ7ehaVmdLToOPcujGQVwZofDemNYpA&s=10'),
    alt: 'Humic & Fulvic Biostimulants',
    title: 'Humic & Fulvic Acids',
    desc: 'Soil-enhancing biostimulants that improve nutrient absorption and root vigour.',
  },
  {
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ferrous_sulfate.jpg?width=800',
    alt: 'Industrial Chemicals & Raw Materials',
    title: 'Industrial Chemicals',
    desc: 'Barytes, Carbon Black, Soda Ash, and specialty industrial raw materials.',
  },
  {
    img: '/images/Homepage/FeaturedProducts/Makhana.webp',
    alt: 'Lotus Seeds (Makhana)',
    title: 'Lotus Seed (Makhana)',
    desc: 'Export-grade organic superfood sourced directly from Indian growers.',
  },
  {
    img: '/images/Homepage/SlideShow/Spices.webp',
    alt: 'Indian Spices & Commodities',
    title: 'Spices & Commodities',
    desc: 'Turmeric, ginger, cumin, grains, and pulses hygienically graded and packed.',
  },
]

// Achievements / Statistics (Existing 4 + New Global Agents)
const achievementStats = [
  {
    end: 15,
    suffix: '+',
    title: 'Years of Experience',
    subtitle: '(Since 2007)',
  },
  {
    end: 2,
    suffix: '',
    title: 'Global Headquarters',
    subtitle: '(India & Canada)',
  },
  {
    end: 20,
    suffix: '+',
    title: 'Dedicated Individuals',
    subtitle: '(Working 24/7)',
  },
  {
    end: 350,
    suffix: '+',
    title: 'Farmer Network',
    subtitle: '(Growing Everyday)',
  },
  {
    end: 13,
    suffix: '+',
    title: 'Global Agents',
    subtitle: 'Across 195 countries',
  },
]

// All 10 Credentials & Certifications
const credentials = [
  {
    img: '/images/Homepage/OurCredentials/IsoCertification.png',
    label: 'ISO 9001:2015 Certified',
  },
  {
    img: '/images/Homepage/OurCredentials/FSSAI.jpg',
    label: 'FSSAI Certified',
  },
  {
    img: '/images/Homepage/OurCredentials/APEDA.jpg',
    label: 'APEDA Registered',
  },
  {
    img: '/images/Homepage/OurCredentials/StartUpIndia.png',
    label: 'Startup India Recognized',
  },
  {
    img: '/images/Homepage/OurCredentials/IITISMDhanbad2.jpg',
    label: 'IIT (ISM) Dhanbad Incubated',
  },
  {
    img: '/images/Homepage/OurCredentials/IEC.jpg',
    label: 'IEC Registered',
  },
  {
    img: '/images/Homepage/OurCredentials/MSME.jpg',
    label: 'MSME Registered',
  },
  {
    img: '/images/Homepage/OurCredentials/BURA.jpg',
    label: 'Bhartiya Udyog Ratan Award',
  },
  {
    img: '/images/Homepage/OurCredentials/jharkhand.jpg',
    label: 'Recognized by Government of Jharkhand',
  },
  {
    img: '/images/Homepage/OurCredentials/india.jpg',
    label: 'Recognized by Government of India',
  },
]

const supportingSectors = [
  'Agricultural Commodities',
  'Food Products',
  'Fertilizers',
  'Agrochemicals',
  'Industrial Chemicals',
]

export function Homepage() {
  useTranslation()
  const animationDuration = 3.5

  const handleScrollToProducts = (e) => {
    e.preventDefault()
    const element = document.getElementById('products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <style>{customStyles}</style>

      {/* Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          src="/videos/Homepage.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/75"></div>
      </div>

      {/* ---------------- 1. HERO SECTION ---------------- */}
      <div className="relative z-10 container mx-auto pt-32 pb-16 sm:pt-44 sm:pb-24 px-6 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          className="w-full lg:w-3/5 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-black/50 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider text-orange-400 uppercase backdrop-blur-sm mb-6"
          >
            <Globe2 size={16} className="text-orange-500" />
            <span>Unique Designs — Global Export House</span>
          </motion.div>

          <motion.div variants={taglineHeaderVariants} className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] font-serif tracking-tight text-white">
              <AnimatedLine text="India's Strength." className="text-white" />
              <AnimatedLine
                text="Your Global Sourcing Partner."
                className="mt-2 text-orange-500"
              />
            </h1>
          </motion.div>

          {/* Supporting Line */}
          <motion.div
            variants={itemVariants}
            className="mt-6 mb-10 border-l-0 lg:border-l-4 border-orange-500 lg:pl-5 py-1"
          >
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-100 leading-relaxed tracking-wide">
              {supportingSectors.map((sector, idx) => (
                <React.Fragment key={sector}>
                  <span className="inline-block">{sector}</span>
                  {idx < supportingSectors.length - 1 && (
                    <span className="mx-2.5 text-orange-500 font-bold">|</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#products"
              onClick={handleScrollToProducts}
              className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold py-3.5 px-8 rounded-full text-base sm:text-lg hover:bg-orange-600 transition duration-300 shadow-lg shadow-orange-500/25"
            >
              <span>Explore Our Portfolio</span>
              <ArrowRight size={20} />
            </a>
            <Link
              to="/ContactUs"
              className="inline-flex items-center justify-center border border-white/40 bg-black/40 backdrop-blur-sm text-white font-semibold py-3.5 px-8 rounded-full text-base sm:text-lg hover:bg-white/15 transition duration-300"
            >
              Request Export Quote
            </Link>
          </motion.div>
        </motion.div>

        <div className="w-full lg:w-2/5 flex justify-center">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop={true}
            allowTouchMove={false}
            autoplay={{ delay: 2400, disableOnInteraction: false }}
            className="rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md border border-white/30 aspect-100/73 overflow-hidden"
          >
            {slideImages.map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <img
                  src={image.url}
                  alt={image.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (image.fallback) {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = image.fallback
                    }
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
                  <span className="inline-block rounded-md bg-orange-500/90 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                    {image.badge}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ---------------- 2. STATISTICS / ACHIEVEMENT SECTION ---------------- */}
      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {achievementStats.map((stat) => (
              <motion.div
                key={stat.title}
                className="bg-black/55 backdrop-blur-md rounded-xl shadow-xl border border-white/25 p-6 lg:p-7 text-center transform transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/60 flex flex-col justify-center"
                variants={itemVariants}
              >
                <CountUp
                  end={stat.end}
                  duration={animationDuration}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyDelay={200}
                  className="text-4xl xl:text-5xl font-bold text-orange-500 mb-2 block"
                />
                <p className="text-lg xl:text-xl font-semibold text-white leading-snug">
                  {stat.title}
                </p>
                <p className="text-gray-300 text-sm mt-1">{stat.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ---------------- 3. CONSOLIDATED TRUST & COMPANY SECTION ---------------- */}
      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            className="bg-black/55 backdrop-blur-md rounded-2xl shadow-2xl border border-white/25 p-7 sm:p-10 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 text-orange-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                <ShieldCheck size={18} className="text-orange-500" />
                <span>Dependable Indian Export Partner</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 border-l-4 border-orange-500 pl-4 leading-tight">
                WHY YOU SHOULD TRUST US &amp; MAKE US YOUR GO-TO SUPPLIER?
              </h2>

              <div className="text-gray-200 text-base md:text-lg leading-relaxed space-y-5 text-justify">
                <p>
                  Unique Designs is an India-based export company committed to connecting global markets with India&apos;s vast agricultural, manufacturing and industrial capabilities. Our diverse portfolio spans agricultural commodities, fresh and processed food products, fertilizers, micronutrients, biostimulants, agrochemicals and industrial chemicals. With a growing network of 350+ farmers and agricultural producers, alongside established industry and manufacturing relationships across India, we bring quality products and competitive Indian sourcing opportunities to international markets.
                </p>
                <p>
                  We believe successful international trade must be built on genuine pricing, transparency, consistent quality and mutual growth. Our philosophy is simple: buyers deserve honest and competitive prices, producers deserve fair value for their work, and every business relationship deserves commitment beyond a single transaction. We focus on eliminating unnecessary costs, maintaining quality-conscious sourcing and providing commercially competitive offers without compromising on reliability. Whether it is bulk agricultural produce, Ammonium Sulphate, speciality fertilizers, micronutrients, biostimulants or industrial chemicals, we approach every requirement with the same dedication and responsibility. Supported by our export experience, industry knowledge, relevant certifications and growing international presence, we aim to make sourcing from India a seamless, dependable and rewarding experience.
                </p>
              </div>

              <div className="mt-8 bg-white/5 border-l-4 border-orange-500 rounded-r-xl p-6">
                <p className="text-lg md:text-xl font-semibold text-white leading-relaxed">
                  At Unique Designs, we don&apos;t believe in winning business through promises or inflated margins. We believe in earning trust through genuine pricing, quality and every shipment we deliver.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-orange-500" />
                    Genuine Export Pricing
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-orange-500" />
                    Quality-Conscious Sourcing
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-orange-500" />
                    Long-Term Trade Partnerships
                  </span>
                </div>

                <Link
                  to="/AboutUs"
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm sm:text-base transition-colors"
                >
                  <span>Explore Company Profile</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------------- 4. PRODUCT PORTFOLIO ACROSS ALL BUSINESS VERTICALS ---------------- */}
      <div id="products" className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-400 uppercase block mb-2">
              Multi-Sector Export Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-orange-500 pb-4">
              Our Product Portfolio
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mt-4">
              Comprehensive sourcing across agricultural commodities, crop nutrition, biostimulants, agrochemicals, and industrial raw materials.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-7 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {businessVerticals.map((vertical) => (
              <motion.div
                key={vertical.code}
                variants={itemVariants}
                className={`${vertical.spanClass} bg-black/55 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/25 hover:border-orange-500/60 transition-all duration-300 flex flex-col group`}
              >
                <div className="relative h-52 w-full overflow-hidden bg-gray-900">
                  <img
                    src={vertical.image}
                    alt={vertical.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (vertical.fallback) {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = vertical.fallback
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-sm shadow-md">
                    {vertical.code}
                  </span>
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {vertical.title}
                  </h3>

                  <ul className="space-y-2.5 text-gray-200 text-sm sm:text-base mb-6 flex-grow">
                    {vertical.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/15">
                    <Link
                      to={vertical.link}
                      className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:text-orange-300 transition-colors text-sm sm:text-base"
                    >
                      <span>View Category Details</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ---------------- 5. FEATURED PRODUCTS SLIDER ---------------- */}
      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-orange-500 pb-4">
              Key Export Products
            </h2>
          </div>

          <motion.div
            className="relative featured-products-slider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 2200,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {featuredProducts.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-black/55 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/25 hover:border-orange-500/50 transition-all duration-300 h-full flex flex-col">
                    <div className="h-48 w-full bg-gray-900 overflow-hidden">
                      <img
                        src={product.img}
                        alt={product.alt}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.visibility = 'hidden'
                        }}
                      />
                    </div>
                    <div className="p-5 flex-grow">
                      <h3 className="text-lg font-bold text-white mb-1.5">
                        {product.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {product.desc}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>

      {/* ---------------- 6. PRIVATE LABELING & CUSTOMIZATION SECTION ---------------- */}
      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            className="bg-black/55 backdrop-blur-md rounded-2xl shadow-xl border border-white/25 p-6 md:p-10 flex flex-col md:flex-row-reverse items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2 md:pl-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Private Labeling &amp; Custom Packaging
              </h2>
              <h3 className="text-lg sm:text-xl text-orange-400 font-semibold mb-4">
                Tailored Bulk &amp; Retail Supply Solutions
              </h3>
              <p className="text-base md:text-lg text-gray-300 mb-6 text-justify leading-relaxed">
                Unique Designs offers flexible packaging, custom formulations, and private labeling solutions for international importers, distributors, and institutional buyers across food, fertilizer, and chemical lines.
              </p>
              <ul className="space-y-2.5 text-gray-200 mb-8 text-sm sm:text-base">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-orange-500 shrink-0" />
                  <span>Bulk industrial bags, drums &amp; retail-ready packs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-orange-500 shrink-0" />
                  <span>Destination-country regulatory &amp; labeling compliance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-orange-500 shrink-0" />
                  <span>Custom NPK grades &amp; specification-driven sourcing</span>
                </li>
              </ul>
              <Link
                to="/ContactUs"
                className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-orange-600 transition duration-300"
              >
                <span>Discuss Your Requirement</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="/images/Homepage/AgriProducts.jpeg"
                alt="Private Labeling and Custom Export Packaging"
                className="rounded-2xl shadow-2xl w-full object-cover border border-white/20"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------------- 7. CREDENTIALS & CERTIFICATIONS CAROUSEL ---------------- */}
      <div className="relative z-10 pb-20 md:pb-28">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-400 uppercase block mb-2">
              Verified Compliance &amp; Recognition
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-orange-500 pb-4">
              Credentials &amp; Certifications
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="credentials-marquee-wrapper credentials-edge-fade overflow-hidden py-4"
          >
            <div className="credentials-marquee-track gap-8 sm:gap-12 items-center">
              {[...credentials, ...credentials].map((cred, index) => (
                <div
                  key={`${cred.label}-${index}`}
                  className="flex flex-col items-center justify-center shrink-0 w-44 sm:w-52 px-2 group select-none"
                >
                  <div className="h-20 sm:h-24 w-36 sm:w-40 rounded-xl bg-white/95 px-4 py-2.5 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={cred.img}
                      alt={cred.label}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs sm:text-sm font-medium text-gray-200 group-hover:text-orange-400 transition-colors leading-snug">
                    {cred.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}