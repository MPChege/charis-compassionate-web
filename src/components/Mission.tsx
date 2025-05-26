
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Mission = () => {
  return (
    <section className="bg-gradient-to-br from-charis-blue-light to-charis-purple-light section-padding">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charis-blue-dark mb-6">
              Our Mission
            </h2>
            <p className="text-lg mb-6">
              At Charis Eagle Springs, we believe aging should be a journey of dignity, creativity, and connection. We provide safe, engaging spaces where elderly Kenyans can express themselves artistically, share their wisdom, and stay mentally and emotionally connected to their communities.
            </p>
            <p className="text-lg mb-8">
              Founded by Margaret Njagi, Charis Eagle Springs is more than an initiative—it is a movement to restore visibility, honor, and joy in aging.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-charis-blue hover:bg-charis-blue-dark text-white shadow-md">
                <Link to="/about">Learn More</Link>
              </Button>
              <Button asChild className="bg-charis-green hover:bg-charis-green-dark text-charis-blue-dark border-charis-blue-dark">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg animate-zoom-in">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsuIv5j-qDUVK7UzY60reSqYfQeCu3laidA&s" 
              alt="Elderly person engaging in creative activities" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
