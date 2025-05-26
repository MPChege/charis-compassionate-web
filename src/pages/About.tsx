
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Star, Users, Shield } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-charis-blue-light pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-6">About Us</h1>
            <p className="text-xl text-gray-700">
              Learn about our mission, vision, and the story behind Charis Eagle Springs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-6">Our Story</h2>
              <p className="mb-4">
                At Charis Eagle Springs, we believe aging should be a journey of dignity, creativity, and connection. We provide safe, engaging spaces where elderly Kenyans can express themselves artistically, share their wisdom, and stay mentally and emotionally connected to their communities.
              </p>
              <p className="mb-4">
                Founded by Margaret Njagi, Charis Eagle Springs is more than an initiative—it is a movement to restore visibility, honor, and joy in aging.
              </p>
              <p>
                We are dedicated to creating meaningful opportunities for elderly individuals to thrive through creative expression and community engagement.
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
              <p>
                To promote the mental well-being of the elderly through theatre and the arts.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-14 w-14 rounded-full bg-charis-green-light flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-charis-green-dark" />
              </div>
              <h2 className="text-2xl font-bold text-charis-blue-dark mb-4">Our Vision</h2>
              <p>
                A society where elderly individuals are celebrated for their contributions, empowered by creative expression, and supported with the resources they need to thrive.
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
                icon: Shield,
                title: "Respect",
                description: "Honoring the dignity and individuality of every elderly person."
              },
              {
                icon: Users,
                title: "Community",
                description: "Building meaningful connections across all generations."
              },
              {
                icon: Star,
                title: "Empowerment",
                description: "Encouraging confidence and self-expression through creative outlets."
              },
              {
                icon: Heart,
                title: "Integrity",
                description: "Upholding transparency and ethical practice in everything we do."
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
