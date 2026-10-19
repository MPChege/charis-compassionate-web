
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
import { Helmet } from "react-helmet-async";

const StatsSection = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  const stats = [
    { number: "2019", label: "Founded in Nairobi, Kenya" },
    { number: "2024", label: "Fulbright Training in Durban" },
    { number: "USA", label: "LeadingAge Expo Participation" },
  ];

  return (
    <section ref={elementRef} className="relative section-padding overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/WhatsApp Image 2025-08-28 at 07.35.02.jpeg" 
          alt="Elders participating in theatre activities, representing dignity in aging" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-sm font-medium tracking-widest text-charis-blue uppercase mb-4 block">
            Our Impact
          </span>
          <h2 className="font-heading text-white">
            Our Impact Across Eastern Africa
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.number}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              className={`group relative text-center p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-charis-blue/60 hover:bg-white/10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-16 bg-charis-blue transition-all duration-500 group-hover:w-32"></span>
              <h3 className="text-5xl md:text-6xl font-light text-white mb-4">
                {stat.number}
              </h3>
              <p className="text-base md:text-lg font-light text-white/70">
                {stat.label}
              </p>
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
    { icon: Heart, title: "Compassion", description: "Care that listens first" },
    { icon: Users, title: "Respect", description: "Every elder is entitled to dignity" },
    { icon: Zap, title: "Excellence", description: "High standards in training and service delivery" },
    { icon: Star, title: "Empowerment", description: "Strengthening caregivers, families and the elders themselves" },
  ];

  return (
    <section ref={elementRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-widest text-charis-blue-dark uppercase mb-4 block">
            What Guides Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Core Values</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            The principles that guide our work and define our commitment to upholding dignity across ageing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={value.title} 
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-black hover:shadow-xl ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Black fill that sweeps up on hover */}
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-xl bg-charis-blue-light flex items-center justify-center transition-colors duration-500 group-hover:bg-charis-blue">
                    <value.icon className="h-6 w-6 text-charis-blue-dark transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-300 transition-colors duration-500 group-hover:text-white/40">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-3 transition-colors duration-500 group-hover:text-white">{value.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed transition-colors duration-500 group-hover:text-white/70">{value.description}</p>
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
    <section ref={elementRef} className="relative section-padding overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a3eabbcc-f8ac-4805-a8a2-a318cd803e6e.png" 
          alt="Diverse community gathering supporting older persons mental health initiatives" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-charis-blue-dark/70"></div>
      </div>
      
      <div className="container-custom text-center relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="font-heading text-white mb-8">
            Join Us in Upholding Dignity Across Ageing
          </h2>
          <p className="text-xl font-light text-white/80 mb-12 leading-relaxed">
            Help us create a society where ageing is met with dignity, understanding and robust mental-health support through theatre, arts, and community care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-black hover:bg-charis-blue hover:text-white px-8 py-6 text-sm font-medium transition-all duration-300 group">
              <Link to="/get-involved" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                Support Our Mission
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild className="border border-white/40 text-white hover:bg-white hover:text-black px-8 py-6 text-sm font-medium transition-all duration-300 bg-transparent">
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
      <Helmet>
        <title>Charis Eagle Springs — Upholding Dignity Across Ageing</title>
        <meta name="description" content="Charis Eagle Springs is a community-centred organisation founded in 2019 by Director Margaret Njagi. We restore dignity, nurture mental wellbeing, and strengthen the safety net around older persons across Eastern Africa through theatre & arts, training, and community support." />
        <meta name="keywords" content="Charis Eagle Springs, Margaret Njagi, older persons mental health, Kenya elder care, theatre therapy for seniors, ageing with dignity, Eastern Africa elder support, community-centred eldercare, upholding dignity across ageing" />
        <link rel="canonical" href="https://chariseaglesprings.org" />
      </Helmet>
      
      <Navbar />
      <main>
        <HeroSlider />
        <StatsSection />
        <Mission />
        <Services />
        <CoreValuesSection />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Index;
