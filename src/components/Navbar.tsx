
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AccessibilityToggle } from "./AccessibilityToggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Awareness Hub", path: "/awareness-hub" },
    { name: "Programs", path: "/programs" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" 
        : "bg-transparent"
    }`}>
      <div className="container-custom py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group" onClick={closeMenu}>
            <div className="relative overflow-hidden p-1">
              <img 
                src="/lovable-uploads/8549d152-f026-49a1-ba31-48a45e41b700.png" 
                alt="Charis Eagle Springs" 
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              link.name === "Get Involved" ? (
                <Button 
                  key={link.name}
                  asChild
                  className="btn-primary"
                >
                  <Link to={link.path}>
                    {link.name}
                  </Link>
                </Button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-light tracking-wide transition-all duration-300 py-2 ${
                    isActive(link.path) 
                      ? "text-black" 
                      : "text-gray-600 hover:text-black"
                  } after:content-[''] after:absolute after:w-0 after:h-px after:bottom-0 after:left-1/2 after:bg-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 ${
                    isActive(link.path) ? "after:w-full after:left-0" : ""
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="ml-4">
              <AccessibilityToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors duration-300"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-8 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 p-8">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  link.name === "Get Involved" ? (
                    <Button 
                      key={link.name} 
                      asChild 
                      className="btn-primary w-full justify-center"
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
                      className={`text-lg font-light tracking-wide transition-all duration-300 py-2 ${
                        isActive(link.path)
                          ? "text-black"
                          : "text-gray-600 hover:text-black"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <div className="pt-6 border-t border-gray-200">
                  <AccessibilityToggle />
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
