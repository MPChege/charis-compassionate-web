
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, PhoneCall, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charis-blue-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Charis Eagle Springs</h3>
            <p className="text-white/80">
              Promoting compassionate care and raising awareness about elderly mental health.
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
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-charis-green-light transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Awareness Hub", path: "/awareness-hub" },
                { name: "Programs", path: "/programs" },
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

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Dementia Care Guide", path: "/awareness-hub" },
                { name: "Mental Health Support", path: "/awareness-hub" },
                { name: "Caregiver Resources", path: "/awareness-hub" },
                { name: "Community Programs", path: "/programs" },
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
                  123 Compassion Way, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={20} className="mr-2 flex-shrink-0 text-charis-green-light" />
                <a 
                  href="tel:+254123456789" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  +254 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-charis-green-light" />
                <a 
                  href="mailto:info@chariseaglesprings.org" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  info@chariseaglesprings.org
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
