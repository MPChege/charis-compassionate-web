
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Heart, Users } from "lucide-react";

const Mission = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  return (
    <section ref={elementRef} className="section-padding bg-gradient-to-br from-gray-50 to-white">
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
              <Button asChild className="group relative overflow-hidden bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
                <Link to="/about" className="flex items-center relative z-10">
                  <Users className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-2" />
                  <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10"></div>
                </Link>
              </Button>
              <Button asChild className="group relative overflow-hidden border-2 border-black text-black bg-transparent hover:bg-black hover:text-white px-8 py-4 transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
                <Link to="/get-involved" className="flex items-center relative z-10">
                  <Heart className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Get Involved
                  <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10"></div>
                </Link>
              </Button>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <div className="relative group elegant-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Elderly person with caregiver" 
                className="w-full h-[600px] object-cover rounded-lg shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
