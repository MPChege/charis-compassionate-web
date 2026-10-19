
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Charis Eagle Springs has been a blessing in my life. Serving and spending time with older people is especially meaningful to me because I lost my grandmother, whom I shared a very special bond with. Being around them brings me comfort, joy, and a sense of purpose. I’m truly grateful to Madam Margaret for giving me the opportunity to serve and spend time with them.",
    author: "Nurse Valerie",
    role: "Nurse"
  },
  {
    quote: "Personally it has made me realize the blessings and comfort that comes from serving the elderly and it brings me joy when I teach/show them how to better do tasks and also by spending time with them. It has also helped me learning how to better care for the elderly. So thank you Charis Eagle Springs.",
    author: "Francis",
    role: "Caregiver"
  },
  {
    quote: "The resources provided by Charis Eagle Springs have been invaluable in helping me care for my mother with early-stage dementia. Their compassionate approach makes such a difference.",
    author: "Sarah Kimani",
    role: "Family Caregiver"
  },
  {
    quote: "As a healthcare professional, I've seen firsthand how Charis Eagle Springs' training programs improve the quality of care provided to older patients with mental health challenges.",
    author: "Dr. James Omondi",
    role: "Geriatric Psychiatrist"
  },
  {
    quote: "The community workshops have helped our entire neighborhood become more understanding and supportive of our older members, especially those struggling with isolation.",
    author: "Margaret Wanjiru",
    role: "Community Leader"
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
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">What People Say</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Hear from community members, caregivers, and healthcare professionals about the impact of our work.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border border-gray-200 shadow-xl overflow-hidden rounded-2xl">
            <div className="border-t-4 border-charis-blue">
              <CardContent className="bg-white m-0 p-8 md:p-12">
                <Quote className="h-12 w-12 text-charis-blue-light mb-6" />
                <div className="animate-fade-in">
                  <p className="text-lg md:text-xl mb-8 italic text-gray-700">
                    "{currentTestimonial.quote}"
                  </p>
                  <div className="flex items-center">
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
            className={`absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 h-12 w-12 rounded-full bg-black shadow-lg flex items-center justify-center text-white hover:bg-charis-blue-dark transition-colors duration-300`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={handleNext}
            className={`absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 h-12 w-12 rounded-full bg-black shadow-lg flex items-center justify-center text-white hover:bg-charis-blue-dark transition-colors duration-300`}
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
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? "w-8 bg-black" 
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
