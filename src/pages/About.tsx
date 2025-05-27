
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Star, Zap, Users } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="About Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-charis-blue-dark/30 to-transparent"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-charis-blue-light/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="text-sm font-light tracking-widest text-white/80 uppercase mb-4 block">
                Learn About Our Journey
              </span>
              <h1 className="font-heading text-white mb-6 leading-tight drop-shadow-lg">
                About Us
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-charis-blue-light to-charis-green-light mx-auto mb-8"></div>
            </div>
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Discover our mission, vision, and the passionate story behind Charis Eagle Springs as we work to transform elderly mental health care.
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-white/60"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full mx-auto mt-2"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-6">Our Story</h2>
              <p className="mb-4">
                Charis Eagle Springs was founded in 2018 by a group of healthcare professionals and community leaders who recognized the growing need for specialized mental health support for the elderly population.
              </p>
              <p className="mb-4">
                Our founders witnessed firsthand the challenges faced by elderly individuals dealing with dementia, depression, and anxiety, as well as the struggles of their caregivers and family members.
              </p>
              <p>
                What began as a small community initiative has grown into a comprehensive organization dedicated to raising awareness, providing resources, and advocating for better mental health care for our elderly citizens.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Elderly people in a community setting" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-charis-neutral-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-14 w-14 rounded-full bg-charis-blue-light flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-charis-blue-dark" />
              </div>
              <h2 className="text-2xl font-bold text-charis-blue-dark mb-4">Our Mission</h2>
              <p className="mb-3">
                To raise awareness about mental health issues affecting the elderly and promote compassionate, dignified care for senior citizens.
              </p>
              <p>
                We strive to educate communities, empower caregivers, and advocate for better policies and resources to support elderly mental health.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-14 w-14 rounded-full bg-charis-green-light flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-charis-green-dark" />
              </div>
              <h2 className="text-2xl font-bold text-charis-blue-dark mb-4">Our Vision</h2>
              <p className="mb-3">
                A society where elderly individuals receive the mental health support they need, where caregivers are equipped with proper resources, and where communities understand and value the dignity of their senior members.
              </p>
              <p>
                We envision a world where aging with mental health challenges doesn't lead to isolation or diminished quality of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Our Core Values</h2>
            <p className="max-w-3xl mx-auto text-gray-700">
              The principles that guide our work and define our organization's character.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Compassion",
                description: "We approach our work with empathy and genuine care for the elderly and their families."
              },
              {
                icon: Users,
                title: "Respect",
                description: "We honor the dignity and worth of every elderly person regardless of their mental health status."
              },
              {
                icon: Star,
                title: "Excellence",
                description: "We strive for the highest standards in our programs, resources, and advocacy efforts."
              },
              {
                icon: Zap,
                title: "Empowerment",
                description: "We equip caregivers and communities with knowledge and tools to provide better support."
              }
            ].map((value, index) => (
              <div key={index} className="bg-charis-neutral-light p-6 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-charis-blue-light flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-charis-blue-dark" />
                </div>
                <h3 className="text-xl font-semibold text-charis-blue-dark mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
