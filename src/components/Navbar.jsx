import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* NOTE: 
  You can change the image paths for the menu icons in the <button>
  element below. I've used '/images/menu-icon.png' and 
  '/images/close-icon.png' as placeholders.
*/

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Array of navigation links for easier mapping
  const navLinks = [
    { to: '/', text: 'Homepage' },
    { to: '/AboutUs', text: 'Our Story' },
    { to: '/HerbalProducts', text: 'Herbal Products' },
    { to: '/Manures', text: 'Manures' },
    { to: '/FoodProducts', text: 'Food Products' },
    { to: '/FreshFromFarm', text: 'Fresh from Farm' },
    { to: '/ContactUs', text: 'Contact' },
  ];

  // Function to close the mobile menu when a link is clicked
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
            className="text-lg text-white font-medium hover:text-orange-500 transition-colors tracking-wider"
          >
            {link.text}
          </Link>
        ))}
      </nav>

      {/* --- Mobile Menu Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white z-50" // z-50 to ensure it's above other header content
        aria-label="Toggle menu"
      >
        {isOpen ? (
          // --- THIS IS THE "CLOSE" ICON ---
          <img
            src="/images/close-icon.png" // <-- REPLACE THIS PATH
            alt="Close menu"
            className="h-6 w-6" // Adjust size as needed
            // Fallback placeholder in case the image path is wrong
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src="https://placehold.co/32x32/ffffff/000000?text=X"; 
            }}
          />
        ) : (
          // --- THIS IS THE "HAMBURGER" ICON ---
          <img
            src="/images/menu-icon.png" // <-- REPLACE THIS PATH
            alt="Open menu"
            className="h-6 w-6" // Adjust size as needed
            // Fallback placeholder in case the image path is wrong
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src="https://placehold.co/32x32/ffffff/000000?text=M"; 
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
              className="text-2xl text-white font-medium hover:text-orange-500 transition-colors"
              onClick={handleLinkClick} // Close menu on click
            >
              {link.text}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}