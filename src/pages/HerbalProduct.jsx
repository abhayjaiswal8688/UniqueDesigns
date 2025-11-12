import React from 'react';
import { motion } from 'framer-motion'; // 1. Import motion

//------------------------------------------------------------------
// NEW: Animation Variants & Component from FreshFromFarm.jsx
//------------------------------------------------------------------

const headerContainerVariants = {
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


//------------------------------------------------------------------
// Reusable Product Card Component (Wrapped with motion)
//------------------------------------------------------------------

// 2. Define animation variants for the card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


function ProductCard({ product }) {
  const { name, description, dess, imageUrl, imageAlt } = product;

  return (
    // 3. UPDATED: Wrapped in motion.article and added max-width
    <motion.article
      className="flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-green-600/60 shadow-lg transition-shadow duration-300 hover:shadow-green-900/50 md:flex-row"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      
      {/* --- IMAGE SECTION (Left) --- */}
      <div className="w-full md:w-2/5 flex-shrink-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          // Added rounded-l-xl to match card rounding on desktop
          className="h-64 w-full object-cover md:h-full md:rounded-l-xl" 
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/333/FFF?text=Image+Error"; }}
        />
      </div>

      {/* --- DESCRIPTION SECTION (Right) --- */}
      <div className="flex w-full flex-col  p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white">{name}</h2>
        <p className="mb-4 text-xl font-semibold text-white">{dess}</p>
        
        {/* ADDED: Green horizontal line inside the card */}
        <hr className="mb-4 border-t border-green-700/50" /> 
        
        <p className="flex-grow text-gray-300 leading-relaxed">{description}</p>
        
      </div>
    </motion.article>
  );
}
const flours=[
  {
    id:1,
    imageUrl: '/images/FoodProductPage/wheat.jpg',
    imageAlt: 'Wheat',
    name: 'Wheat Flour', //
    dess:'',
    description: 'Fuel your day with our purely organic whole wheat flour, packed with natural fiber to aid digestion.', //
  },
  {
    id: 6,
    name: 'Finger Millet',
    description: 'Boost your nutrition with our naturally grown organic finger millet (Ragi), cultivated purely without chemicals.', // Restored
    imageUrl: './images/FoodProductPage/ragi.jpg',
    imageAlt: 'Finger Millet', //
  },
]
const herbalProducts = [
  {
    id:1,
    imageUrl: '/images/FreshFromFarm/Herbal/Moringa.jpg',
    imageAlt: 'Moringa Powder',
    name: 'Moringa Powder', //
    dess:'',
    description: 'Provides essential nutrients and energy. We export premium-quality powder globally.', //
  },
  {
    imageUrl: '/images/FreshFromFarm/Herbal/Amla.jpg',
    imageAlt: 'Amla (Indian Gooseberry)',
    name: 'Amla (Indian Gooseberry)',des:'', //
    description: 'Rich in vitamin C and antioxidants for immunity and overall wellness.', //
  },
  {
    imageUrl: '/images/FreshFromFarm/Herbal/Ashwagandha.jpg',
    imageAlt: 'Ashwagandha Powder',
    name: 'Ashwagandha',des:'', //
    description: 'Boosts vitality and reduces stress. We export pure, high-quality Ashwagandha.', //
  },
  {
    imageUrl: '/images/FreshFromFarm/Herbal/Neem.jpg',
    imageAlt: 'Neem Powder',
    name: 'Neem Powder',des:'', //
    description: 'Made from dried leaves for natural detox and immunity support.', //
  },
  {
    imageUrl: '/images/FreshFromFarm/Herbal/Tulsi.jpg',
    imageAlt: 'Tulsi Powder',
    name: 'Tulsi Powder', des:'',//
    description: 'Made from dried holy basil leaves, rich in antioxidants and immunity-boosting properties.', //
  },
  {
    imageUrl: '/images/FreshFromFarm/Herbal/AloeVera.jpg',
    imageAlt: 'Aloe Vera Powder',
    name: 'Aloe Vera Powder',des:'', //
    description: 'Known for its skin-soothing and healing properties for cosmetic and health applications.', //
  },
]

//------------------------------------------------------------------
// Sample Product Data (RESTORED TO ORIGINAL)
//------------------------------------------------------------------
const spiceProducts = [
  { 
    id:1,
    imageUrl: '/images/FreshFromFarm/Spices/Turmeric.jpg',
    imageAlt: 'Turmeric',
    name: 'Turmeric', //
    description: 'Brings bold flavor and aroma to kitchens. Available in powder and standard form.',
    dess:'' ,//
  },
  {
    id:1,
    imageUrl: '/images/FreshFromFarm/Spices/Ginger.jpg',
    imageAlt: 'Ginger',
    name: 'Ginger', //
    description: 'An authentic Indian spice, carefully processed and hygienically packed.', //
  dess:'' ,},
  {
    id:1,
    imageUrl: '/images/FreshFromFarm/Spices/Garlic.jpg',
    imageAlt: 'Garlic',
    name: 'Garlic', //
    description: 'Part of our rich array of spices delivered with the essence of tradition.', //
  dess:'' ,},
  {
    id:1,
    imageUrl: '/images/FreshFromFarm/Spices/Cumin.jpg',
    imageAlt: 'Cumin',
    name: 'Cumin', //
    description: 'A traditional spice that adds bold flavor to global kitchens.', //
  dess:'' ,},
  {
    id: 2,
    name: 'Tamarind',
    description: 'Savor the rich, tangy flavor of our naturally grown organic tamarind, cultivated purely without any harmful chemicals.', // Restored
    dess: '', // Restored
    imageUrl: './images/FoodProductPage/tamarind.jpg',
    imageAlt: 'Tamarind',
  },
]
const products = [
  {
    id: 1,
    name: 'Rice',
    description: 'Cultivated without chemicals, each grain offers an authentic, subtly nutty flavor and fluffy texture.',
    dess: 'Fresh from farm', // Restored
    imageUrl: './images/FoodProductPage/ricee.jpg',
    imageAlt: 'Rice',
  },
  
  {
    id: 3,
    name: 'Lotus Seed',
    description: 'Enjoy the subtle, nutty flavor and delightful crunch of our naturally grown organic lotus seeds, cultivated purely without chemicals. Perfect as a wholesome roasted snack or added to soups and desserts for a unique texture.', // Restored
    dess: 'Pure and Organic', // Restored
    imageUrl: './images/FoodProductPage/makhana.jpg',
    imageAlt: 'Lotus seed',
  },
  {
    id: 4,
    name: 'Honey',
    description: 'Experience the pure, golden sweetness of our naturally grown organic honey, harvested from hives kept without chemicals or artificial feeds. With its rich flavour and smooth texture, it is perfect for sweetening drinks, drizzling on foods, or enjoying straight from the spoon.', // Restored
    dess: 'Natural and Sweet', // Restored
    imageUrl: './images/FoodProductPage/honey.jpg',
    imageAlt: 'Honey',
  },
   {
    id: 7,
    name: 'Apple Cider Vinegar',
    description: 'Embrace the robust flavor of our naturally crafted organic apple cider vinegar, made from apples grown purely without chemicals. Left raw and unfiltered to retain its natural enzymes and beneficial properties, it is a versatile addition to both your wellness routine and culinary creations.', // Restored
    dess: 'Pure & Raw', 
    imageUrl: './images/FoodProductPage/vinegar.jpg',
    imageAlt: 'Apple Cider Vinegar', 
  },
];

const oils=[
   {
    id: 5,
    name: 'Pongamia oil',
    description: 'Explore the traditional benefits of our naturally sourced Pongamia oil (Karanja oil), extracted from seeds grown purely without chemicals. Valued in Ayurvedic practices for its therapeutic properties, it is often used externally for skin care and in natural pest repellents.', // Restored
    dess: 'The Care for You', // Restored
    imageUrl: './images/FoodProductPage/karanch_oil.jpg',
    imageAlt: 'Pongamia Oil', // Restored (was Jackfruit before)
  },
  {
    id: 8, // Corrected ID back if it was duplicated intentionally
    name: 'Mustard Oil',
    description: 'Discover the pungent aroma and rich golden color of our naturally grown organic mustard oil, cold-pressed from seeds cultivated purely without chemicals. Ideal for traditional cooking and pickling, it adds authentic flavour and wholesome benefits to your meals.', // Restored
    dess: 'Health in each drop', // Restored
    imageUrl: './images/FoodProductPage/mustard.jpg',
    imageAlt: 'Mustard oil',
  },

]


// 4. Define variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Each card animates 0.1s after the previous one
    }
  }
};


