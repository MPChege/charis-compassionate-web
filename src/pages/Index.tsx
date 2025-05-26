
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

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-8">
              Charis Eagle Springs: Upholding Dignity Across Aging
            </h1>
            <p className="text-xl mb-6 text-gray-700">
              Charis Eagle Springs is a community-centered non-profit organization based in Nairobi, Kenya, passionately dedicated to enhancing the mental well-being of the elderly through theatre, arts, and meaningful social engagement.
            </p>
            <p className="text-lg mb-8 text-gray-700">
              Our mission is to celebrate the stories, talents, and unique experiences of elderly individuals by empowering them through creative expression and providing them with the support they need to thrive in their golden years.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild size="lg" className="bg-charis-blue hover:bg-charis-blue-dark text-white">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
              <Button asChild variant="highlighted" size="lg">
                <Link to="/programs">
                  Join Our Programs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-charis-neutral-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">50+</h3>
              <p className="text-gray-700">Theatre Workshops</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">1,000+</h3>
              <p className="text-gray-700">Elderly Participants</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
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
            Join us in our mission to celebrate and empower elderly individuals through creative expression and community support.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild variant="highlighted" size="lg">
              <Link to="/get-involved">
                <Heart className="mr-2 h-5 w-5" />
                Get Involved
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-charis-blue-dark hover:bg-gray-100 font-semibold">
              <Link to="/programs">
                <Calendar className="mr-2 h-5 w-5" />
                Join Our Programs
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/20 flex items-center">
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
