
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import HeroSlider from "@/components/HeroSlider";
import Scene3D from "@/components/Scene3D";
import { ArrowRight, Heart, Calendar, Users, Award, Star } from "lucide-react";

const Index = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Main Content Section */}
      <section className="py-20 bg-gradient-to-b from-charis-cream via-charis-cream-light/50 to-charis-cream relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-20 h-20 bg-charis-gold/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-charis-copper/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-charis-gold-light to-charis-copper-light px-6 py-2 rounded-full mb-8 animate-fade-in border border-charis-gold/20">
              <Star className="w-5 h-5 text-charis-brown-dark mr-2" />
              <span className="text-charis-brown-dark font-semibold">Award-Winning Non-Profit Organization</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-charis-brown-dark via-charis-brown to-charis-copper mb-8 leading-tight">
              Charis Eagle Springs
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-charis-gold to-charis-copper mx-auto mb-8 rounded-full"></div>
            
            <p className="text-2xl md:text-3xl font-light text-charis-brown-dark mb-6 leading-relaxed">
              Upholding Dignity Across Aging
            </p>
            
            <p className="text-xl mb-6 text-charis-brown max-w-4xl mx-auto leading-relaxed">
              Charis Eagle Springs is a community-centered non-profit organization based in Nairobi, Kenya, passionately dedicated to enhancing the mental well-being of the elderly through theatre, arts, and meaningful social engagement.
            </p>
            <p className="text-lg mb-10 text-charis-brown/80 max-w-3xl mx-auto leading-relaxed">
              Our mission is to celebrate the stories, talents, and unique experiences of elderly individuals by empowering them through creative expression and providing them with the support they need to thrive in their golden years.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-charis-brown to-charis-brown-dark hover:from-charis-brown-dark hover:to-charis-brown text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl">
                <Link to="/about">
                  <Heart className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </Button>
              <Button asChild variant="highlighted" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl bg-gradient-to-r from-charis-gold to-charis-gold-dark hover:from-charis-gold-dark hover:to-charis-gold text-charis-brown-dark">
                <Link to="/programs">
                  <Calendar className="mr-2 h-5 w-5" />
                  Join Our Programs
                </Link>
              </Button>
            </div>

            {/* 3D Scene Integration */}
            <div className="mt-16">
              <Scene3D />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-charis-brown-dark via-charis-brown to-charis-copper relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact in Numbers</h2>
            <div className="w-24 h-1 bg-charis-gold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
              <div className="bg-gradient-to-r from-charis-gold to-charis-gold-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-charis-cream-light bg-clip-text">50+</h3>
              <p className="text-xl text-white/90 font-medium">Theatre Workshops</p>
              <p className="text-white/70 mt-2">Empowering creativity</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
              <div className="bg-gradient-to-r from-charis-copper to-charis-brown w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl md:text-6xl font-bold text-white mb-4">1,000+</h3>
              <p className="text-xl text-white/90 font-medium">Elderly Participants</p>
              <p className="text-white/70 mt-2">Lives transformed</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
              <div className="bg-gradient-to-r from-charis-brown to-charis-brown-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl md:text-6xl font-bold text-white mb-4">5,000+</h3>
              <p className="text-xl text-white/90 font-medium">Lives Impacted</p>
              <p className="text-white/70 mt-2">Community reach</p>
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

      {/* Enhanced Call to Action */}
      <section className="bg-gradient-to-br from-charis-brown-dark via-charis-copper to-charis-brown py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-charis-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-charis-gold/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              Ready to Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-charis-gold to-charis-gold-dark">Difference?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed">
              Join us in our mission to celebrate and empower elderly individuals through creative expression and community support.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild variant="highlighted" size="lg" className="px-10 py-5 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-charis-gold to-charis-gold-dark hover:from-charis-gold-dark hover:to-charis-gold text-charis-brown-dark">
                <Link to="/get-involved">
                  <Heart className="mr-3 h-6 w-6" />
                  Get Involved
                </Link>
              </Button>
              
              <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold border-2 border-white/30 hover:border-white/50 px-10 py-5 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Link to="/programs">
                  <Calendar className="mr-3 h-6 w-6" />
                  Join Our Programs
                </Link>
              </Button>
              
              <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 px-10 py-5 text-lg rounded-xl transition-all duration-300 group">
                <Link to="/contact">
                  <span>Contact Us</span>
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