//------------------------------------------------------------------
// The Main Page Component
//------------------------------------------------------------------
// Add 'use client'; if necessary for Framer Motion

export function HerbalProduct() { // Changed to named export as in original file
  // Check if component should be client component
  React.useEffect(() => {
    // This effect runs only on the client, confirming client-side rendering
  }, []);

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
        <source src="/videos/natural_productt.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- Dark Overlay --- */}
      <div className="fixed left-0 top-0 h-full w-full bg-black/80 z-[-5]" />

      {/* --- Page Content --- */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:py-24"> {/* Increased max-width for 2 columns */}
        
        {/* --- UPDATED: Animated Header Section --- */}
        <motion.div
          className="text-center pt-20"
          variants={headerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
                    variants={taglineHeaderVariants}
                    className="mb-6"
                  >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif tracking-tight animate-stream-text-green">
                      <AnimatedLetters text="Potent and Organic" />
                    </h1>
                  </motion.div>
      
          <motion.hr
            className="w-1/4 mx-auto mb-10 border-t-2 border-green-500/80"
            variants={itemVariants}
          />
      
          <motion.p
            className="mb-12 text-center text-lg text-gray-300 md:text-xl"
            variants={itemVariants}
          >
            Experience the wholesome power of herbs, straight from nature to you.
          </motion.p>
        </motion.div>
        {/* --- End of Animated Header Section --- */}

        
        <h1 className="mb-6 mt-9 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Spices
        </h1>
        <hr className="w-1/6 mx-auto mb-10 border-t-2 border-green-500/80" />
          <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {spiceProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <h1 className="mb-6 mt-9 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Organic Herbal Powder
        </h1>
        <hr className="w-1/6 mx-auto mb-10 border-t-2 border-green-500/80" />
          <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {herbalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>



      </main>
    </div>
  );
}