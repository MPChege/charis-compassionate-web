
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import HeroSlider from "@/components/HeroSlider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Heart, Calendar } from "lucide-react";

const StatsSection = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  return (
    <section ref={elementRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="text-sm font-light tracking-widest text-gray-500 uppercase mb-4 block">
            Our Impact
          </span>
          <h2 className="font-heading text-black">
            Making a Difference
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { number: "50+", label: "Community Workshops", delay: "delay-200" },
            { number: "1,000+", label: "Caregivers Trained", delay: "delay-400" },
            { number: "5,000+", label: "Lives Impacted", delay: "delay-600" },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-1000 ${stat.delay} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-5xl md:text-6xl font-light text-black mb-4">
                {stat.number}
              </h3>
              <p className="text-lg font-light text-gray-600">
                {stat.label}
              </p>
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
    <section ref={elementRef} className="section-padding bg-black text-white">
      <div className="container-custom text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="font-heading text-white mb-8">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl font-light text-gray-300 mb-12 leading-relaxed">
            Join us in our mission to improve the lives of elderly individuals by supporting compassionate care and mental health awareness.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-sm font-medium transition-all duration-300 group">
              <Link to="/get-involved" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                Donate Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 text-sm font-medium transition-all duration-300 group bg-transparent">
              <Link to="/programs" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Join Our Programs
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
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Index;
