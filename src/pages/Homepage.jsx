import React from 'react'
import { Trans, useTranslation } from "react-i18next"
import { Link } from "react-router-dom" 

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation" 
import "swiper/css/pagination" 

import CountUp from "react-countup"
import { motion } from "framer-motion"

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
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      willChange: "transform, opacity",
    },
    visible: {
      opacity: 1,
      y: 0,
      willChange: "auto",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.7,
      },
    },
  };

  return (
    <motion.span
      className={`block ${className} whitespace-nowrap`}
      variants={lineVariants}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={char + "-" + index}
          variants={letterVariants}
          style={{ display: 'inline-block' }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const swiperStyles = `
  .featured-products-slider {
    padding-left: 12px;
    padding-right: 12px;
  }

  .featured-products-slider .swiper-button-prev,
  .featured-products-slider .swiper-button-next {
    width: 50px;
    height: 50px;
    
    background-color: transparent;
    border: 2px solid #ffffff;
    border-radius: 50%;
    
    color: #ffffff;
    transition: all 0.3s ease-in-out;

    top: 45% !important; 
    transform: translateY(-50%) !important; 
  }
  
  .featured-products-slider .swiper-button-prev:hover,
  .featured-products-slider .swiper-button-next:hover {
    border-color: #f97316;
    color: #f97316;
  }

  .featured-products-slider .swiper-button-prev {
    left: 0;
  }
  
  .featured-products-slider .swiper-button-next {
    right: 0;
  }
  
  .featured-products-slider .swiper-button-prev::after,
  .featured-products-slider .swiper-button-next::after {
    font-size: 24px;
    font-weight: 900 !important; 
  }

  .featured-products-slider .swiper-pagination {
    position: relative !important; 
    bottom: auto !important;       
    margin-top: 20px !important;  
  }


  .featured-products-slider .swiper-pagination-bullet {
    background-color: #ffffff;
    opacity: 0.4;
  }

  .featured-products-slider .swiper-pagination-bullet-active {
    background-color: #f97316;
    opacity: 1;
  }
`

const slideImages = [
  {
    url: "/images/Homepage/SlideShow/Vermicompost.jpg",
    alt: "A pile of dark, earthy vermicompost",
  },
  {
    url: "/images/Homepage/SlideShow/Spices.webp",
    alt: "An assortment of colorful spices in bowls",
  },
  {
    url: "/images/FreshFromFarm/Grains/Hemp.jpg",
    alt: "A close-up of hemp seeds",
  },
  {
    url: "/images/Homepage/SlideShow/Makhana.webp",
    alt: "A bowl of makhana",
  },
  {
    url: "/images/Homepage/SlideShow/Ashwagandha.jpg",
    alt: "Ashwagandha roots and powder",
  },
  {
    url: "/images/Homepage/SlideShow/Fruits.webp",
    alt: "A crate of colorful fresh fruits",
  },
]

const featuredProducts = [
  {
    img: "/images/Homepage/FeaturedProducts/Moringa.jpg",
    alt: "Moringa Powder",
    title: "Moringa Powder",
    desc: "A nutrient-dense superfood, packed with vitamins and antioxidants.",
  },
  {
    img: "/images/Homepage/FeaturedProducts/Ashwagandha.jpg",
    alt: "Ashwagandha",
    title: "Ashwagandha",
    desc: "An ancient adaptogenic herb known for its stress-relieving properties.",
  },
  {
    img: "/images/Homepage/FeaturedProducts/Amla.jpg",
    alt: "Amla",
    title: "Amla",
    desc: "A potent source of Vitamin C, promoting immunity and wellness.",
  },
  {
    img: "/images/Homepage/FeaturedProducts/CowDung.png",
    alt: "Cow Dung Manure",
    title: "Cow Dung Manure",
    desc: "Well-aged and composted, perfect for enriching garden soil.",
  },
  {
    img: "/images/Homepage/FeaturedProducts/Makhana.webp",
    alt: "Lotus Seeds (Makhana)",
    title: "Lotus Seed (Makhana)",
    desc: "Light, healthy, and a versatile superfood.",
  },
  {
    img: "/images/Homepage/FeaturedProducts/Vermicompost.webp",
    alt: "Vermicompost",
    title: "Vermicompost",
    desc: "High-quality organic fertilizer for sustainable farming.",
  },
  {
    img: "/images/Homepage/FeaturedProducts/Ragi.webp",
    alt: "Finger Millet",
    title: "Finger Millet (Ragi)",
    desc: "Nutrient-rich and sourced directly from small farmers.",
  },
  {
    img: "/images/Homepage/FeaturedProducts/Jackfruit.webp",
    alt: "Jackfruit Products",
    title: "Jackfruit Products",
    desc: "Sustainably harvested and processed for premium quality.",
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

const animationDuration = 4

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

const taglineHeaderVariants = {
  hidden: {
  },
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export function Homepage() {
  const { t } = useTranslation()
  const { line1, line2 } = t("description", { channel: "RoadsideCoder" })

  // --- 1. ADDED: Smooth scroll handler ---
  const handleScrollToProducts = (e) => {
    e.preventDefault(); // Stop the default anchor jump
    const element = document.getElementById('products');
    if (element) {
      // Smoothly scroll to the "products" section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      <style>{swiperStyles}</style>

      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          src="/videos/bg_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto pt-28 pb-16 sm:pt-40 sm:pb-24 px-6 flex flex-col lg:flex-row items-center">
        <motion.div
          className="w-full lg:w-3/5 text-center z-25 lg:text-left mb-12 lg:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={taglineHeaderVariants}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight font-serif tracking-tight animate-stream-text">
              <AnimatedLetters
                text="Uniquely Sourced."
                className=""
              />
              <AnimatedLetters
                text="Globally Supplied."
                className="mt-2"
              />
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-10 text-justify mt-6 leading-relaxed"
            variants={itemVariants}
          >
            Connecting sustainable farms to the global market. Discover our premium collection of herbal, food, and agricultural products.
          </motion.p>

          {/* --- 2. UPDATED: Added onClick handler to this button --- */}
          <motion.a
            href="#products"
            onClick={handleScrollToProducts} 
            className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition duration-300"
            variants={itemVariants}
          >
            Explore Our Products
          </motion.a>
        </motion.div>

        <div className="w-full lg:ml-20 lg:w-2/5 flex justify-center">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop={true}
            allowTouchMove={false}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            className="rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md border-2 border-white/40 aspect-100/73"
          >
            {slideImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div id="products" className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-orange-500 pb-4">
              Explore Our Categories
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 p-4 md:p-6 gap-6 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            
            <motion.div
              className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 border border-white/40"
              variants={itemVariants}
            >
              <img
                src="/images/Homepage/Turmeric.jpg"
                alt="Herbal Products and Spices"
                className="w-full h-56 object-cover"
                loading="eager"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Herbal Products
                </h3>
                <p className="text-gray-300 mb-6">
                  Discover our range of pure herbal powders like Moringa
                  and Amla, alongside authentic, flavorful spices.
                </p>
                <Link
                  to="/HerbalProducts"
                  className="text-orange-500 font-semibold hover:text-orange-400 transition-colors"
                >
                  View Products &rarr;
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 border border-white/40"
              variants={itemVariants}
            >
              <img
                src="/images/Homepage/FeaturedProducts/Vermicompost.webp"
                alt="Organic Vermicompost"
                className="w-full h-56 object-cover"
                loading="eagier"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Organic Manures
                </h3>
                <p className="text-gray-300 mb-6">
                  High-quality vermicompost and aged cow dung manure to
                  enrich your soil and promote sustainable growth.
                </p>
                <Link
                  to="/Manures"
                  className="text-orange-500 font-semibold hover:text-orange-400 transition-colors"
                >
                  View Products &rarr;
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 border border-white/40"
              variants={itemVariants}
            >
              <img
                src="/images/Homepage/AgriProducts.webp"
                alt="Natural and Organic Products"
                className="w-full h-56 object-cover"
                loading="eager"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Food Products
                </h3>
                <p className="text-gray-300 mb-6">
                  Explore our collection of organic flours, cold-pressed
                  oils, honey, and other natural food items.
                </p>
                <Link
                  to="/FoodProducts"
                  className="text-orange-500 font-semibold hover:text-orange-400 transition-colors"
                >
                  View Products &rarr;
                </Link>
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-orange-500 pb-4">
              Our Featured Products
            </h2>
          </div>

          <motion.div
            className="relative px-12 featured-products-slider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Navigation, Pagination]} 
              spaceBetween={24} 
              slidesPerView={1}  
              navigation={true}  
              pagination={{ clickable: true }} 
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              className=""
            >
              {featuredProducts.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-black/50 h-75 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 border border-white/40">
                    <img
                      src={product.img}
                      alt={product.alt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
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

      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/40 p-6 md:p-10 md:pr-5 flex flex-col md:flex-row items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                A Commitment to Quality
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-6 text-justify">
                Founded in 2007 as "INTERIOR COLLECTION", a local
                manufacturing firm, Unique Designs has grown into a
                pivotal player in the global market. With headquarters
                in India and Canada, we are dedicated to excellence,
                innovation, and an unwavering commitment to sustainable,
                top-notch products.
              </p>
              {/* --- 3. UPDATED: Converted <a> to <Link> --- */}
              <Link
                to="/AboutUs"
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition duration-300"
              >
                Learn More About Us
              </Link>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="/images/Homepage/Handshake.jpg"
                alt="Global partnership"
                className="rounded-2xl shadow-2xl w-full sm:w-3/4 p-2 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-orange-500 pb-4">
              Why Choose Us?
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/40 p-8 text-center transform transition-transform duration-300 hover:-translate-y-2"
              variants={itemVariants}
            >
              <CountUp
                end={15}
                duration={animationDuration}
                suffix="+"
                enableScrollSpy
                scrollSpyDelay={300}
                className="text-5xl font-bold text-orange-500 mb-3 block"
              />
              <p className="text-xl font-semibold text-white">
                Years of Experience
              </p>
              <p className="text-gray-300">(Since 2007)</p>
            </motion.div>

            <motion.div
              className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/40 p-8 text-center transform transition-transform duration-300 hover:-translate-y-2"
              variants={itemVariants}
            >
              <CountUp
                end={2}
                duration={animationDuration}
                enableScrollSpy
                scrollSpyDelay={300}
                className="text-5xl font-bold text-orange-500 mb-3 block"
              />
              <p className="text-xl font-semibold text-white">
                Global Headquarters
              </p>
              <p className="text-gray-300">(India & Canada)</p>
            </motion.div>

            <motion.div
              className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/40 p-8 text-center transform transition-transform duration-300 hover:-translate-y-2"
              variants={itemVariants}
            >
              <CountUp
                end={20}
                duration={animationDuration}
                suffix="+"
                enableScrollSpy
                scrollSpyDelay={300}
                className="text-5xl font-bold text-orange-500 mb-3 block"
              />
              <p className="text-xl font-semibold text-white">
                Dedicated Individuals
              </p>
              <p className="text-gray-300">(& 300+ Farmers)</p>
            </motion.div>

            <motion.div
              className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/40 p-8 text-center transform transition-transform duration-300 hover:-translate-y-2"
              variants={itemVariants}
            >
              <CountUp
                end={50}
                duration={animationDuration}
                suffix="M"
                enableScrollSpy
                scrollSpyDelay={300}
                className="text-5xl font-bold text-orange-500 mb-3 block"
              />
              <p className="text-xl font-semibold text-white">
                Annual Revenue
              </p>
              <p className="text-gray-300">(A Commitment to Excellence)</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block border-b-2 border-orange-500 pb-4">
              Our Credentials
            </h2>
          </div>

          <motion.div
            className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/40 p-6 md:p-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-4 md:gap-x-8 place-items-center">
              
              <motion.div
                className="text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <img
                  src="/images/Homepage/OurCredentials/IsoCertification.png"
                  alt="ISO 9001:2015 Certified"
                  className="h-20 w-30 mx-auto mb-3"
                />
                <p className="text-white font-semibold">
                  ISO 9001:2015 Certified
                </p>
              </motion.div>

              <motion.div
                className="text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <img
                  src="/images/Homepage/OurCredentials/FSSAI.jpg"
                  alt="FSSAI Certified"
                  className="h-20 w-30 mx-auto mb-3"
                />
                <p className="text-white font-semibold">
                  FSSAI Certified
                </p>
              </motion.div>

              <motion.div
                className="text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <img
                  src="/images/Homepage/OurCredentials/APEDA.jpg"
                  alt="APEDA Registered"
                  className="h-20 w-30 mx-auto mb-3"
                />
                <p className="text-white font-semibold">
                  APEDA Registered
                </p>
              </motion.div>

              <motion.div
                className="text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <img
                  src="/images/Homepage/OurCredentials/StartUpIndia.png"
                  alt="Startup India Recognized"
                  className="h-20 w-30 mx-auto mb-3"
                />
                <p className="text-white font-semibold">
                  Startup India Recognized
                </p>
              </motion.div>

              <motion.div
                className="text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <img
                  src="/images/Homepage/OurCredentials/IITISMDhanbad2.jpg"
                  alt="IIT (ISM) Dhanbad Incubated"
                  className="h-20 w-30 mx-auto mb-3"
                />
                <p className="text-white font-semibold">
                  IIT (ISM) Dhanbad Incubated
                </p>
              </motion.div>

              <motion.div
                className="text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <img
                  src="/images/Homepage/OurCredentials/IEC.jpg"
                  alt="IEC Registered"
                  className="h-20 w-30 mx-auto mb-3"
                />
                <p className="text-white font-semibold">
                  IEC Registered
                </p>
              </motion.div>

              <motion.div
                className="text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <img
                  src="/images/Homepage/OurCredentials/MSME.jpg"
                  alt="MSME Registered"
                  className="h-20 w-30 mx-auto mb-3"
                />
                <p className="text-white font-Ggsemibol">
                  MSME Registered
                </p>
              </motion.div>

              <motion.div
                className="text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <img
                  src="/images/Homepage/OurCredentials/BURA.jpg"
                  alt="Bhartiya Udyog Ratan Award"
                  className="h-20 w-3m mx-auto mb-3"
                />
                <p className="text-white font-semibold">
                  Bhartiya Udyog Ratan Award
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}