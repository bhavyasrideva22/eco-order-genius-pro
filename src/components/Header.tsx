
import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-eco-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <IndianRupee size={24} className="text-eco-accent" />
          <span className="text-xl font-bold">Eco-Order Genius Pro</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-eco-accent transition-colors">Home</Link>
          <Link to="/" className="text-eco-accent font-medium">EOQ Calculator</Link>
          <Link to="/" className="hover:text-eco-accent transition-colors">About</Link>
          <Link to="/" className="hover:text-eco-accent transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
