
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
              At Charis Eagle Springs, we are dedicated to raising awareness about mental health issues affecting the elderly and promoting compassionate, dignified care for our senior citizens.
            </p>
            <p className="text-lg mb-8">
              We believe that every elderly person deserves respect, understanding, and quality care that enhances their wellbeing and preserves their dignity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary">
                <Link to="/about">Learn More</Link>
              </Button>
              <Button asChild variant="outline" className="border-charis-blue hover:bg-charis-blue/10">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg animate-zoom-in">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsuIv5j-qDUVK7UzY60reSqYfQeCu3laidA&s" 
              alt="Elderly person with caregiver" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
