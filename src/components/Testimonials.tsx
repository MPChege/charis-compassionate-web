
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The resources provided by Charis Eagle Springs have been invaluable in helping me care for my mother with early-stage dementia. Their compassionate approach makes such a difference.",
    author: "Sarah Kimani",
    role: "Family Caregiver",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    quote: "As a healthcare professional, I've seen firsthand how Charis Eagle Springs' training programs improve the quality of care provided to elderly patients with mental health challenges.",
    author: "Dr. James Omondi",
    role: "Geriatric Psychiatrist",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    quote: "The community workshops have helped our entire neighborhood become more understanding and supportive of our elderly members, especially those struggling with isolation.",
    author: "Margaret Wanjiru",
    role: "Community Leader",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charis-blue-dark mb-4">What People Say</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Hear from community members, caregivers, and healthcare professionals about the impact of our work.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-none shadow-lg bg-gradient-to-br from-charis-blue-light to-white">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-charis-blue-dark opacity-20 mb-6" />
              <div className="animate-fade-in">
                <p className="text-lg md:text-xl mb-8 italic text-gray-700">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].author} 
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-charis-blue-dark">{testimonials[currentIndex].author}</h4>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <button 
            onClick={handlePrevious}
            className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-charis-blue-dark hover:bg-charis-blue hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-charis-blue-dark hover:bg-charis-blue hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index 
                    ? "w-8 bg-charis-blue-dark" 
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
