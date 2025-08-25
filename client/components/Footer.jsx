import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section: Links */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
          
          {/* Company */}
          <div className="text-center md:text-left">
            <p className="font-bold mb-4 text-indigo-500">COMPANY</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">Careers</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center md:text-left">
            <p className="font-bold mb-4 text-indigo-500">SUPPORT</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="text-center md:text-left">
            <p className="font-bold mb-4 text-indigo-500">FOLLOW US</p>
            <div className="flex justify-center md:justify-start gap-4 text-xl">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© 2025 Sanjeevani. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
