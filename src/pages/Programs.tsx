
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { BookOpen, Heart, Users, Landmark, Calendar, ChevronRight, Target, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation, useParallaxScroll } from "@/hooks/useScrollAnimation";

const Programs = () => {
  const scrollY = useParallaxScroll();
  const { elementRef: programsRef, isVisible: programsVisible } = useScrollAnimation(0.1);
  const { elementRef: eventsRef, isVisible: eventsVisible } = useScrollAnimation(0.1);
  const { elementRef: impactRef, isVisible: impactVisible } = useScrollAnimation(0.1);

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
      <ScrollProgress />
      <Navbar />
      
      {/* Enhanced Hero Section with Parallax */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic background with overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Programs" 
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charis-green-dark/80 via-charis-blue-dark/70 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        {/* Animated elements with parallax */}
        <div 
          className="absolute top-20 right-10 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Target className="w-20 h-20 text-white animate-spin-slow" />
        </div>
        <div 
          className="absolute bottom-20 left-10 opacity-30"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        >
          <Award className="w-16 h-16 text-white animate-pulse delay-700" />
        </div>
        <div 
          className="absolute top-1/3 left-1/4 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <TrendingUp className="w-12 h-12 text-white animate-pulse delay-300" />
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-16"></div>
        
        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="text-sm font-light tracking-widest text-white/80 uppercase mb-4 block">
                Impact • Innovation • Excellence
              </span>
              <h1 className="font-heading text-white mb-6 leading-tight drop-shadow-lg">
                Our Programs
              </h1>
              <div className="flex justify-center items-center mb-8 space-x-4">
                <div className="w-8 h-8 border-2 border-white/40 rotate-45"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-charis-green-light to-charis-blue-light"></div>
                <div className="w-4 h-4 bg-white/40 rounded-full"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-charis-blue-light to-charis-green-light"></div>
                <div className="w-8 h-8 border-2 border-white/40 rotate-45"></div>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Discover our transformative initiatives and how we're making a meaningful difference in elderly mental health care and community awareness.
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <div className="w-px h-12 bg-white/60"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Programs Section with Scroll Animation */}
      <section ref={programsRef} className="py-16 bg-white">
        <div className="container-custom">
          <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            programsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Current Initiatives</h2>
            <p className="text-gray-700">
              Our programs aim to improve the quality of life for elderly individuals by addressing mental health needs, supporting caregivers, and creating compassionate communities.
            </p>
          </div>

          <div className="space-y-16">
            {programs.map((program, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center transition-all duration-1000 ${
                programsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: `${index * 200}ms` }}>
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

      {/* Upcoming Events Section with Scroll Animation */}
      <section ref={eventsRef} className="py-16 bg-charis-neutral-light">
        <div className="container-custom">
          <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            eventsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Upcoming Events</h2>
            <p className="text-gray-700">
              Join us at one of our upcoming events to learn more about elderly mental health and how you can get involved.
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
            eventsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
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

      {/* Impact Section with Scroll Animation */}
      <section ref={impactRef} className="py-16 bg-white">
        <div className="container-custom">
          <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Our Impact</h2>
            <p className="text-gray-700">
              Through our programs and initiatives, we have made a meaningful difference in the lives of many elderly individuals and their caregivers.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
            impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
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
      <ScrollToTop />
    </>
  );
};

export default Programs;
