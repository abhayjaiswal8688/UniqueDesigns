import React from 'react'
import { Link } from 'react-router-dom'
import FbIcon from '/src/images/facebook.svg?react'
import IgIcon from '/src/images/instagram.svg?react'
import LiIcon from '/src/images/linkedin.svg?react'

const developers = [
  { name: 'Abhay', url: 'https://github.com/abhayjaiswal8688?tab=repositories' },
  { name: 'Anish', url: 'https://github.com/Anish-Prime' },
  { name: 'Sarthak', url: 'https://github.com/Sarthak-hyper' },
]

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
                  alt="Unique Designs Group of Industries Logo"
                />
                <span className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                  Unique Designs
                </span>
              </Link>
              <p className="text-gray-400 text-sm text-justify leading-relaxed">
                Unique Designs Group of Industries — connecting Indian manufacturing and sustainable agriculture to global markets with quality fertilizers, industrial chemicals, and food products.
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
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block uppercase">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/AboutUs" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block uppercase">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/Fertilizers" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block uppercase">
                  FERTILIZERS
                </Link>
              </li>
              <li>
                <Link to="/IndustrialChemicals" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block uppercase">
                  INDUSTRIAL CHEMICALS
                </Link>
              </li>
              <li>
                <Link to="/FoodProducts" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block uppercase">
                  FOOD PRODUCTS
                </Link>
              </li>
              <li>
                <Link to="/ContactUs" className="hover:text-orange-500 hover:pl-1 transition-all duration-200 block uppercase">
                  CONTACT US
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
                <strong className="text-gray-300 block mb-1">Unique Designs Group of Industries</strong>
                Tupudana Industrial Area,<br />
                Tupudana, Ranchi,<br />
                Jharkhand, India
              </div>
              <div className="pt-4 border-t border-gray-700/50 space-y-2">
                <a
                  href="mailto:uniquedesigns.exim@gmail.com"
                  className="block hover:text-orange-500 transition-colors"
                >
                  uniquedesigns.exim@gmail.com
                </a>
                <div className="flex flex-col space-y-1.5">
                  <a href="tel:+918920264583" className="hover:text-orange-500 transition-colors">
                    +91 8920264583
                  </a>
                  <a href="tel:+919431350139" className="hover:text-orange-500 transition-colors">
                    +91 94313 50139
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
                <strong className="text-gray-300 block mb-1">Unique Designs Group of Industries</strong>
                Pitt Meadows,<br />
                Vancouver, BC,<br />
                Canada
              </div>
              <div className="pt-4 border-t border-gray-700/50 space-y-2">
                <a
                  href="mailto:udexports.exim@gmail.com"
                  className="block hover:text-orange-500 transition-colors"
                >
                  udexports.exim@gmail.com
                </a>
                <div className="flex flex-col space-y-1">
                  <a href="tel:+16049519511" className="hover:text-orange-500 transition-colors">
                    +1 604 951 9511
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm space-y-3">
          <p>
            &copy; {new Date().getFullYear()} Unique Designs Group of Industries. All rights
            reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Developed by</span>
            {developers.map((dev, index) => (
              <React.Fragment key={dev.name}>
                <a
                  href={dev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-300 hover:text-orange-500 transition-colors"
                >
                  {dev.name}
                </a>
                {index < developers.length - 2 && <span aria-hidden="true">,</span>}
                {index === developers.length - 2 && <span>&amp;</span>}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer