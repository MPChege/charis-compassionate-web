
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative bg-gradient-to-br from-charis-blue to-charis-purple pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8 text-white/90">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-charis-blue text-white hover:bg-charis-blue-dark font-semibold shadow-lg border-2 border-white">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-charis-blue-dark hover:bg-charis-green-light hover:text-charis-blue-dark font-semibold shadow-lg">
                <Link to="/awareness-hub">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white/30 animate-zoom-in">
            <div className="relative h-[300px] md:h-[400px]">
              {slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSlider;
