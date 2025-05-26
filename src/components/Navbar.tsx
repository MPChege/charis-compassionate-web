
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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img 
              src="/lovable-uploads/8549d152-f026-49a1-ba31-48a45e41b700.png" 
              alt="Charis Eagle Springs" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              link.name === "Get Involved" ? (
                <Button 
                  key={link.name}
                  asChild
                  variant="highlighted"
                  size="sm"
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  <Link to={link.path}>
                    {link.name}
                  </Link>
                </Button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-medium transition-colors duration-300 hover:text-charis-blue-dark ${
                    isActive(link.path) 
                      ? "text-charis-blue-dark border-b-2 border-charis-blue-dark" 
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <AccessibilityToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-charis-blue-dark"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4 pb-4">
              {navLinks.map((link) => (
                link.name === "Get Involved" ? (
                  <Button 
                    key={link.name} 
                    asChild 
                    variant="highlighted" 
                    className="w-full justify-start"
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
                    className={`text-base font-medium p-2 rounded-md transition-colors duration-300 ${
                      isActive(link.path)
                        ? "bg-charis-blue-light text-charis-blue-dark"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-2">
                <AccessibilityToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
