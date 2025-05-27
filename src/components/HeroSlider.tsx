
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/a5/2d/61/a52d61c409fa066a8b94e43e50469334.jpg",
    title: "Compassionate Care for Our Elderly",
    description: "Raising awareness about mental health issues affecting the elderly and promoting dignified, respectful care."
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/20/fc/7c/20fc7c6771ecde7bc935b2725b577713.jpg",
    title: "Supporting Elderly Mental Health",
    description: "Providing resources and education for families, caregivers, and communities."
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/32/ab/05/32ab0541e0bf9c20d377c8fa5f3dc4ff.jpg",
    title: "Building Stronger Communities",
    description: "Creating networks of support for the elderly and their caregivers."
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
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-30" : "opacity-0"
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/70"></div>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h1 className="font-heading text-black mb-8 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="btn-primary group">
              <Link to="/get-involved" className="flex items-center">
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild className="btn-secondary">
              <Link to="/awareness-hub">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Minimal Slider Navigation */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-black w-8" 
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-8 bg-black/30"></div>
      </div>
    </section>
  );
};

export default HeroSlider;
