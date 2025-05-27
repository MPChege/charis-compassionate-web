
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, PhoneCall, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charis-blue-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Charis Eagle Springs</h3>
            <p className="text-white/80 mb-4">
              Promoting mental well-being of the elderly through theatre and the arts. Upholding dignity across aging.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-charis-green-light transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-charis-green-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-charis-green-light transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <img 
                  src="/lovable-uploads/c5b2be7f-c9d2-401e-8b03-2b8f54fe800c.png" 
                  alt="X" 
                  className="w-5 h-5 filter brightness-0 invert hover:brightness-100 hover:invert-0 hover:contrast-100 transition-all"
                />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Theatre Workshops", path: "/programs" },
                { name: "Community Performances", path: "/programs" },
                { name: "Get Involved", path: "/get-involved" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-white/80 hover:text-white hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Programs</h3>
            <ul className="space-y-3">
              {[
                { name: "Theatre Workshops", path: "/programs" },
                { name: "Community Performances", path: "/programs" },
                { name: "Peer Support Groups", path: "/programs" },
                { name: "Awareness Campaigns", path: "/awareness-hub" },
              ].map((resource, index) => (
                <li key={index}>
                  <Link 
                    to={resource.path}
                    className="text-white/80 hover:text-white hover:underline transition-colors"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-charis-green-light" />
                <span className="text-white/80">
                  P.O. Box 62362-00200, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={20} className="mr-2 flex-shrink-0 text-charis-green-light" />
                <a 
                  href="tel:+254722679107" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  +254 722 679 107
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-charis-green-light" />
                <a 
                  href="mailto:shironjagi@gmail.com" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  shironjagi@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
          <p>© {new Date().getFullYear()} Charis Eagle Springs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
