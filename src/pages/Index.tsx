
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import HeroSlider from "@/components/HeroSlider";
import { ArrowRight, Heart, Calendar } from "lucide-react";

const Index = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-charis-blue-light/50 hover:bg-charis-blue-light transition-colors">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">50+</h3>
              <p className="text-gray-700">Community Workshops</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-charis-green-light/50 hover:bg-charis-green-light transition-colors">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">1,000+</h3>
              <p className="text-gray-700">Caregivers Trained</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-charis-purple-light/50 hover:bg-charis-purple-light transition-colors">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">5,000+</h3>
              <p className="text-gray-700">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <Mission />

      {/* Services Section */}
      <Services />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action */}
      <section className="bg-charis-blue-dark text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join us in our mission to improve the lives of elderly individuals by supporting compassionate care and mental health awareness.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild size="lg" variant="highlighted" className="flex items-center bg-charis-green-light text-charis-blue-dark font-semibold hover:bg-charis-green shadow-md hover:shadow-lg">
              <Link to="/get-involved">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-charis-blue-dark flex items-center bg-transparent">
              <Link to="/programs">
                <Calendar className="mr-2 h-5 w-5" />
                Join Our Programs
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/20 flex items-center bg-transparent border border-white/30">
              <Link to="/contact">
                <span>Contact Us</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
