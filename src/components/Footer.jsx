import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri'; // Correct import for the X icon

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#0A192F]/80 backdrop-blur-md border-t border-white/20 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
        
        {/* About Section */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-[#00D084]">CyberChapChap</h4>
          <p className="text-sm text-white/80">Securing African SMEs, one business at a time. We provide simple, effective cybersecurity solutions to protect your digital assets.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
          <p className="text-white/80">
            <span className="font-bold">Swalha Timimi</span><br />
            Technical University of Mombasa<br />
            <span className="font-semibold">Email:</span> cyberchapchap@tum.ac.ke
          </p>
        </div>
        
        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/80 hover:text-white transition-colors">
              <FaLinkedin size={24} />
            </a>
            {/* X (formerly Twitter) */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-white/80 hover:text-white transition-colors">
              <RiTwitterXFill size={24} />
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors">
              <FaInstagram size={24} />
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/80 hover:text-white transition-colors">
              <FaYoutube size={24} />
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/254717280536" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/80 hover:text-white transition-colors">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8 pt-4 border-t border-white/20 text-center text-white/60 text-sm">
        <p>© 2025 CyberChapChap. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;