import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import HeroSlider from "@/components/HeroSlider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Heart, Calendar, Star, Users, Zap } from "lucide-react";

const StatsSection = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  return (
    <section ref={elementRef} className="relative section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/4b610869-b25a-4fac-bbd5-a76fc765b517.png" 
          alt="Community elder in traditional dress" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-50/90"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <span className="text-sm font-light tracking-widest text-gray-600 uppercase mb-4 block">
            Our Impact
          </span>
          <h2 className="font-heading text-black">
            Making a Difference Through Arts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { number: "200+", label: "Older Persons Participants", delay: "delay-200" },
            { number: "50+", label: "Theatre Workshops", delay: "delay-400" },
            { number: "25+", label: "Community Performances", delay: "delay-600" },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-1000 ${stat.delay} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
                <h3 className="text-5xl md:text-6xl font-light text-black mb-4">
                  {stat.number}
                </h3>
                <p className="text-lg font-light text-gray-600">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CoreValuesSection = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  const values = [
    {
      icon: Heart,
      title: "Respect",
      description: "Honoring dignity and individuality of every older person"
    },
    {
      icon: Users,
      title: "Community",
      description: "Encouraging connections and belonging through shared experiences"
    },
    {
      icon: Zap,
      title: "Empowerment",
      description: "Promoting self-expression and confidence through the arts"
    },
    {
      icon: Star,
      title: "Integrity",
      description: "Ensuring transparency and ethical practices in all our work"
    }
  ];

  return (
    <section ref={elementRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charis-blue-dark mb-4">Our Core Values</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            The principles that guide our work and define our commitment to older persons' mental wellness through the arts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className={`text-center transition-all duration-1000 delay-${(index + 1) * 200} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-charis-neutral-light p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-16 w-16 rounded-full bg-charis-blue-light flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="h-8 w-8 text-charis-blue-dark" />
                </div>
                <h3 className="text-xl font-semibold text-charis-blue-dark mb-4">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  return (
    <section ref={elementRef} className="relative section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a3eabbcc-f8ac-4805-a8a2-a318cd803e6e.png" 
          alt="Community gathering" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="container-custom text-center relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="font-heading text-white mb-8 drop-shadow-lg">
            Join Us in Promoting Mental Wellness for Older Persons
          </h2>
          <p className="text-xl font-light text-white/90 mb-12 leading-relaxed drop-shadow-md">
            Help us create a society where older persons are celebrated, empowered, and supported through the transformative power of theatre and arts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-sm font-medium transition-all duration-300 group shadow-lg">
              <Link to="/get-involved" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                Support Our Mission
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-sm font-medium transition-all duration-300 group bg-transparent shadow-lg">
              <Link to="/programs" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Explore Programs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <StatsSection />
      <Mission />
      <Services />
      <CoreValuesSection />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Index;
