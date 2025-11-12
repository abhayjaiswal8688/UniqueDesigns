import React from 'react';
import { motion } from 'framer-motion'; // For animations

//------------------------------------------------------------------
// Card 1: Product Card (Vermicompost, Cow Dung)
//------------------------------------------------------------------

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Renamed this to ProductCard for clarity
function ProductCard({ item }) {
  const { name, subtext, description, imageUrl, imageAlt } = item;

  return (
    // Card: Transparent, brown/amber border
    <motion.article
      className="flex w-full flex-col overflow-hidden rounded-xl border border-amber-800/60 shadow-lg transition-shadow duration-300 hover:shadow-amber-900/50 md:flex-row"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* --- IMAGE SECTION (Left) --- */}
      <div className="w-full md:w-2/5 flex-shrink-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-64 w-full object-cover md:h-full md:rounded-l-xl"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/333/FFF?text=Image+Error"; }}
        />
      </div>

      {/* --- 2. DESCRIPTION SECTION (Text Details) --- */}
      <div className="flex w-full flex-col p-6 md:p-8">
        <h2 className="text-2xl font-bold text-amber-300">{name}</h2>
        <p className="mb-4 text-xl font-semibold text-amber-500">{subtext}</p>
        <hr className="mb-4 border-t border-amber-700/50" />
        <p className="flex-grow text-gray-300 leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
}

//------------------------------------------------------------------
// Card 2: NEW Packaging Card (Shows 2 images)
//------------------------------------------------------------------
function PackagingCard({ item }) {
  const { 
    name, 
    subtext, 
    description, 
    packetImageUrl1, 
    packetImageAlt1,
    packetImageUrl2,
    packetImageAlt2 
  } = item;

  return (
    <motion.article
      className="flex w-full flex-col overflow-hidden rounded-xl border border-amber-800/60 shadow-lg transition-shadow duration-300 hover:shadow-amber-900/50"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* --- 1. DESCRIPTION SECTION (Top) --- */}
      <div className="flex w-full flex-col p-6 md:p-8">
        <h2 className="text-2xl font-bold text-amber-300">{name}</h2>
        <p className="mb-4 text-xl font-semibold text-amber-500">{subtext}</p>
        <hr className="mb-4 border-t border-amber-700/50" />
        <p className="flex-grow text-gray-300 leading-relaxed">{description}</p>
      </div>

      {/* --- 2. PACKAGING IMAGES SECTION (Bottom) --- */}
      <div className="w-full border-t border-amber-800/60 bg-black/20 p-6 md:p-8">
        <div className="grid grid-cols-2 gap-4">
          <img 
            src={packetImageUrl1} 
            alt={packetImageAlt1} 
            className="h-48 w-full rounded-lg object-contain" // object-contain to show the whole bag
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/333/FFF?text=Packet+1"; }}
          />
          <img 
            src={packetImageUrl2} 
            alt={packetImageAlt2} 
            className="h-48 w-full rounded-lg object-contain"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/333/FFF?text=Packet+2"; }}
          />
        </div>
      </div>
    </motion.article>
  );
}


//------------------------------------------------------------------
// Data array with 3 items (NOW with different data for packaging)
//------------------------------------------------------------------
const manureData = [
  {
    id: 1,
    name: 'Vermicompost - Organic Fertilizer',
    subtext: "Nature's Best for Your Soil",
    description: "100% Organic & Eco-Friendly. Our Vermicompost is rich in essential nutrients, enhances soil aeration, drainage, and water retention, promoting healthier plant growth.",
    imageUrl: './images/Manures/earthworm.jpg', // From PDF
    imageAlt: 'Rich, dark vermicompost held in a hand',
  },
  {
    id: 2,
    name: 'Aged Cow Dung Manure',
    subtext: 'The Traditional Soil Enhancer',
    description: "Our 100% organic, well-decomposed cow dung manure is a time-tested soil conditioner. It enriches the soil with vital nutrients and organic carbon, improving soil structure and ensuring long-term fertility for all your plants.",
    imageUrl: './images/Manures/cow.png',
    imageAlt: 'Aged cow dung manure',
  },
  {
    id: 3,
    name: 'Certified Quality & Packaging',
    subtext: 'Global Standards, Delivered On-Time',
    description: "Trusted by importers in 35 countries, we provide top-quality products adhering to global standards. We ensure 100% on-time delivery and offer customized packaging solutions to meet your unique specifications.",
    // ImageUrl removed, PacketImage URLs added
    packetImageUrl1: './images/Manures/vermicompost-bag.jpg', // Bag photo 1
    packetImageAlt1: 'True Care Vermicompost 25kg bag',
    packetImageUrl2: './images/Manures/vermicompost-bag-2.jpg', // Bag photo 2 (Assumed path)
    packetImageAlt2: 'Custom packaging example',
  }
];

// Animation variants for the grid container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

//------------------------------------------------------------------
// The Main Page Component
//------------------------------------------------------------------
export function ManurePage() {
  React.useEffect(() => {}, []);

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
        <source src="/videos/manure.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> 

      {/* --- Dark Overlay --- */}
      <div className="fixed left-0 top-0 h-full w-full bg-black/80 z-[-5]" /> 

      {/* --- Page Content --- */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 pt-45 pb-16 md:pb-24">
        
        {/* Title is animated */}
        <motion.h1 
          className="mb-6 text-center text-4xl font-bold tracking-tight text-amber-300 sm:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Organic Manures
        </motion.h1>

        {/* Brown horizontal line */}
        <hr className="w-1/4 mx-auto mb-10 border-t-2 border-amber-500/80" />
        
        <p className="mb-12 text-center text-lg text-gray-300 md:text-xl">
          Unlock the Power of Nature for Sustainable Agriculture!
        </p> 

        {/* Renders the 3 cards, one per line */}
        <motion.div
          className="space-y-8" // This ensures one card per line
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* UPDATED: This now checks which card to render */}
          {manureData.map((item) => {
            if (item.id === 3) {
              // Use the new PackagingCard for item 3
              return <PackagingCard key={item.id} item={item} />;
            }
            // Use the standard ProductCard for items 1 and 2
            return <ProductCard key={item.id} item={item} />;
          })}
        </motion.div>
      </main>
    </div>
  );
}