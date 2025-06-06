
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

  return (
    <section ref={elementRef} className="relative section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/4b610869-b25a-4fac-bbd5-a76fc765b517.png" 
          alt="Community elder participating in traditional cultural activities, representing dignity in aging" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-charis-blue-light/80 via-charis-purple-light/70 to-charis-green-light/80"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <span className="text-sm font-light tracking-widest text-white/90 uppercase mb-4 block">
            Our Impact
          </span>
          <h2 className="font-heading text-white drop-shadow-lg">
            Making a Difference Through Arts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { number: "200+", label: "Older Persons Participants", delay: "delay-200", color: "from-charis-green to-charis-green-dark" },
            { number: "50+", label: "Theatre Workshops", delay: "delay-400", color: "from-charis-blue to-charis-blue-dark" },
            { number: "25+", label: "Community Performances", delay: "delay-600", color: "from-charis-purple to-charis-purple-light" },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-1000 ${stat.delay} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className={`bg-gradient-to-br ${stat.color} p-8 rounded-xl shadow-xl border-2 border-white/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
                <h3 className="text-5xl md:text-6xl font-light text-white mb-4 drop-shadow-md">
                  {stat.number}
                </h3>
                <p className="text-lg font-light text-white/90">
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
      description: "Honoring dignity and individuality of every older person",
      gradient: "from-red-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50"
    },
    {
      icon: Users,
      title: "Community",
      description: "Encouraging connections and belonging through shared experiences",
      gradient: "from-blue-400 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50"
    },
    {
      icon: Zap,
      title: "Empowerment",
      description: "Promoting self-expression and confidence through the arts",
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50"
    },
    {
      icon: Star,
      title: "Integrity",
      description: "Ensuring transparency and ethical practices in all our work",
      gradient: "from-purple-400 to-violet-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50"
    }
  ];

  return (
    <section ref={elementRef} className="section-padding bg-gradient-to-br from-charis-neutral-light via-white to-charis-blue-light/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-charis-blue-dark to-charis-purple bg-clip-text text-transparent mb-4">Our Core Values for Older Persons Support</h2>
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
              <div className={`${value.bgColor} p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 border-2 border-transparent hover:border-white/50`}>
                <div className={`h-16 w-16 rounded-full bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
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
          alt="Diverse community gathering supporting older persons mental health initiatives" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charis-blue-dark/90 via-charis-purple/80 to-charis-green-dark/90"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-charis-green to-charis-blue rounded-full blur-xl animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-charis-purple to-charis-green-light rounded-full blur-2xl animate-pulse delay-1000 opacity-60"></div>
      
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
            <Button asChild className="bg-gradient-to-r from-charis-green to-charis-green-dark text-white hover:from-charis-green-dark hover:to-charis-green px-8 py-4 text-sm font-medium transition-all duration-300 group shadow-xl border-2 border-white/20">
              <Link to="/get-involved" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                Support Our Mission
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild className="border-2 border-white text-white hover:bg-gradient-to-r hover:from-white hover:to-charis-blue-light hover:text-charis-blue-dark px-8 py-4 text-sm font-medium transition-all duration-300 group bg-transparent shadow-xl backdrop-blur-sm">
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
        <title>Charis Eagle Springs - Mental Health Support for Older Persons in Kenya</title>
        <meta name="description" content="Promoting mental wellness for older persons through theatre and arts in Kenya. Supporting dignified aging with community programs, awareness campaigns, and caregiver resources since 2018." />
        <meta name="keywords" content="older persons mental health Kenya, elder care programs, theatre therapy, aging support, dementia awareness, community outreach, mental wellness older adults" />
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
