
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AccessibilityToggle } from "./AccessibilityToggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Awareness Hub", path: "/awareness-hub" },
    { name: "Programs", path: "/programs" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/30 sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group" onClick={closeMenu}>
            <div className="relative overflow-hidden rounded-lg p-2 bg-white/90 backdrop-blur-sm group-hover:bg-white/95 group-hover:shadow-xl transition-all duration-300 border border-white/50">
              <img 
                src="/lovable-uploads/8549d152-f026-49a1-ba31-48a45e41b700.png" 
                alt="Charis Eagle Springs" 
                className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.name === "Get Involved" ? (
                <Button 
                  key={link.name}
                  asChild
                  variant="highlighted"
                  size="sm"
                  className="transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg bg-gradient-to-r from-charis-green-light to-charis-green hover:from-charis-green hover:to-charis-green-dark backdrop-blur-sm"
                >
                  <Link to={link.path}>
                    {link.name}
                  </Link>
                </Button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-base font-semibold transition-all duration-300 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/40 border border-transparent hover:border-white/30 ${
                    isActive(link.path) 
                      ? "text-charis-blue-dark bg-white/50 border-white/40 shadow-sm" 
                      : "text-gray-700 hover:text-charis-blue-dark"
                  } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-charis-blue-dark after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="ml-4 p-2 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors duration-300 border border-white/30">
              <AccessibilityToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-charis-blue-dark hover:bg-white/40 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-6 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-white/30 p-6">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  link.name === "Get Involved" ? (
                    <Button 
                      key={link.name} 
                      asChild 
                      variant="highlighted" 
                      className="w-full justify-start bg-gradient-to-r from-charis-green-light to-charis-green hover:from-charis-green hover:to-charis-green-dark backdrop-blur-sm"
                      onClick={closeMenu}
                    >
                      <Link to={link.path}>
                        {link.name}
                      </Link>
                    </Button>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`text-base font-semibold p-3 rounded-lg transition-all duration-300 backdrop-blur-sm border ${
                        isActive(link.path)
                          ? "bg-white/70 text-charis-blue-dark shadow-sm border-white/50"
                          : "text-gray-700 hover:bg-white/50 hover:text-charis-blue-dark border-transparent hover:border-white/40"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <div className="pt-4 border-t border-white/30">
                  <div className="p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30">
                    <AccessibilityToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
