import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShitPost
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors ${location === "/" ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}>
              Home
            </Link>
            <Link href="/about" className={`transition-colors ${location === "/about" ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}>
              About Us
            </Link>
            <Link href="/shitpost-ai" className={`transition-colors ${location === "/shitpost-ai" ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}>
              ShitPost AI
            </Link>
            <Link href="/ai-tool" className={`transition-colors ${location === "/ai-tool" ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}>
              Career AI
            </Link>
            <Link href="/developer-hiring" className={`transition-colors ${location === "/developer-hiring" ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}>
              Careers
            </Link>
            <Link href="/get-employed">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                Get Employed
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            <Link href="/" className="block text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="block text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/shitpost-ai" className="block text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              ShitPost AI
            </Link>
            <Link href="/ai-tool" className="block text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              Career AI
            </Link>
            <Link href="/developer-hiring" className="block text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              Careers
            </Link>
            <Link href="/get-employed" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 mt-2">
                Get Employed
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
