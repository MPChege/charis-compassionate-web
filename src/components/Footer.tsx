
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, PhoneCall, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Charis Eagle Springs</h3>
            <p className="text-white/80 mb-4">
              A community-centred organisation founded in 2019 by Director Margaret Njagi. We restore dignity, nurture mental wellbeing, and strengthen the safety net around older persons across Eastern Africa.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.facebook.com/share/1MdH7UoKBo/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-charis-blue hover:border-charis-blue transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/chariseaglesprings?igsh=dWpuaHUxcmhjMmx1" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-charis-blue hover:border-charis-blue transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-charis-blue hover:border-charis-blue transition-colors duration-300"
                aria-label="X (formerly Twitter)"
              >
                <img 
                  src="/lovable-uploads/c5b2be7f-c9d2-401e-8b03-2b8f54fe800c.png" 
                  alt="X" 
                  className="w-5 h-5 filter brightness-0 invert"
                />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Gallery", path: "/gallery" },
                { name: "Theatre & Arts for Healing", path: "/programs" },
                { name: "Train-the-Trainer Programs", path: "/programs" },
                { name: "Get Involved", path: "/get-involved" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-white/70 hover:text-charis-blue transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Our Programs</h3>
            <ul className="space-y-3">
              {[
                { name: "Theatre & Arts for Healing", path: "/programs" },
                { name: "Train-the-Trainer Programs", path: "/programs" },
                { name: "Feeding & Community Support", path: "/programs" },
                { name: "Economic Empowerment & Crafts", path: "/programs" },
              ].map((resource, index) => (
                <li key={index}>
                  <Link 
                    to={resource.path}
                    className="text-white/70 hover:text-charis-blue transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-charis-blue-dark flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <MapPin size={14} className="text-white" />
                </div>
                <span className="text-white/80">
                  P.O. Box 62362-00200, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-charis-blue-dark flex items-center justify-center mr-3 flex-shrink-0">
                  <PhoneCall size={14} className="text-white" />
                </div>
                <a 
                  href="tel:+254782679107" 
                  className="text-white/70 hover:text-charis-blue transition-all duration-300"
                >
                  +254 782 679 107
                </a>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-charis-blue-dark flex items-center justify-center mr-3 flex-shrink-0">
                  <Mail size={14} className="text-white" />
                </div>
                <a 
                  href="mailto:info@chariseaglesprings.org" 
                  className="text-white/70 hover:text-charis-blue transition-all duration-300"
                >
                  info@chariseaglesprings.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70">© {new Date().getFullYear()} Charis Eagle Springs. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link 
                to="/terms" 
                className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/contact" 
                className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
