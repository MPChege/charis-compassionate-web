
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Compassionate Care for Our Elderly",
    description: "Raising awareness about mental health issues affecting the elderly and promoting dignified, respectful care."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Supporting Elderly Mental Health",
    description: "Providing resources and education for families, caregivers, and communities."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Building Stronger Communities",
    description: "Creating networks of support for the elderly and their caregivers."
  },
  {
    id: 4,
    image: "/lovable-uploads/edbba8da-699b-4792-9129-417439bd312c.png",
    title: "Empowering Through Connection",
    description: "Fostering meaningful relationships and social connections within our community to combat isolation and promote wellbeing."
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with better visibility */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            {/* Darker overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h1 className="font-heading text-white mb-8 leading-tight drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="group relative overflow-hidden bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-4 text-sm font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
              <Link to="/get-involved" className="flex items-center relative z-10">
                <Heart className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10"></div>
              </Link>
            </Button>
            <Button asChild className="group relative overflow-hidden border-2 border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-4 text-sm font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
              <Link to="/awareness-hub" className="flex items-center relative z-10">
                <Users className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Learn More
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10"></div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Slider Navigation */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-500 hover:scale-110 ${
              index === currentSlide 
                ? "bg-white w-12 shadow-lg" 
                : "bg-white/60 hover:bg-white/80 w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-8 bg-white/60"></div>
      </div>
    </section>
  );
};

export default HeroSlider;
