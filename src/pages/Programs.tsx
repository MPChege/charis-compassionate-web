
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Heart, Users, Megaphone, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Programs = () => {
  const programs = [
    {
      title: "Theatre Workshops",
      description: "Drama and storytelling sessions to boost confidence and self-expression.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      icon: BookOpen,
      goals: [
        "Enhance creative expression and storytelling abilities",
        "Build confidence through artistic performance",
        "Foster social connections among participants",
        "Preserve and share cultural stories and wisdom"
      ]
    },
    {
      title: "Community Performances",
      description: "Opportunities for elderly participants to showcase their talents in public events.",
      image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      icon: Heart,
      goals: [
        "Provide platforms for elderly individuals to shine",
        "Celebrate the talents and experiences of our participants",
        "Strengthen community bonds through shared experiences",
        "Increase visibility and appreciation for elderly contributions"
      ]
    },
    {
      title: "Support Groups",
      description: "Peer-led sessions that offer emotional support and reduce social isolation.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      icon: Users,
      goals: [
        "Create safe spaces for emotional expression and support",
        "Combat loneliness and social isolation",
        "Build peer networks and lasting friendships",
        "Promote mental wellness through community connection"
      ]
    },
    {
      title: "Awareness Campaigns",
      description: "Initiatives to educate the public about elderly mental health and the value of creative engagement.",
      image: "https://images.unsplash.com/photo-1504448919669-f34c354962c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      icon: Megaphone,
      goals: [
        "Raise awareness about elderly mental health needs",
        "Promote the benefits of creative engagement for aging",
        "Advocate for better support systems for the elderly",
        "Change societal perceptions about aging and elder care"
      ]
    }
  ];

  const collaborations = [
    {
      title: "The Dementia in Africa Summit",
      location: "Nairobi, Kenya",
      description: "Participated in discussions on dementia care and awareness across Africa"
    },
    {
      title: "Fulbright Train-the-Trainer Specialist Program",
      location: "Durban, South Africa",
      description: "Advanced training in specialized care techniques and community engagement"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charis-green-light to-charis-blue-light pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-6">Our Programs</h1>
            <p className="text-xl text-gray-700">
              Discover how we empower elderly individuals through creative expression and community engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Current Initiatives</h2>
            <p className="text-gray-700">
              Our programs focus on enhancing mental well-being through theatre, arts, and meaningful social connections.
            </p>
          </div>

          <div className="space-y-16">
            {programs.map((program, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}>
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover aspect-video"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="h-16 w-16 rounded-full bg-charis-blue-light flex items-center justify-center mb-6">
                    <program.icon className="h-8 w-8 text-charis-blue-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-charis-blue-dark mb-4">{program.title}</h3>
                  <p className="text-gray-700 mb-6">{program.description}</p>
                  <div className="bg-charis-neutral-light p-4 rounded-lg">
                    <h4 className="font-semibold text-charis-blue-dark mb-2">Program Goals:</h4>
                    <ul className="space-y-2">
                      {program.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations & Recognition Section */}
      <section className="py-16 bg-charis-neutral-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Collaborations & Recognition</h2>
            <p className="text-gray-700">
              We've proudly participated in major events and partnerships including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {collaborations.map((collab, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-full bg-charis-green-light flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-charis-green-dark" />
                </div>
                <h3 className="text-xl font-semibold text-charis-blue-dark mb-2">{collab.title}</h3>
                <p className="text-charis-blue font-medium mb-1">{collab.location}</p>
                <p className="text-gray-600">{collab.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Our Impact</h2>
            <p className="text-gray-700">
              Through our programs and initiatives, we have made a meaningful difference in the lives of many elderly individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-charis-blue-light/50">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">50+</h3>
              <p className="text-gray-700">Theatre Workshops Conducted</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-charis-green-light/50">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">1,000+</h3>
              <p className="text-gray-700">Elderly Participants</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-charis-purple-light/50">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">5,000+</h3>
              <p className="text-gray-700">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-charis-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Get Involved in Our Programs</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether as a volunteer, participant, or supporter, there are many ways to contribute to our mission and make a difference.
          </p>
          <Button asChild size="lg" className="bg-charis-green hover:bg-charis-green-dark text-charis-blue-dark">
            <Link to="/get-involved">Get Involved Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Programs;
