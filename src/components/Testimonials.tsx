
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The resources provided by Charis Eagle Springs have been invaluable in helping me care for my mother with early-stage dementia. Their compassionate approach makes such a difference.",
    author: "Sarah Kimani",
    role: "Family Caregiver",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
    gradient: "from-pink-400 to-rose-500"
  },
  {
    quote: "As a healthcare professional, I've seen firsthand how Charis Eagle Springs' training programs improve the quality of care provided to older patients with mental health challenges.",
    author: "Dr. James Omondi",
    role: "Geriatric Psychiatrist",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    quote: "The community workshops have helped our entire neighborhood become more understanding and supportive of our older members, especially those struggling with isolation.",
    author: "Margaret Wanjiru",
    role: "Community Leader",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    gradient: "from-green-400 to-emerald-500"
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

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-br from-white via-charis-purple-light/20 to-charis-blue-light/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-charis-blue-dark to-charis-purple bg-clip-text text-transparent mb-4">What People Say</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Hear from community members, caregivers, and healthcare professionals about the impact of our work.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-br ${currentTestimonial.gradient} p-1`}>
              <CardContent className="bg-white m-0 p-8 md:p-12">
                <Quote className="h-12 w-12 text-gray-300 mb-6" />
                <div className="animate-fade-in">
                  <p className="text-lg md:text-xl mb-8 italic text-gray-700">
                    "{currentTestimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className={`p-1 rounded-full bg-gradient-to-r ${currentTestimonial.gradient} mr-4`}>
                      <img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.author} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{currentTestimonial.author}</h4>
                      <p className="text-gray-600">{currentTestimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Navigation buttons */}
          <button 
            onClick={handlePrevious}
            className={`absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 h-12 w-12 rounded-full bg-gradient-to-r ${currentTestimonial.gradient} shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={handleNext}
            className={`absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 h-12 w-12 rounded-full bg-gradient-to-r ${currentTestimonial.gradient} shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? `w-8 bg-gradient-to-r ${testimonial.gradient}` 
                    : "w-3 bg-gray-300 hover:bg-gray-400"
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
