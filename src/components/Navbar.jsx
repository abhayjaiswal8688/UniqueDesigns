import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', text: 'HOME' },
    { to: '/AboutUs', text: 'ABOUT US' },
    { to: '/Fertilizers', text: 'FERTILIZERS' },
    { to: '/IndustrialChemicals', text: 'INDUSTRIAL CHEMICALS' },
    { to: '/FoodProducts', text: 'FOOD PRODUCTS' },
    { to: '/ContactUs', text: 'CONTACT US' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* --- Desktop Navigation --- */}
      <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm lg:text-base text-white font-medium hover:text-orange-500 transition-colors tracking-wider uppercase"
          >
            {link.text}
          </Link>
        ))}
      </nav>

      {/* --- Mobile Menu Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <img
            src="/images/close-icon.png"
            alt="Close menu"
            className="h-6 w-6"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/32x32/ffffff/000000?text=X';
            }}
          />
        ) : (
          <img
            src="/images/menu-icon.png"
            alt="Open menu"
            className="h-6 w-6"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/32x32/ffffff/000000?text=M';
            }}
          />
        )}
      </button>

      {/* --- Mobile Menu Panel (Overlay) --- */}
      <div
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-2xl text-white font-medium hover:text-orange-500 transition-colors tracking-wider uppercase"
              onClick={handleLinkClick}
            >
              {link.text}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}