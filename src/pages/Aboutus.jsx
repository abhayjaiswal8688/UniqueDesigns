"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Aboutus.jsx
 * - Dark cinematic design, continuous video background, stacked vertical sections
 * - Parallax motion per section
 * - Top scroll progress bar (glowing amber)
 * - Lightbox: click-outside, ESC to close, Download
 * - Hero: letter-by-letter typing reveal with golden-amber glow (#ffb347), loops every 20s
 */

/* ---------------- VIDEO BACKGROUND ---------------- */
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
    <div className="absolute inset-0 bg-black/55" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
  </div>
);

/* Standard centered container */
const SectionContainer = ({ children, className = "" }) => (
  <div className={`relative z-10 max-w-5xl mx-auto px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

/* ---------------- Lightweight parallax hook ----------------
   On each scroll the element receives a small translateY to create depth.
   data-depth used just for reference — hook is passed depth parameter when called.
*/
function useParallax(rootRef, depth = 0.06) {
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof window === "undefined") return;

    let rafId = null;
    function onScroll() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const translateY = -offset * depth;
        el.style.transform = `translateY(${translateY}px)`;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (el) el.style.transform = "";
    };
  }, [rootRef, depth]);
}

/* ---------------- Animated Heading (typing-like reveal) ----------------
   Uses Framer Motion staggered children to show letters one-by-one.
   The whole animation restarts when `animationKey` changes (we bump it every 20s).
*/
const AnimatedTitle = ({ text, glowColor = "#ffb347", animationKey = 0 }) => {
  // Split into letters, preserve spaces
  const letters = Array.from(text);

  // Parent variants to stagger letter children
  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045, // adjust typing speed
        delayChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 18, stiffness: 200, mass: 0.2 },
    },
  };

  // glow style applied while letter is animating via filter/textShadow
  const glowStyle = {
    textShadow: `0 0 12px ${glowColor}, 0 6px 24px rgba(0,0,0,0.45)`,
  };

  return (
    // key ties to animationKey so we can remount the component to restart the animation
    <motion.h1
      key={`title-${animationKey}`}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
      style={{ WebkitFontSmoothing: "antialiased" }}
    >
      {letters.map((char, i) => {
        // show a subtle glow only at the moment of appearance using an inline style
        // framer-motion doesn't provide a direct 'onEnter' style hook per child,
        // so we apply a CSS transition: letters animate from hidden->visible, and we use CSS to simulate glow
        return (
          <motion.span
            key={`${char}-${i}`}
            variants={letterVariants}
            style={{
              display: "inline-block",
              // fallback: keep final color white; initial glow is handled by class with transition
              color: "#fff",
              transition: "text-shadow 0.25s ease",
            }}
            // whileHover not used; glow appears via CSS class below by toggling a temporary class is complex,
            // to keep it simple we'll apply glow to each letter via a motion animate prop that matches visible state
            animate={{ textShadow: `0 0 12px ${glowColor}` }}
          >
            {/* preserve spaces */}
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};

/* ---------------- Animated Tagline (staggered letters fade-in) ---------------- */
const AnimatedTagline = ({ text, animationKey = 0 }) => {
  const letters = Array.from(text);
  const parent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.02, delayChildren: 0.6 } },
  };
  const child = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };

  return (
    <motion.p
      key={`tag-${animationKey}`}
      variants={parent}
      initial="hidden"
      animate="visible"
      className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
    >
      {letters.map((c, idx) => (
        <motion.span
          key={`${c}-${idx}`}
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {c}
        </motion.span>
      ))}
    </motion.p>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export function Aboutus() {
  // lightbox state + helpers
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  const openLightbox = (src, alt = "") => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc("");
    setLightboxAlt("");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  // scroll progress bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const scrolled = window.scrollY || window.pageYOffset;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const winHeight = window.innerHeight;
      const pct = Math.min(100, Math.max(0, (scrolled / (docHeight - winHeight)) * 100));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // parallax refs
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const visionRef = useRef(null);
  const awardsRef = useRef(null);
  const mediaRef = useRef(null);
  const footerRef = useRef(null);

  useParallax(heroRef, 0.02);
  useParallax(aboutRef, 0.045);
  useParallax(visionRef, 0.03);
  useParallax(awardsRef, 0.05);
  useParallax(mediaRef, 0.04);
  useParallax(footerRef, 0.02);

  // typing animation restart key: bump this to remount AnimatedTitle/Tagline
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // start interval to restart animation every 20s
    const id = setInterval(() => {
      setAnimationKey((k) => k + 1);
    }, 20000);
    return () => clearInterval(id);
  }, []);

  // download helper for lightbox
  const downloadImage = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "image";
    a.click();
  };

  return (
    <div className="relative min-h-screen text-gray-100 bg-[#040406] antialiased">
      <VideoBackground />

      {/* Top scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="h-1 bg-black/30">
          <div
            aria-hidden
            style={{ width: `${progress}%` }}
            className="h-1 bg-amber-400 shadow-[0_0_12px_rgba(255,179,71,0.2)] transition-[width] duration-150 ease-out"
          />
        </div>
      </div>

      {/* HERO */}
      <header ref={heroRef} className="relative z-10 flex items-center justify-center text-center py-36">
        <SectionContainer>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl mx-auto">
            {/* Animated title + tagline (restarts when animationKey changes) */}
            <div className="leading-tight">
              <AnimatedTitle text="About Unique Designs" animationKey={animationKey} glowColor="#ffb347" />
              <AnimatedTagline
                text="Empowering communities, connecting craftsmanship, and redefining sustainability."
                animationKey={animationKey}
              />
            </div>
          </motion.div>
        </SectionContainer>
      </header>

      {/* MAIN stacked vertical sections with breathing space */}
      <main className="relative z-10">

        {/* WHO WE ARE */}
        <section ref={aboutRef} className="py-28" aria-labelledby="who-we-are">
          <SectionContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-black/45 backdrop-blur-md rounded-2xl p-10 border border-amber-500/10 shadow-lg">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="rounded-lg overflow-hidden border-2 border-amber-400/20 w-56 h-56">
                    <img src="/images/about/ceo.png" alt="CEO - Raakesh Raj" className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-4 text-sm text-gray-300 italic">Raakesh Raj — CEO & Founder</p>
                </div>

                <div className="md:w-2/3">
                  <h2 id="who-we-are" className="text-3xl font-semibold text-amber-300 mb-4 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">Who we are</h2>

                  <p className="text-gray-200 leading-relaxed mb-6">
                    Founded in 2007 as <strong>INTERIOR COLLECTION</strong>, Unique Designs
                    has evolved into an export-focused enterprise supporting small farmers and
                    skilled artisans. Headquartered in Ranchi, India, with a presence in Vancouver,
                    we partner with communities to deliver premium agri-products, handicrafts, and
                    industrial goods.
                  </p>

                  <ul className="list-disc ml-6 text-gray-300 space-y-2">
                    <li>Vermicompost, Finger Millet, Lotus Seeds &amp; Premium Spices</li>
                    <li>Handicrafts, Painterly Art &amp; Handwoven Products</li>
                    <li>Stainless Steel and UPVC Industrial Goods</li>
                    <li>Incubated at IIT(ISM) Dhanbad • Export Registrations in Place</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* VISION & MISSION */}
        <section ref={visionRef} className="py-28" aria-labelledby="vision-mission">
          <SectionContainer>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="bg-black/45 backdrop-blur-md rounded-2xl p-10 border border-amber-500/10 shadow-lg">
              <h2 id="vision-mission" className="text-3xl font-semibold text-amber-300 mb-6 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">Vision & Mission</h2>

              <div className="space-y-6 text-gray-200">
                <p>
                  Our objective is to empower small farmers and artisans through sustainable
                  and transparent supply chains, specializing in Vermicompost, Finger Millet,
                  Lotus Seeds, Jackfruits, Rice, Agri products, Handicraft, and Organic Herbal
                  essentials. With bases in Ranchi and Vancouver, we have become a key player
                  in the global organic market.
                </p>

                <p>
                  Our team of 20+ professionals and a 300+ farmer cooperative drives quality-first
                  production, ethical sourcing, and sustainable growth. We’re incubated at IIT Dhanbad,
                  certified by national export and quality standards, and have achieved an annual
                  revenue of 50 million. Unique Designs is not just a business — it’s a promise of
                  organic excellence.
                </p>

                <p>
                  Mission: Enable sustainable livelihoods through transparent, tech-enabled
                  supply chains, delivering traceable, high-quality products, and scaling
                  impact to benefit communities.
                </p>

                <p>
                  With numerous awards, including the Bhartiya Udyog Ratna Award, we prioritize
                  fair compensation, ethical sourcing, and inclusivity. Join us in building a
                  sustainable, transparent, and globally impactful ecosystem.
                </p>
              </div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* AWARDS */}
        <section ref={awardsRef} className="py-28" aria-labelledby="awards">
          <SectionContainer>
            <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="bg-black/45 backdrop-blur-md rounded-2xl p-10 border border-amber-500/10 shadow-lg">
              <h2 id="awards" className="text-3xl font-semibold text-amber-300 mb-6 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">Awards & Accomplishments</h2>

              <ul className="list-disc ml-6 space-y-3 text-gray-200 leading-relaxed">
                <li>Certified Startup by DPIIT, Govt. of India (DIPP48157)</li>
                <li>Provincial Govt. recognition under “START UP Jharkhand” (ABVIL 2019-0061)</li>
                <li>Registered under Ministry of MSME & ZED India (UDYAM-JH-0051133)</li>
                <li>Incubated by Indian Institute of Technology (ISM), Dhanbad</li>
                <li>Export Promotion Council Registration: RCMC/APEDA/02747/2023-2024</li>
                <li>IEC Certification: AAFFU6531M • Recognized by DGFT, Govt. of India</li>
                <li>
                  Recipient of Bhartiya Udyog Ratna Award by Hon. Minister Suresh Prabhu and
                  President Scout Award by Ms. Neelam Sanjiva Reddy
                </li>
                <li>
                  ISO 9001:2015 & FSSAI Certified for unmatched quality, safety, and consistency.
                </li>
              </ul>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <img src="/images/about/award1.png" alt="Award Ceremony" className="rounded-md border border-amber-300/10 shadow-sm w-full h-44 object-cover" />
                  <p className="text-sm text-gray-300 text-center italic mt-3">Award Ceremony 2019</p>
                </div>

                <div>
                  <img src="/images/about/award2.png" alt="Export Council Recognition" className="rounded-md border border-amber-300/10 shadow-sm w-full h-44 object-cover" />
                  <p className="text-sm text-gray-300 text-center italic mt-3">Recognition by Export Council</p>
                </div>
              </div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* MEDIA */}
        <section ref={mediaRef} className="py-28" aria-labelledby="media">
          <SectionContainer>
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="bg-black/45 backdrop-blur-md rounded-2xl p-10 border border-amber-500/10 shadow-lg">
              <h2 id="media" className="text-3xl font-semibold text-amber-300 mb-6 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">Media & Interviews</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="rounded-md overflow-hidden border border-amber-300/10 mb-4">
                    <iframe src="https://www.youtube.com/embed/glSMPZ83oUg" title="YouTube Video 1" allowFullScreen className="w-full aspect-video" />
                  </div>
                  <p className="text-sm text-gray-300 text-left italic">Television Interview with CEO of Unique Designs on Doordarshan Channel</p>
                </div>

                <div>
                  <div className="rounded-md overflow-hidden border border-amber-300/10 mb-4">
                    <iframe src="https://www.youtube.com/embed/KNQWXDWXAz4" title="YouTube Video 2" allowFullScreen className="w-full aspect-video" />
                  </div>
                  <p className="text-sm text-gray-300 text-left italic">Insights with Om: The Practice</p>
                </div>

                <div>
                  <div className="rounded-md overflow-hidden border border-amber-300/10 mb-4">
                    <iframe src="https://www.youtube.com/embed/3M3s9cbsKpE" title="YouTube Video 3" allowFullScreen className="w-full aspect-video" />
                  </div>
                  <p className="text-sm text-gray-300 text-left italic">Second Interview with CEO of Unique Designs on Doordarshan Channel</p>
                </div>

                {/* Thumbnails */}
                {[
                  {
                    src: "/images/about/udyog.png",
                    alt: "Newspaper Feature",
                    desc: `Receiving the Udyog Ratna
Awards from Mr. Suresh
Prabhu, (Minister of Railway,
Govt. of India) the highest
accolades for Industrialists.`,
                  },
                  {
                    src: "/images/about/presidentaward.png",
                    alt: "Award Function",
                    desc: `President Scout Award
from President of India
Ms. Neelam Sanjiva Reddy`,
                  },
                  {
                    src: "/images/about/news.png",
                    alt: "Press Coverage",
                    desc: `Newspaper Feature on
Unique Designs Job
Creation in Jharkhand
State`,
                  },
                ].map((img, idx) => (
                  <div key={idx}>
                    <button type="button" onClick={() => openLightbox(img.src, img.alt)} className="w-full text-left">
                      <img src={img.src} alt={img.alt} className="rounded-md border border-amber-300/10 shadow-sm w-full h-40 object-cover mb-2" />
                      <p className="text-sm text-gray-300 text-left italic whitespace-pre-line">{img.desc}</p>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </SectionContainer>
        </section>
      </main>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8" onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }} role="dialog" aria-modal="true">
          <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.18 }} className="relative max-w-[92vw] max-h-[92vh] w-full">
            <div className="bg-[#0b0b0e] rounded-lg p-4 flex flex-col items-center shadow-2xl border border-amber-300/8">
              <img src={lightboxSrc} alt={lightboxAlt} className="max-h-[80vh] w-auto object-contain rounded" />

              <div className="mt-4 flex items-center gap-3">
                <button onClick={closeLightbox} className="px-4 py-2 rounded border border-slate-700 bg-black/20 hover:bg-black/10 text-gray-100" aria-label="Close image">Close</button>

                <button onClick={() => downloadImage(lightboxSrc)} className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-black font-semibold" aria-label="Download image">Download</button>
              </div>

              {lightboxAlt && <p className="text-sm text-gray-300 mt-3 italic">{lightboxAlt}</p>}
            </div>
          </motion.div>
        </div>
      )}

      {/* FOOTER CTA */}
      <footer ref={footerRef} className="relative z-10 py-28">
        <SectionContainer>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="max-w-3xl mx-auto bg-black/50 backdrop-blur-md rounded-2xl p-12 border border-amber-300/8 shadow-lg">
            <h4 className="text-3xl font-semibold text-amber-300 mb-4">Ready to collaborate?</h4>
            <p className="text-gray-200 mb-6">Contact our team for partnerships, exports, or product sourcing.</p>
            <div className="text-center">
              <Link to="/ContactUs" className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 rounded-full transition">Connect with us</Link>
            </div>
          </motion.div>
        </SectionContainer>
      </footer>
    </div>
  );
}
