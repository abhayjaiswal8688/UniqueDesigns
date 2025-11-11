"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Aboutus.jsx
 * - SAME as your provided file, only change: image full-view modal for thumbnails.
 * - Modal supports: click outside to close, ESC to close, Download button.
 */

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
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
  </div>
);

const SectionContainer = ({ children, className = "" }) => (
  <div className={`relative z-10 max-w-7xl mx-auto px-6 ${className}`}>{children}</div>
);

export function Aboutus() {
  // ---------- Lightbox state & helpers (ONLY added code) ----------
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

  const downloadImage = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "image";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  // ----------------------------------------------------------------

  return (
    <div className="relative min-h-screen py-24 text-white bg-[#0b0b0e]">
      <VideoBackground />

      {/* MAIN TWO-COLUMN CONTENT */}
      <main className="relative z-10 py-14">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LEFT: ABOUT */}
            <motion.article
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-black/50 backdrop-blur-md border border-orange-500/70 rounded-2xl p-8 shadow-xl"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 items-start justify-center">
                  <div className="rounded-md overflow-hidden border-4 border-orange-500/60 shadow-2xl w-48 h-48 flex items-center justify-center bg-white/5 mb-4">
                    <img
                      src="/images/about/ceo.png"
                      alt="CEO - Raakesh Raj"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* ⬇ Caption space under image */}
                  <p className="text-sm text-gray-300 text-center italic">
                    Raakesh Raj — CEO & Founder
                  </p>
                </div>

                <div className="md:w-2/3 ml-2">
                  <h2 className="text-2xl font-bold mb-3 text-orange-400">Who we are</h2>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    Founded in 2007 as <strong>INTERIOR COLLECTION</strong>, Unique Designs
                    has evolved into an export-focused enterprise supporting small
                    farmers and skilled artisans. Headquartered in Ranchi, India with
                    presence in Vancouver, we partner with local communities to
                    deliver premium agri-products, handicrafts and industrial goods.
                    It was highly challenging to grow faster
                    in the time of cut-throat competition
                    in the domestic as well as overseas
                    markets, through we managed to
                    achieve our desired goals with greater
                    teamwork and sheer conviction within
                    a short span of merely 4 years.
                  </p>

                  <ul className="list-disc ml-5 text-gray-300 space-y-2 mt-2">
                    <li>Vermicompost, Finger Millet, Lotus Seeds &amp; Premium Spices</li>
                    <li>Handicrafts, Painterly Art &amp; Handwoven Products</li>
                    <li>Stainless steel and UPVC industrial goods</li>
                    <li>Incubated at IIT(ISM) Dhanbad • Export registrations in place</li>
                  </ul>
                </div>
              </div>
            </motion.article>

            {/* RIGHT: VISION & MISSION */}
            <motion.section
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="bg-black/50 backdrop-blur-md border border-orange-500/70 rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Vision &amp; Mission</h3>

              <p className="text-gray-200 leading-relaxed mb-4">
                Our primary objective is to aid small farmers and skilled artisans,
                specialising in Vermicompost, Finger Millet, Lotus Seeds,
                Jackfruits, Rice & Agri products, Handicraft, and Organic Herbal
                essentials With headquarters in Ranchi, Jharkhand, India, and
                Vancouver, BC, Canada, we have established ourselves as a
                pivotal player in the global products market.
              </p>
              <p className="text-gray-200 leading-relaxed mb-4">
                    Our team of 20+ professionals and a 300+ farmer cooperative
                    drives quality-first production, ethical sourcing and sustainable
                    growth. We’re incubated at IIT Dhanbad and certified under multiple
                    national export and quality standards.
                    With an annual
                    revenue of 50 million, Unique Designs is more than just a business;
                    it's a commitment to excellence in organic exports. We have
                    successfully carved a niche in the market through our top-notch
                    products and unwavering dedication to quality.
                  </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                Mission: enable sustainable livelihoods through transparent, tech-enabled
                supply chains; deliver traceable, high-quality products; and scale impact
                to benefit communities.
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
              With numerous certifications and awards, including the Bhartiya Udyog Ratna Award, we prioritize ethical sourcing, fair compensation, and transparency in our cooperative approach, fostering inclusive growth. As we continue to expand globally, we invite you to join us in revolutionizing organic farming for a healthier and more sustainable world.
              </p>
            </motion.section>
          </div>
        </SectionContainer>
      </main>

      {/* AWARDS & ACCOMPLISHMENTS */}
      <section className="relative z-10 py-8">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: bullets */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white/6 backdrop-blur-sm border border-orange-500/70 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-orange-400 mb-4">
                Awards &amp; Accomplishments
              </h3>
              <ul className="list-disc ml-6 space-y-3 text-gray-200">
                <li>Certified as a registered "START UP" by the
                Department for Promotion of Industry and
                Trade, Govt. of India (DIPP48157).</li>
                <li>PProvincial Govt. registration and recognition as
                “START UP” by Department of IT, Govt. of
                Jharkhand State (ABVIL 2019-0061).</li>
                <li>Registered under Ministry of MSME, Govt. of ZED
                India (UDYAM- JH- 0051133) and
                ZERO
                Certification under “ZERO DEFECT
                EFFECT”
                .</li>
                <li>Incubated by the Indian Institute of Technology,
                Dhanbad.</li>
                <li>Export Promotion Council Registration number
                RCMC/APEDA/02747/2023-2024.</li>
                <li>IEC Certifications by Director General Foreign Trade, Govt.
                of India (IEC Number: AAFFU6531M). Received the Udyog.</li>
                <li>Ratna Awards from Mr. Suresh Prabhu, (Minister of
                Railway, Govt. of India) the highest accolades for
                Industrialists. President Scout Award from President of
                India (Ms. Neelam Sanjiva Reddy). Worked for Stage, All
                India Radio, TV & Film for number of years and won number
                of Awards. Veteran “Social Activist” and “Spiritual writer”
                writing in Journals & Papers.</li>
                <li>We take pride in being an ISO 9001:2015 and FSSAI certified
                company, ensuring that every product we deliver meets the
                highest standards of quality, safety, and consistency.</li>
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <img
                    src="/images/about/award1.png"
                    alt="award 1"
                    className="rounded-md border border-orange-500/60 shadow-md w-full h-40 object-cover mb-4"
                  />
                  <p className="text-sm text-gray-300 text-center italic">Award Ceremony 2019</p>
                </div>

                <div>
                  <img
                    src="/images/about/award2.png"
                    alt="award 2"
                    className="rounded-md border border-orange-500/60 shadow-md w-full h-40 object-cover mb-4"
                  />
                  <p className="text-sm text-gray-300 text-center italic">Recognition by Export Council</p>
                </div>
              </div>
            </motion.div>

            {/* Right: media thumbnails */}
            {/* Media & Interviews (with your 3 YouTube videos) */}
