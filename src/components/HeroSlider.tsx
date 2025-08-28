
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users } from "lucide-react";
import { useParallaxScroll } from "@/hooks/useScrollAnimation";

const slides = [
  {
    id: 1,
    image: "/lovable-uploads/4b610869-b25a-4fac-bbd5-a76fc765b517.png",
    title: "Charis Eagle Springs",
    subtitle: "Upholding Dignity Across Ageing",
    description: "A community-centred organisation founded in 2019 by Director Margaret Njagi, restoring dignity and nurturing mental wellbeing across Eastern Africa."
  },
  {
    id: 2,
    image: "/lovable-uploads/a3eabbcc-f8ac-4805-a8a2-a318cd803e6e.png",
    title: "Theatre & Arts for Healing",
    description: "Using drama, music, dance, poetry and storytelling as therapeutic tools to help older persons express life stories and rebuild self-worth."
  },
  {
    id: 3,
    image: "/lovable-uploads/f38fe72c-5c15-4c17-9e2f-aeda7abdb70a.png",
    title: "Train-the-Trainer Programs",
    description: "Building local capacity through caregiver training and arts facilitation, following our Fulbright Elder Care training in Durban, June 2024."
  },
  {
    id: 4,
    image: "https://www.capitalfm.co.ke/lifestyle/files/2012/08/older-couple.jpg",
    title: "Economic Empowerment & Crafts",
    description: "Supporting elders to produce crafts and participate in LeadingAge Expo exhibitions in the USA, generating income and pride."
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollY = useParallaxScroll();

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
      {/* Background Images with parallax effect */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{
              transform: `translateY(${scrollY * 0.5}px)`
            }}
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
      
      {/* Content with parallax */}
      <div 
        className="container-custom relative z-10 text-center"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`
        }}
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h1 className="font-heading text-white mb-4 leading-tight drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>
          {slides[currentSlide].subtitle && (
            <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-6 drop-shadow-md">
              {slides[currentSlide].subtitle}
            </h2>
          )}
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
              <Link to="/programs" className="flex items-center relative z-10">
                <Users className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Our Programs
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
