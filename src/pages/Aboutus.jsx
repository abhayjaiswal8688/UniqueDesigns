"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Aboutus.jsx
 * - Background video behind entire page
 * - Hero animated heading "Pure and Organic"
 * - Content blocks: About, Vision, Mission, Awards, Media, Team, CTA
 * - Team members kept as-is
 */

// Background video
const VideoBackground = ({ src = "/videos/about-bg.mp4" }) => (
  <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
    {/* dark overlay so text is readable */}
    <div className="absolute inset-0 bg-black/50" />
  </div>
);

const SectionContainer = ({ children, className = "" }) => (
  <div className={`relative z-10 max-w-6xl mx-auto px-6 ${className}`}>
    {children}
  </div>
);

/* ----------------- Motion variants ----------------- */
const sectionVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const headingVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};

const taglineHeaderVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const AnimatedLetters = ({ text, className = "" }) => {
  const lineVariants = {
    hidden: {},
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
      className={`inline-block ${className}`}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={char + "-" + index}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

/* ----------------- Data ----------------- */

const videoList = [
  {
    id: 1,
    src: "https://www.youtube.com/embed/glSMPZ83oUg",
    caption: "Television interview on Doordarshan",
  },
  {
    id: 2,
    src: "https://www.youtube.com/embed/KNQWXDWXAz4",
    caption: "Insights with Om: The Practice",
  },
  {
    id: 3,
    src: "https://www.youtube.com/embed/3M3s9cbsKpE",
    caption: "Second TV Interview",
  },
];

const mediaImages = [
  {
    id: 1,
    src: "/images/about/udyog.png",
    alt: "Udyog Ratna Award",
    caption: "Receiving the Udyog Ratna Award from Mr. Suresh Prabhu.",
  },
  {
    id: 2,
    src: "/images/about/presidentaward.png",
    alt: "President Award",
    caption: "President Scout Award from the President of India.",
  },
  {
    id: 3,
    src: "/images/about/news.png",
    alt: "Newspaper Feature",
    caption: "Newspaper coverage on Unique Designs' impact.",
  },
];

const teamMembers = [
  {
    name: "Raakesh Raj",
    role: "Founder & CEO",
    image: "/images/about/ceo.png",
    bio: "Guiding Unique Designs with a long-term vision for ethical exports and rural empowerment.",
  },
  {
    name: "Rishabh Kumar",
    role: "Co-founder, Head Canada",
    image: "/images/about/rishab.jpeg",
    bio: "Leads Canadian operations and international partnerships from Vancouver.",
  },
  {
    name: "Prem Aayush",
    role: "Sales Manager",
    image: "/images/about/prem.jpeg",
    bio: "Drives sales strategy and client relationships across global markets.",
  },
];

export function Aboutus() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background video */}
      <VideoBackground />

      {/* Foreground content */}
      <div className="relative z-10 py-20">
        {/* HERO TEXT */}
        <SectionContainer className="mb-10 text-center">
          <motion.div
            variants={taglineHeaderVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatedLetters
              text="Behind Unique Designs"
              className="text-4xl text-orange-400 sm:text-5xl md:text-7xl mt-20 font-bold mb-6 leading-tight font-serif tracking-tight"
            />
          </motion.div>
        </SectionContainer>

        <main className="pb-12">
          <SectionContainer className="space-y-12">
            {/* Intro & short about */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
              className="flex flex-col lg:flex-row gap-8 items-start bg-black/40 rounded-xl p-6 border border-white/10 backdrop-blur-sm"
            >
              {/* Left: intro text */}
              <div className="lg:w-2/3 text-gray-200 leading-relaxed">
                <h3 className="text-xl md:text-2xl text-orange-400 font-semibold mb-3 text-center lg:text-left">
                  Who we are
                </h3>
                <p className="text-sm md:text-base">
                  We started our mission with the inception of “INTERIOR
                  COLLECTION” — a manufacturing firm serving interior and
                  furniture industries since 2007. Growing through fierce
                  competition, we expanded into exports and partnered with
                  farmers and artisans to bring organic, sustainable, and
                  high-quality products to global markets. Our focus includes
                  vermicompost, finger millet, lotus seeds, jackfruits, rice,
                  handicrafts, paintings, stainless-steel &amp; UPVC industrial
                  products. Headquartered in Ranchi, India, and Vancouver,
                  Canada, Unique Designs blends local roots with global reach.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 rounded-md text-xs text-gray-200 border border-white/10">
                    Quality Certified
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 rounded-md text-xs text-gray-200 border border-white/10">
                    Global Shipping
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 rounded-md text-xs text-gray-200 border border-white/10">
                    Trusted Partners
                  </span>
                </div>
              </div>

              {/* Right: info column */}
              <aside className="lg:w-1/3 flex flex-col gap-4">
                <div className="bg-black/40 rounded-md p-4 text-sm text-gray-200 border border-white/10">
                  <div className="font-semibold text-white mb-1">
                    Headquarters (India)
                  </div>
                  <div className="text-xs">
                    Tupudana Industrial Area, Ranchi, Jharkhand, India
                  </div>
                </div>

                <div className="bg-black/40 rounded-md p-4 text-sm text-gray-200 border border-white/10">
                  <div className="font-semibold text-white mb-1">
                    Headquarters (Canada)
                  </div>
                  <div className="text-xs">
                     Pitt Meadows, Vancouver, BC, Canada
                  </div>
                </div>

                <div className="bg-black/40 rounded-md p-4 text-sm text-gray-200 border border-white/10">
                  <div className="font-semibold text-white mb-1">
                    Quick Facts
                  </div>
                  <ul className="text-xs list-disc ml-5 space-y-1">
                    <li>20+ team members</li>
                    <li>300+ farmer cooperative</li>
                    <li>Annual revenue ~50 million</li>
                  </ul>
                </div>
              </aside>
            </motion.section>

            {/* Vision & Mission */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="text-center md:text-left bg-black/40 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                <h4 className="text-xl font-semibold text-orange-400 mb-2">
                  Vision
                </h4>
                <p className="text-gray-200 text-sm">
                  To be the trusted bridge between rural producers and
                  international consumers — creating prosperity for farmers and
                  artisans while delivering authentic, traceable products.
                </p>
              </div>

              <div className="text-center md:text-left bg-black/40 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                <h4 className="text-xl font-semibold text-orange-400 mb-2">
                  Mission
                </h4>
                <p className="text-gray-200 text-sm">
                  Empower local communities through fair partnerships, ensure
                  strict quality and traceability, and promote sustainable
                  farming and production practices at scale.
                </p>
              </div>
            </motion.section>

            {/* AWARDS */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
              className="space-y-4 bg-black/40 rounded-xl p-6 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-center text-2xl text-orange-400 font-semibold">
                Awards &amp; Accomplishments
              </h3>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <ul className="md:w-1/2 text-gray-300 list-disc ml-6 space-y-2 text-sm">
                  <li>Registered Startup (DPIIT) &amp; provincial recognition</li>
                  <li>ZED certification — Zero Defect Zero Effect</li>
                  <li>Incubated at IIT (ISM) Dhanbad</li>
                  <li>Export registrations: APEDA RCMC &amp; IEC</li>
                  <li>
                    National recognitions for industry &amp; rural job creation
                  </li>
                </ul>

                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                  <img
                    src="/images/about/award1.png"
                    alt="award1"
                    className="w-full h-24 object-cover rounded-md border border-white/10 shadow-sm"
                  />
                  <img
                    src="/images/about/award2.png"
                    alt="award2"
                    className="w-full h-24 object-cover rounded-md border border-white/10 shadow-sm"
                  />
                </div>
              </div>
            </motion.section>

            {/* MEDIA */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
              className="space-y-4 bg-black/40 rounded-xl p-6 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-center text-2xl text-orange-400 font-semibold">
                Media &amp; Interviews
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {videoList.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-md overflow-hidden border border-white/10 bg-black/40"
                  >
                    <iframe
                      src={v.src}
                      title={v.caption}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full aspect-video"
                    />
                    <p className="text-xs text-gray-300 p-2">{v.caption}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {mediaImages.map((m) => (
                  <div key={m.id} className="text-center">
                    <img
                      src={m.src}
                      alt={m.alt}
                      className="w-full h-28 object-cover rounded-md border border-white/10 shadow-sm"
                    />
                    <p className="text-xs text-gray-300 mt-2">{m.caption}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* TEAM */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={sectionVariant}
              className="space-y-6"
            >
              <h3 className="text-center text-2xl text-orange-400 font-semibold">
                Our Core Team
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {teamMembers.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-black/40 rounded-lg p-5 flex flex-col items-center text-center border border-white/10 backdrop-blur-sm"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-400 mb-3">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-semibold text-white">{m.name}</div>
                    <div className="text-xs text-orange-300 mt-1 px-3 py-1 rounded-full bg-black/60">
                      {m.role}
                    </div>
                    <p className="text-xs text-gray-300 mt-3">{m.bio}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <div className="text-center">
              <Link
                to="/ContactUs"
                className="inline-block bg-orange-400 hover:bg-orange-500 text-black px-6 py-3 rounded-full font-semibold shadow-sm"
              >
                Connect with us
              </Link>
            </div>
          </SectionContainer>
        </main>
      </div>
    </div>
  );
}
