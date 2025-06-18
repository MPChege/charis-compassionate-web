
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
        : "bg-white/10 backdrop-blur-sm"
    }`}>
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group" onClick={closeMenu}>
            <div className="relative overflow-hidden transition-all duration-300 group-hover:scale-105">
              <img 
                src="/lovable-uploads/edbba8da-699b-4792-9129-417439bd312c.png" 
                alt="Charis Eagle Springs" 
                className="h-10 w-auto md:h-12 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.name === "Get Involved" ? (
                <Button 
                  key={link.name}
                  asChild
                  className="group relative overflow-hidden bg-gradient-to-r from-charis-blue to-charis-purple text-white hover:from-charis-purple hover:to-charis-blue border-0 px-6 py-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-full"
                >
                  <Link to={link.path} className="relative z-10">
                    <span className="transition-transform duration-300 group-hover:scale-110 font-medium">
                      {link.name}
                    </span>
                  </Link>
                </Button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide transition-all duration-300 py-2 group ${
                    scrolled 
                      ? (isActive(link.path) ? "text-charis-blue-dark font-semibold" : "text-gray-700 hover:text-charis-blue-dark")
                      : (isActive(link.path) ? "text-white font-semibold" : "text-white/90 hover:text-white")
                  } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 ${
                    scrolled ? "after:bg-charis-blue" : "after:bg-white"
                  } after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 ${
                    isActive(link.path) ? "after:w-full after:left-0" : ""
                  }`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-105">
                    {link.name}
                  </span>
                </Link>
              )
            ))}
            <div className="ml-4">
              <AccessibilityToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-all duration-300 hover:scale-110 rounded-md ${
              scrolled ? "text-gray-700 hover:text-charis-blue-dark hover:bg-gray-100" : "text-white/90 hover:text-white hover:bg-white/10"
            }`}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? "max-h-screen opacity-100 mt-6" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
          <div className="bg-white/98 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 p-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.name === "Get Involved" ? (
                  <Button 
                    key={link.name} 
                    asChild 
                    className="group relative overflow-hidden bg-gradient-to-r from-charis-blue to-charis-purple text-white hover:from-charis-purple hover:to-charis-blue w-full justify-center py-3 transition-all duration-300 hover:scale-105 rounded-full"
                    onClick={closeMenu}
                  >
                    <Link to={link.path} className="relative z-10">
                      <span className="transition-transform duration-300 group-hover:scale-110 font-medium">
                        {link.name}
                      </span>
                    </Link>
                  </Button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium tracking-wide transition-all duration-300 py-3 px-4 rounded-lg hover:scale-105 transform text-center ${
                      isActive(link.path)
                        ? "text-charis-blue-dark bg-charis-blue/10 font-semibold"
                        : "text-gray-700 hover:text-charis-blue-dark hover:bg-gray-50"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-gray-200 flex justify-center">
                <AccessibilityToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
