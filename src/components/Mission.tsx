
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

const Mission = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  return (
    <section ref={elementRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <div className="mb-8">
              <span className="text-sm font-light tracking-widest text-gray-500 uppercase">
                Our Purpose
              </span>
            </div>
            <h2 className="font-heading text-black mb-8">
              Our Mission
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg font-light leading-relaxed">
                At Charis Eagle Springs, we are dedicated to raising awareness about mental health issues affecting the elderly and promoting compassionate, dignified care for our senior citizens.
              </p>
              <p className="text-lg font-light leading-relaxed">
                We believe that every elderly person deserves respect, understanding, and quality care that enhances their wellbeing and preserves their dignity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Button asChild className="btn-primary group">
                <Link to="/about" className="flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild className="btn-secondary">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <div className="relative group elegant-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsuIv5j-qDUVK7UzY60reSqYfQeCu3laidA&s" 
                alt="Elderly person with caregiver" 
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
