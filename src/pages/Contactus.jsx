"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";

// ✅ Background video section
const VideoBackground = () => (
  <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/videos/contact-us-bg.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
  </div>
);

const contactCards = [
  { icon: "📞", title: "Phone", content: "+91 9431350139" },
  { icon: "✉️", title: "Email", content: "uniquedesigns261@gmail.com" },
  { icon: "⏰", title: "Business Hours", content: "Open 24 x 7" },
  { icon: "📍", title: "Corporate Office", content: "Thesteelplus.com, India" },
];

const faqs = [
  {
    question: "How soon will I get a response?",
    answer:
      "We typically respond within 24 hours. For urgent inquiries, please call us directly.",
  },
  {
    question: "Do you handle export orders?",
    answer:
      "Yes, we specialize in large-scale export and international partnerships.",
  },
];

// --- THIS COMPONENT IS NOW FIXED ---
const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  
  // 1. Fixed the 'useState' object
  const [form, setForm] = useState({ 
    name: "",
    email: "",
    message: "" // Added missing 'message' property
  });

  // 2. Added the handler functions (these were missing/broken)
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  // 3. Added the 'return' statement for the JSX
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-black/60 backdrop-blur-lg border border-blue-500 rounded-lg p-6 shadow-lg hover:bg-black/70 transition-all"
    >
      <input
        required
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full rounded-lg px-4 py-2 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <input
        required
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="w-full rounded-lg px-4 py-2 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <textarea
        required
        rows="4"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Message"
        className="w-full rounded-lg px-4 py-2 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
      ></textarea>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition-all ${
          status === "sending"
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
        }`}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
        <Send size={18} />
      </button>

      {status === "sent" && (
        <p className="text-green-400 text-center mt-2 font-medium">
          ✅ Message sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-center mt-2 font-medium">
          ❌ Failed to send. Try again.
        </p>
      )}
    </form>
  );
};
// --- END OF FIX ---

export function Contactus() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-[#0b0b0e] text-white"
    >
      <VideoBackground />

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl pt-20 font-bold text-blue-400 mb-3">
          Let’s Connect & Collaborate
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Have a question, idea, or business inquiry? Reach out — our team is
          ready to help you 24/7.
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 px-6">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/3 w-full bg-black/50 backdrop-blur-lg border border-blue-500 rounded-xl p-8 shadow-lg shadow-black/60 hover:bg-black/70 transition-all"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-400">
            Contact Us
          </h2>
          <p className="text-gray-300 mb-8 text-sm leading-relaxed">
            We’d love to hear from you. Whether it’s about our products,
            collaborations, or support — our team is available 24/7.
          </p>

          <div className="space-y-4">
            {contactCards.map((item) => (
              <div key={item.title} className="flex gap-3 items-start text-sm">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="text-gray-400">{item.content}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs text-gray-500">
            © 2025 Unique Designs. All rights reserved.
          </div>
        </motion.div>

        {/* Right: Form + FAQs */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-2/3 w-full flex flex-col gap-8"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-blue-400">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>

          <div className="bg-black/50 backdrop-blur-lg border border-blue-500 rounded-lg p-6 shadow-lg hover:bg-black/70 transition-all">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Frequently Asked Questions
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {faqs.map((faq) => (
                <li key={faq.question}>
                  <strong className="text-white block">{faq.question}</strong>
                  <p className="pl-1">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