<motion.div
  initial={{ x: 20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="bg-white/6 backdrop-blur-sm border border-orange-500/70 rounded-2xl p-6 shadow-lg"
>
  <h3 className="text-2xl font-bold text-orange-400 mb-4">Media & Interviews</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Video 1 */}
    <div>
      <div className="rounded-md overflow-hidden border border-orange-500/60 mb-4">
        <iframe
          src="https://www.youtube.com/embed/glSMPZ83oUg"
          title="YouTube Video 1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video"
        ></iframe>
      </div>
      <p className="text-sm text-gray-300 text-center italic">Television Interview with CEO of Unique
      Designs on Doordarshan Channel</p>
    </div>

    {/* Video 2 */}
    <div>
      <div className="rounded-md overflow-hidden border border-orange-500/60 mb-4">
        <iframe
          src="https://www.youtube.com/embed/KNQWXDWXAz4"
          title="YouTube Video 2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video"
        ></iframe>
      </div>
      <p className="text-sm text-gray-300 text-center italic">
      Insights with Om: The Practice</p>
    </div>

    {/* Video 3 */}
    <div>
      <div className="rounded-md overflow-hidden border border-orange-500/60 mb-4">
        <iframe
          src="https://www.youtube.com/embed/3M3s9cbsKpE"
          title="YouTube Video 3"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video"
        ></iframe>
      </div>
      <p className="text-sm text-gray-300 text-center italic">Second Interview with CEO of Unique
      Designs on Doordarshan Channel</p>
    </div>

    {/* Three image thumbnails (now open fullview on click) */}
    <div>
      <button
        type="button"
        onClick={() => openLightbox("/images/about/udyog.png", "Newspaper Feature")}
        className="w-full text-left"
      >
        <img
          src="/images/about/udyog.png"
          alt="Media Thumbnail 1"
          className="rounded-md border border-orange-500/60 shadow-md w-full h-40 object-cover mb-4"
        />
        <p className="text-sm text-gray-300 text-center italic">Receiving the Udyog Ratna
Awards from Mr. Suresh
Prabhu, (Minister of Railway,
Govt. of India) the highest
accolades for Industrialists.</p>
      </button>
    </div>

    <div>
      <button
        type="button"
        onClick={() => openLightbox("/images/about/presidentaward.png", "Award Function")}
        className="w-full text-left"
      >
        <img
          src="/images/about/presidentaward.png"
          alt="Media Thumbnail 2"
          className="rounded-md border border-orange-500/60 shadow-md w-full h-40 object-cover mb-4"
        />
        <p className="text-sm text-gray-300 text-center italic">President Scout Award
from President of India
Ms. Neelam Sanjiva Reddy</p>
      </button>
    </div>

    <div>
      <button
        type="button"
        onClick={() => openLightbox("/images/about/news.png", "Press Coverage")}
        className="w-full text-left"
      >
        <img
          src="/images/about/news.png"
          alt="Media Thumbnail 3"
          className="rounded-md border border-orange-500/60 shadow-md w-full h-40 object-cover mb-4"
        />
        <p className="text-sm text-gray-300 text-center italic">Newspaper Feature on
Unique Designs Job
Creation in Jharkhand
State</p>
      </button>
    </div>
  </div>
</motion.div>

          </div>
        </SectionContainer>
      </section>

      {/* ---------- Lightbox modal (only added code) ---------- */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-[90vw] max-h-[90vh] w-full"
          >
            <div className="bg-black/90 rounded-md p-4 flex flex-col items-center">
              <img
                src={lightboxSrc}
                alt={lightboxAlt}
                className="max-h-[80vh] w-auto object-contain rounded"
              />

              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={closeLightbox}
                  className="px-3 py-2 rounded bg-white/5 hover:bg-white/10"
                  aria-label="Close image"
                >
                  Close
                </button>

                <button
                  onClick={() => downloadImage(lightboxSrc)}
                  className="px-3 py-2 rounded bg-orange-500 hover:bg-orange-400 text-black font-semibold"
                  aria-label="Download image"
                >
                  Download
                </button>
              </div>

              {lightboxAlt && <p className="text-sm text-gray-300 mt-3 italic">{lightboxAlt}</p>}
            </div>
          </motion.div>
        </div>
      )}
      {/* ----------------------------------------------------- */}

      {/* CTA / Footer band */}
      <footer className="relative z-10 py-12">
        <SectionContainer>
          <div className="bg-black/50 backdrop-blur-md border border-orange-500/70 rounded-2xl p-8 text-center shadow-lg">
            <h4 className="text-2xl md:text-3xl font-bold mb-3 text-orange-400">
              Ready to collaborate?
            </h4>
            <p className="text-gray-300 mb-6">
              Contact our team for partnerships, exports, or product sourcing.
            </p>
            <Link
              to="/ContactUs"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Connect with us
            </Link>
          </div>
        </SectionContainer>
      </footer>
    </div>
  );
}