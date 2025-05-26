
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Scene3D from "./Scene3D";
import FloatingElements3D from "./FloatingElements3D";

const slides = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/a5/2d/61/a52d61c409fa066a8b94e43e50469334.jpg",
    title: "Compassionate Care for Our Elderly",
    description: "Raising awareness about mental health issues affecting the elderly and promoting dignified, respectful care.",
    accent: "Transforming Lives"
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/20/fc/7c/20fc7c6771ecde7bc935b2725b577713.jpg",
    title: "Supporting Elderly Mental Health",
    description: "Providing resources and education for families, caregivers, and communities.",
    accent: "Building Support"
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/32/ab/05/32ab0541e0bf9c20d377c8fa5f3dc4ff.jpg",
    title: "Building Stronger Communities",
    description: "Creating networks of support for the elderly and their caregivers.",
    accent: "Stronger Together"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative bg-gradient-to-br from-charis-brown via-charis-copper to-charis-brown-dark pt-20 pb-32 md:pt-28 md:pb-40 overflow-hidden min-h-screen flex items-center">
      {/* 3D Floating Elements Background */}
      <FloatingElements3D />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-charis-gold/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-charis-copper/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-charis-gold/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-white animate-fade-in order-2 md:order-1">
            <div className="inline-flex items-center bg-charis-gold/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-charis-gold/30">
              <Play className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">{slides[currentSlide].accent}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="block text-white/90">{slides[currentSlide].title.split(' ').slice(0, 2).join(' ')}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-charis-gold to-charis-gold-dark">
                {slides[currentSlide].title.split(' ').slice(2).join(' ')}
              </span>
            </h1>
            
            <p className="text-xl mb-10 text-white/90 leading-relaxed max-w-lg">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Button asChild variant="highlighted" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-charis-gold to-charis-gold-dark hover:from-charis-gold-dark hover:to-charis-gold text-charis-brown-dark">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold border-2 border-white/30 hover:border-white/50 px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Link to="/awareness-hub">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            {/* 3D Scene */}
            <div className="mb-8">
              <Scene3D />
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-charis-gold/30 backdrop-blur-sm animate-zoom-in">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <div className="relative h-[300px] md:h-[400px]">
                {slides.map((slide, index) => (
                  <div 
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide 
                        ? "opacity-100 z-20 scale-100" 
                        : "opacity-0 z-0 scale-105"
                    }`}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-charis-cream/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-charis-gold/20 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-charis-gold to-charis-gold-dark rounded-full animate-pulse"></div>
                <span className="text-charis-brown-dark font-semibold">Active Now</span>
              </div>
              <p className="text-charis-brown mt-1">Making a difference today</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Slider Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? "w-12 h-3 bg-charis-gold shadow-lg scale-110" 
                : "w-3 h-3 bg-white/50 hover:bg-white/70 hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-charis-gold/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-charis-gold/30 transition-all duration-300 z-30 border border-charis-gold/30 shadow-xl hover:shadow-2xl hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-charis-gold/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-charis-gold/30 transition-all duration-300 z-30 border border-charis-gold/30 shadow-xl hover:shadow-2xl hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSlider;
