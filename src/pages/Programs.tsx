
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Heart, Users, Landmark, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Programs = () => {
  const programs = [
    {
      title: "Dementia Awareness Program",
      description: "Educational workshops and resources to help families and communities understand and support individuals with dementia.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      icon: BookOpen,
      goals: [
        "Increase understanding of dementia conditions",
        "Reduce stigma around dementia and memory loss",
        "Equip families with practical care strategies",
        "Create dementia-friendly communities"
      ]
    },
    {
      title: "Caregiver Training & Support",
      description: "Comprehensive training programs and ongoing support for professional and family caregivers of elderly individuals.",
      image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      icon: Heart,
      goals: [
        "Develop caregiving skills and knowledge",
        "Prevent caregiver burnout through self-care strategies",
        "Create support networks for caregivers",
        "Improve quality of care for elderly individuals"
      ]
    },
    {
      title: "Community Outreach Initiative",
      description: "Programs that bring mental health awareness and elderly support services directly to communities across the region.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      icon: Users,
      goals: [
        "Expand access to elderly mental health resources",
        "Build community capacity to support elderly members",
        "Reach underserved rural and urban communities",
        "Foster intergenerational connections and support"
      ]
    },
    {
      title: "Advocacy & Policy Reform",
      description: "Working with stakeholders to advocate for better policies, funding, and resources for elderly mental health services.",
      image: "https://images.unsplash.com/photo-1504448919669-f34c354962c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      icon: Landmark,
      goals: [
        "Influence policy changes to prioritize elderly mental health",
        "Increase public funding for elderly care services",
        "Develop standards for quality elderly mental health care",
        "Build coalitions with other advocacy organizations"
      ]
    }
  ];

  const upcomingEvents = [
    {
      title: "Dementia Care Workshop",
      date: "May 15, 2025",
      location: "Compassion Community Center, Nairobi"
    },
    {
      title: "Caregiver Support Group Meeting",
      date: "May 28, 2025",
      location: "Charis Eagle Springs Office, Nairobi"
    },
    {
      title: "Elderly Mental Health Awareness Seminar",
      date: "June 2, 2025",
      location: "Virtual (Zoom)"
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
              Learn about our initiatives and how we're making a difference in elderly mental health care and awareness.
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
              Our programs aim to improve the quality of life for elderly individuals by addressing mental health needs, supporting caregivers, and creating compassionate communities.
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

      {/* Upcoming Events Section */}
      <section className="py-16 bg-charis-neutral-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Upcoming Events</h2>
            <p className="text-gray-700">
              Join us at one of our upcoming events to learn more about elderly mental health and how you can get involved.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-full bg-charis-green-light flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-charis-green-dark" />
                </div>
                <h3 className="text-xl font-semibold text-charis-blue-dark mb-2">{event.title}</h3>
                <p className="text-charis-blue font-medium mb-1">{event.date}</p>
                <p className="text-gray-600 mb-6">{event.location}</p>
                <Button className="w-full bg-charis-blue hover:bg-charis-blue-dark">
                  Register
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-charis-blue text-charis-blue hover:bg-charis-blue/10">
              <Link to="/awareness-hub">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Our Impact</h2>
            <p className="text-gray-700">
              Through our programs and initiatives, we have made a meaningful difference in the lives of many elderly individuals and their caregivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-charis-blue-light/50">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">50+</h3>
              <p className="text-gray-700">Community Workshops Conducted</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-charis-green-light/50">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">1,000+</h3>
              <p className="text-gray-700">Caregivers Trained</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-charis-purple-light/50">
              <h3 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-2">5,000+</h3>
              <p className="text-gray-700">Elderly Lives Impacted</p>
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
          <Button asChild size="lg" className="bg-white text-charis-blue-dark hover:bg-charis-green-light hover:text-charis-blue-dark">
            <Link to="/get-involved">Get Involved Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Programs;
