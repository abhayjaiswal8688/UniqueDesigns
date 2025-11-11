import React from 'react'

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-800/90 border-white/40 border-t text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                className="h-10 w-auto"
                src="/images/logo.png"
                alt="Unique Designs Logo"
              />
              <span className="text-xl font-bold text-white">
                Unique Designs
              </span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Excellence in every product, from sustainable agri-goods to
              artisan handicrafts.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500">
                
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.98h2.77l-.44 2.9h-2.33v7c4.78-.75 8.44-4.9 8.44-9.9C22 6.53 17.5 2.04 12 2.04z" />
                </svg>
              </a>
              <a href="#" className="hover:text-orange-500">
                
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Instagram icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.44c-3.115 0-3.486.011-4.698.068-2.924.132-4.043 1.258-4.173 4.173-.057 1.212-.068 1.583-.068 4.698s.011 3.486.068 4.698c.13 2.915 1.249 4.043 4.173 4.173 1.212.057 1.583.068 4.698.068s3.486-.011 4.698-.068c2.924-.13 4.043-1.258 4.173-4.173.057-1.212.068-1.583.068-4.698s-.011-3.486-.068-4.698c-.13-2.915-1.249-4.043-4.173-4.173-1.212-.057-1.583-.068-4.698-.068zm0 2.951c-3.033 0-5.485 2.452-5.485 5.485s2.452 5.485 5.485 5.485 5.485-2.452 5.485-5.485S15.033 6.554 12 6.554zm0 8.927c-1.905 0-3.442-1.537-3.442-3.442s1.537-3.442 3.442-3.442 3.442 1.537 3.442 3.442S13.905 15.481 12 15.481zm4.868-8.15c-.605 0-1.096.49-1.096 1.096s.491 1.096 1.096 1.096 1.096-.49 1.096-1.096-.49-1.096-1.096-1.096z"
                  />
                </svg>
              </a>
              <a href="#" className="hover:text-orange-500">
                
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.98 2H7.02C4.25 2 2 4.25 2 7.02v9.96C2 19.75 4.25 22 7.02 22h9.96C19.75 22 22 19.75 22 16.98V7.02C22 4.25 19.75 2 16.98 2zM8.98 19H5.98V9.98h3V19zm-1.5-10.3c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75S8.45 8.7 7.48 8.7zm10.5 10.3h-3v-4.6c0-1.1-.02-2.5-1.52-2.5s-1.75 1.2-1.75 2.4v4.7h-3V9.98h2.88v1.32h.04c.4-.76 1.38-1.55 2.84-1.55 3.04 0 3.6 2 3.6 4.6v5.3z" />
                </svg>
              </a>
            </div>
          </div>

          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="/" className="hover:text-orange-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#agri" className="hover:text-orange-500">
                  Agri-Products
                </a>
              </li>
              <li>
                <a href="#handicrafts" className="hover:text-orange-500">
                  Handicrafts
                </a>
              </li>
              <li>
                <a href="#industrial" className="hover:text-orange-500">
                  Industrial Goods
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Headquarters (India)
            </h3>
            <address className="text-gray-400 not-italic space-y-2">
              <p>
                Unique Designs
                <br />
                Ranchi, Jharkhand, India
              </p>
              <p>
                <a
                  href="mailto:info.in@uniquedesigns.com"
                  className="hover:text-orange-500"
                >
                  info.in@uniquedesigns.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+910000000000"
                  className="hover:text-orange-500"
                >
                  +91 (000) 000-0000
                </a>
              </p>
            </address>
          </div>

          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Headquarters (Canada)
            </h3>
            <address className="text-gray-400 not-italic space-y-2">
              <p>
                Unique Designs
                <br />
                Vancouver, BC, Canada
              </p>
              <p>
                <a
                  href="mailto:info.ca@uniquedesigns.com"
                  className="hover:text-orange-500"
                >
                  info.ca@uniquedesigns.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+10000000000"
                  className="hover:text-orange-500"
                >
                  +1 (000) 000-0000
                </a>
              </p>
            </address>
          </div>
        </div>

        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
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