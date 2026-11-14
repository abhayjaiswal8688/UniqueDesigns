"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// BG Video
const VideoBackground = () => (
  <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
      <source src="/videos/contact-us-bg.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
  </div>
);

// CONTACT DATA
const phoneNumbers = {
  india: ["+91 94313 50139", "+91 91221 98880"],
  canada: ["+1 604 417 4321", "+1 604 951 9511"],
};

const contactCards = [
  {
    icon: Clock,
    title: "Business Hours",
    content: "Open 24 x 7",
  },
  {
    icon: MapPin,
    title: "Headquarters (India)",
    content: "Tupudana Industrial Area, Tupudana, Ranchi, Jharkhand, India",
  },
  {
    icon: MapPin,
    title: "Headquarters (Canada)",
    content: "Pitt Meadows, Vancouver, BC, Canada",
  },
];

const CONTACT_EMAIL = "udexports.exim@gmail.com";
const CONTACT_EMAIL_2 = "uniquedesigns.exim@gmail.com";

// FAQs
const faqs = [
  {
    question: "How soon will I get a response?",
    answer: "We typically respond within 24 hours. For urgent inquiries, call us directly.",
  },
  {
    question: "Do you handle export orders?",
    answer: "Yes, we specialize in large-scale export and international partnerships.",
  },
];

// LINKS HELPERS (JS VERSION)
const getWhatsAppLink = (number) => {
  const digits = number.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
};

const getGmailLink = (email) => {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
};

// CONTACT FORM
const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
          Message sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-center mt-2 font-medium">
          Failed to send. Try again.
        </p>
      )}
    </form>
  );
};

// MAIN COMPONENT
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
          Have a question, idea, or business inquiry? Reach out — we respond fast.
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 px-6">
        
        {/* LEFT CARD */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/3 w-full bg-black/50 backdrop-blur-lg border border-blue-500 rounded-xl p-8 shadow-lg shadow-black/60 hover:bg-black/70 transition-all"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Contact Us</h2>

          {/* PHONE SECTION */}
          <div className="space-y-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/60">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Call / WhatsApp</h3>
            </div>

            {/* INDIA */}
            <div className="ml-1 space-y-1 text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                India
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {phoneNumbers.india.map((num) => (
                  <a
                    key={num}
                    href={getWhatsAppLink(num)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-300 hover:underline"
                  >
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span>{num}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* CANADA */}
            <div className="ml-1 space-y-1 text-sm mt-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Canada
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {phoneNumbers.canada.map((num) => (
                  <a
                    key={num}
                    href={getWhatsAppLink(num)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-300 hover:underline"
                  >
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span>{num}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/60">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Email</h3>
            </div>
            <a
              href={getGmailLink(CONTACT_EMAIL)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-blue-300 hover:underline"
            >
              <Mail className="w-4 h-4" />
              <span>{CONTACT_EMAIL}</span>
            </a>
            <a
              href={getGmailLink(CONTACT_EMAIL)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-blue-300 hover:underline"
            >
              <Mail className="w-4 h-4" />
              <span>{CONTACT_EMAIL_2}</span>
            </a>
          </div>

          {/* OTHER CARDS */}
          <div className="space-y-4 mt-4">
            {contactCards.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 items-start text-sm rounded-lg border border-blue-500/40 bg-black/40 px-4 py-3"
              >
                <item.icon className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="text-gray-400 text-xs leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs text-gray-500">
            © 2025 Unique Designs. All rights reserved.
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
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
