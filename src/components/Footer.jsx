import React from 'react'
import { Link } from 'react-router-dom'
import FbIcon from '/src/images/facebook.svg?react'
import IgIcon from '/src/images/instagram.svg?react'
import LiIcon from '/src/images/linkedin.svg?react'

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-800/90 border-white/40 border-t text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="bg-gray-700/20 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-colors duration-300 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <img
                  className="h-10 w-auto group-hover:opacity-90 transition-opacity"
                  src="/images/logo.png"
                  alt="Unique Designs Logo"
                />
                <span className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                  Unique Designs
                </span>
              </Link>
              <p className="text-gray-400 text-sm text-justify leading-relaxed">
                Connecting sustainable farms to the global market. Discover our premium collection of herbal, food, and farm products.
              </p>
            </div>
            
            <div className="flex space-x-4 pt-6 mt-auto">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors transform hover:scale-110 duration-200">
                <FbIcon className="w-6 h-6 fill-current" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors transform hover:scale-110 duration-200">
                <IgIcon className="w-6 h-6 fill-current" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors transform hover:scale-110 duration-200">
                <LiIcon className="w-6 h-6 fill-current" />
              </a>
            </div>
          </div>

          <div className="bg-gray-700/20 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-colors duration-300 h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/AboutUs" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/HerbalProducts" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block">
                  Herbal Products
                </Link>
              </li>
              <li>
                <Link to="/Manures" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block">
                  Manures
                </Link>
              </li>
              <li>
                <Link to="/FoodProducts" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block">
                  Food Products
                </Link>
              </li>
              <li>
                <Link to="/FreshFromFarm" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block">
                  Fresh from Farm
                </Link>
              </li>
              <li>
                <Link to="/ContactUs" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-gray-700/20 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-colors duration-300 h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              India HQ
            </h3>
            <address className="text-gray-400 not-italic space-y-4 text-sm">
              <div className="leading-relaxed">
                <strong className="text-gray-300 block mb-1">Unique Designs</strong>
                Tupudana Industrial Area,<br />
                Tupudana, Ranchi,<br />
                Jharkhand, India
              </div>
              <div className="pt-4 border-t border-gray-700/50 space-y-2">
                <a
                  href="mailto:info.in@uniquedesigns.com"
                  className="block hover:text-orange-500 transition-colors"
                >
                  info.in@uniquedesigns.com
                </a>
                <div className="flex flex-col space-y-1">
                  <a href="tel:+919431350179" className="hover:text-orange-500 transition-colors">
                    +91 94313 50179
                  </a>
                  <a href="tel:+919122198880" className="hover:text-orange-500 transition-colors">
                    +91 91221 98880
                  </a>
                </div>
              </div>
            </address>
          </div>

          <div className="bg-gray-700/20 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-colors duration-300 h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Canada HQ
            </h3>
            <address className="text-gray-400 not-italic space-y-4 text-sm">
              <div className="leading-relaxed">
                <strong className="text-gray-300 block mb-1">Unique Designs</strong>
                Ford Pitt Road, Pitt Meadows,<br />
                Vancouver, BC,<br />
                Canada
              </div>
              <div className="pt-4 border-t border-gray-700/50 space-y-2">
                <a
                  href="mailto:info.ca@uniquedesigns.com"
                  className="block hover:text-orange-500 transition-colors"
                >
                  info.ca@uniquedesigns.com
                </a>
                <div className="flex flex-col space-y-1">
                  <a href="tel:+16044174321" className="hover:text-orange-500 transition-colors">
                    +1 604 417 4321
                  </a>
                  <a href="tel:+16049519511" className="hover:text-orange-500 transition-colors">
                    +1 604 951 9511
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Unique Designs. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer