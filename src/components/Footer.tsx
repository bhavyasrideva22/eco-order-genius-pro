
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-eco-primary text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Eco-Order Genius Pro</h3>
            <p className="text-sm text-white/80">
              Helping businesses optimize inventory management with advanced EOQ calculations.
              Save costs and improve efficiency with our tools.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-eco-accent transition-colors">Home</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-eco-accent transition-colors">EOQ Calculator</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-eco-accent transition-colors">About</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-eco-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <address className="not-italic text-white/80 space-y-2">
              <p>Email: contact@eco-order-genius.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Mumbai, India</p>
            </address>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Eco-Order Genius Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
