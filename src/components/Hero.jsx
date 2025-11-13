import React from 'react'
import { Navbar } from './Navbar'
import { Link } from 'react-router-dom' // <-- 1. IMPORTED LINK

export function Hero() {
  return (
    <div className="relative">
      <header className="absolute top-0 left-0 right-0 z-15 p-6">
        <div className="container mx-auto flex justify-between items-center">
          
          {/* --- 2. REPLACED <a> with <Link> --- */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              className="h-10 w-auto md:h-12"
              src="/images/logo.png"
              alt="Unique Designs Logo"
            />
            
            <span className="text-xl font-bold text-white md:text-2xl">
              Unique Designs
            </span>
          </Link>
          {/* --- End of change --- */}

          <Navbar />
        </div>
      </header>
    </div>
  )
}