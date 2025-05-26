
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Users, Lightbulb, Shield } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charis-blue to-charis-purple pt-20 pb-16 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Charis Eagle Springs: Upholding Dignity Across Aging
            </h1>
            <p className="text-xl mb-8">
              Charis Eagle Springs is a community-centered non-profit organization based in Nairobi, Kenya, passionately dedicated to enhancing the mental well-being of the elderly through theatre, arts, and meaningful social engagement.
            </p>
            <p className="text-lg mb-8">
              Our mission is to celebrate the stories, talents, and unique experiences of elderly individuals by empowering them through creative expression and providing them with the support they need to thrive in their golden years.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charis-blue-dark mb-6">
                Our Story
              </h2>
              <p className="text-lg mb-6">
                At Charis Eagle Springs, we believe aging should be a journey of dignity, creativity, and connection. We provide safe, engaging spaces where elderly Kenyans can express themselves artistically, share their wisdom, and stay mentally and emotionally connected to their communities.
              </p>
              <p className="text-lg mb-8">
                Founded by <strong>Margaret Njagi</strong>, Charis Eagle Springs is more than an initiative—it is a movement to restore visibility, honor, and joy in aging.
              </p>
              <Button asChild variant="highlighted" size="lg">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsuIv5j-qDUVK7UzY60reSqYfQeCu3laidA&s" 
                alt="Elderly person engaging in creative activities" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-charis-neutral-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card-custom">
              <h3 className="text-2xl font-bold text-charis-blue-dark mb-4">Mission</h3>
              <p className="text-lg">
                To promote the mental well-being of the elderly through theatre and the arts.
              </p>
            </div>
            <div className="card-custom">
              <h3 className="text-2xl font-bold text-charis-blue-dark mb-4">Vision</h3>
              <p className="text-lg">
                A society where elderly individuals are celebrated for their contributions, empowered by creative expression, and supported with the resources they need to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-charis-blue-dark text-center mb-12">
            Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-charis-blue-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-charis-blue-dark" />
              </div>
              <h3 className="text-xl font-bold text-charis-blue-dark mb-3">Respect</h3>
              <p className="text-gray-700">
                Honoring the dignity and individuality of every elderly person.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-charis-green-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-charis-blue-dark" />
              </div>
              <h3 className="text-xl font-bold text-charis-blue-dark mb-3">Community</h3>
              <p className="text-gray-700">
                Building meaningful connections across all generations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-charis-purple-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-charis-blue-dark" />
              </div>
              <h3 className="text-xl font-bold text-charis-blue-dark mb-3">Empowerment</h3>
              <p className="text-gray-700">
                Encouraging confidence and self-expression through creative outlets.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-charis-blue-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-charis-blue-dark" />
              </div>
              <h3 className="text-xl font-bold text-charis-blue-dark mb-3">Integrity</h3>
              <p className="text-gray-700">
                Upholding transparency and ethical practice in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-charis-blue-dark text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Be part of the movement to restore dignity, honor, and joy in aging through creative expression and community support.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild variant="highlighted" size="lg">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-charis-blue-dark hover:bg-gray-100 font-semibold">
              <Link to="/programs">View Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
