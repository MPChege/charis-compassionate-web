
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { Heart, Star, Zap, Users } from "lucide-react";
import { useScrollAnimation, useParallaxScroll } from "@/hooks/useScrollAnimation";
import { Helmet } from "react-helmet-async";

const About = () => {
  const scrollY = useParallaxScroll();
  const { elementRef: storyRef, isVisible: storyVisible } = useScrollAnimation(0.1);
  const { elementRef: missionRef, isVisible: missionVisible } = useScrollAnimation(0.1);
  const { elementRef: valuesRef, isVisible: valuesVisible } = useScrollAnimation(0.1);

  return (
    <>
      <Helmet>
        <title>About Us - Charis Eagle Springs | Upholding Dignity Across Ageing</title>
        <meta name="description" content="Learn about Charis Eagle Springs, a community-centred organisation founded in 2019 by Director Margaret Njagi. We restore dignity, nurture mental wellbeing, and strengthen the safety net around older persons across Eastern Africa through theatre & arts, training, and community support." />
        <meta name="keywords" content="Charis Eagle Springs, Margaret Njagi, older persons mental health, Kenya elder care, theatre therapy for seniors, ageing with dignity, Eastern Africa elder support, community-centred eldercare" />
        <link rel="canonical" href="https://chariseaglesprings.org/about" />
      </Helmet>

      <ScrollProgress />
      <Navbar />
      
      <main>
        {/* Enhanced Hero Section with Parallax */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background with overlay and parallax effect */}
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/f38fe72c-5c15-4c17-9e2f-aeda7abdb70a.png" 
              alt="Community elder with traditional attire representing cultural heritage and dignity in aging" 
              className="w-full h-full object-cover"
              style={{
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-charis-blue-dark/30 to-transparent"></div>
          </div>
          
          {/* Floating elements with parallax */}
          <div 
            className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-32 h-32 bg-charis-blue-light/20 rounded-full blur-2xl animate-pulse delay-1000"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          ></div>
          
          {/* Content */}
          <div className="container-custom relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 animate-fade-in">
                <span className="text-sm font-light tracking-widest text-white/80 uppercase mb-4 block">
                  Learn About Our Journey
                </span>
                <h1 className="font-heading text-white mb-6 leading-tight drop-shadow-lg">
                  About Charis Eagle Springs
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-charis-blue-light to-charis-green-light mx-auto mb-8"></div>
              </div>
              <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                Discover our mission, vision, and the passionate story behind Charis Eagle Springs as we work to uphold dignity across ageing through theatre, arts, and community support.
              </p>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-px h-12 bg-white/60"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full mx-auto mt-2"></div>
          </div>
        </section>

        {/* Our Story Section with Scroll Animation */}
        <section ref={storyRef} className="py-16 bg-white">
          <div className="container-custom">
            <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div>
                <h2 className="text-3xl font-bold text-charis-blue-dark mb-6">Our Story: Supporting Older Persons Since 2019</h2>
                <p className="mb-4">
                  Charis Eagle Springs is a community-centred organisation born from compassion and first-hand experience. Founded in 2019 by Director Margaret Njagi, a community advocate with lived experience of eldercare, Margaret leads Charis Eagle Springs with vision and compassion — blending theatrical practice, clinical care principles and grassroots organising to protect the dignity of older persons.
                </p>
                <p className="mb-4">
                  We exist to restore dignity, nurture mental wellbeing, and strengthen the safety net around older persons across Eastern Africa. What began as a small, neighbourhood response to elders living with dementia, depression and isolation has grown into a multi-program organisation using arts, training, advocacy and practical support to transform lives.
                </p>
                <p>
                  We work where need is greatest — informal settlements, churches, community halls, care homes and public spaces — bringing culturally relevant, evidence-informed interventions that reconnect older persons to community, purpose and income.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/lovable-uploads/4b610869-b25a-4fac-bbd5-a76fc765b517.png" 
                  alt="Community elder in traditional dress participating in cultural activities that promote mental wellness" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision with Scroll Animation */}
        <section ref={missionRef} className="relative py-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/a3eabbcc-f8ac-4805-a8a2-a318cd803e6e.png" 
              alt="Community gathering supporting older persons through inclusive programs and activities" 
              className="w-full h-full object-cover"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            />
            <div className="absolute inset-0 bg-white/90"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
                <div className="h-14 w-14 rounded-full bg-charis-blue-light flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-charis-blue-dark" />
                </div>
                <h2 className="text-2xl font-bold text-charis-blue-dark mb-4">Our Mission</h2>
                <p className="mb-3">
                  To promote mental wellbeing and holistic welfare for older persons through theatre & arts, caregiver capacity building, feeding and community support, and income-generating activities that return value to elders and their families.
                </p>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
                <div className="h-14 w-14 rounded-full bg-charis-green-light flex items-center justify-center mb-6">
                  <Star className="h-8 w-8 text-charis-green-dark" />
                </div>
                <h2 className="text-2xl font-bold text-charis-blue-dark mb-4">Our Vision</h2>
                <p className="mb-3">
                  A society where ageing is met with dignity, understanding and robust mental-health support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values with Scroll Animation */}
        <section ref={valuesRef} className="py-16 bg-white">
          <div className="container-custom">
            <div className={`text-center mb-12 transition-all duration-1000 ${
              valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Our Core Values</h2>
              <p className="max-w-3xl mx-auto text-gray-700">
                The principles that guide our work and define our organization's character.
              </p>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${
              valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {[
                {
                  icon: Heart,
                  title: "Compassion",
                  description: "Care that listens first."
                },
                {
                  icon: Users,
                  title: "Respect",
                  description: "Every elder is entitled to dignity."
                },
                {
                  icon: Star,
                  title: "Excellence",
                  description: "High standards in training and service delivery."
                },
                {
                  icon: Zap,
                  title: "Empowerment",
                  description: "Strengthening caregivers, families and the elders themselves."
                }
              ].map((value, index) => (
                <div key={index} className="bg-charis-neutral-light p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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

        {/* Programs Section */}
        <section className="py-16 bg-charis-neutral-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Our Programs</h2>
              <p className="max-w-3xl mx-auto text-gray-700">
                Comprehensive interventions that transform lives through arts, training, and community support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Theatre & Arts for Healing */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-charis-blue-light flex items-center justify-center mb-6">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-xl font-bold text-charis-blue-dark mb-4">1. Theatre & Arts for Healing</h3>
                <p className="mb-4 text-gray-700">
                  We use drama, music, dance, poetry and storytelling as therapeutic tools. Our events give older persons a creative stage to express life stories, process grief, fight stigma and rebuild self-worth.
                </p>
                <p className="text-sm text-charis-blue-dark font-semibold">
                  Notable event: A music & arts festival for older persons themed at PCEA Riara Ridge Church, Githunguri, Kenya — a day of theatre, intergenerational performances and community celebration.
                </p>
              </div>

              {/* Train-the-Trainer */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-charis-green-light flex items-center justify-center mb-6">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-charis-blue-dark mb-4">2. Train-the-Trainer: Building Local Capacity</h3>
                <p className="mb-4 text-gray-700">
                  After participating in the Fulbright Elder Care training in Durban, South Africa (June 2024), we designed and delivered Train-the-Trainer programs around Nairobi, focused on community caregiving and arts facilitation.
                </p>
                <p className="text-sm text-charis-blue-dark font-semibold">
                  We train caregivers to detect early signs of dementia, use empathetic communication, implement safe practices, and lead arts activities as therapeutic interventions.
                </p>
              </div>

              {/* Feeding & Community Support */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-charis-blue-light flex items-center justify-center mb-6">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold text-charis-blue-dark mb-4">3. Feeding & Community Support</h3>
                <p className="mb-4 text-gray-700">
                  We run targeted feeding interventions in informal settlements to support nutritionally vulnerable older persons. We engage in feeding programmes in various slums across Nairobi, combining hot meals with health checks, psychosocial support and community referrals.
                </p>
              </div>

              {/* Economic Empowerment & Crafts */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-charis-green-light flex items-center justify-center mb-6">
                  <span className="text-2xl">🛍️</span>
                </div>
                <h3 className="text-xl font-bold text-charis-blue-dark mb-4">4. Economic Empowerment & Crafts</h3>
                <p className="mb-4 text-gray-700">
                  To restore dignity and sustain livelihoods, we support elders to produce crafts and market them beyond local markets. Charis Eagle Springs participates annually in LeadingAge Expo exhibitions in the USA, where we display and sell crafts made by older persons.
                </p>
                <p className="text-sm text-charis-blue-dark font-semibold">
                  Proceeds are returned to the crafters, creating income, pride and a visible global market for senior creativity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">How We Work</h2>
              <p className="max-w-3xl mx-auto text-gray-700">
                Our methodology combines intergenerational approaches with clinical safeguards and community partnerships.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Intergenerational & Community-Based",
                  description: "We design activities that include families, youth and civic institutions so older persons are integrated, not isolated."
                },
                {
                  title: "Arts as Therapy",
                  description: "All creative activities are facilitated with therapeutic intent — memory stimulation, emotional release, socialisation, and gentle physical activity."
                },
                {
                  title: "Capacity Building",
                  description: "Our Train-the-Trainer model builds people who can continue programmes sustainably."
                },
                {
                  title: "Clinical Safeguards",
                  description: "We partner with medical professionals to screen for vital signs and health risks before high-energy activities. Safety and dignity are paramount."
                },
                {
                  title: "Partnership-Driven",
                  description: "We collaborate with churches, companies, NGOs and international partners to scale impact."
                }
              ].map((item, index) => (
                <div key={index} className="bg-charis-neutral-light p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-charis-blue-dark mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact & Achievements Section */}
        <section className="py-16 bg-charis-neutral-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Impact & Achievements</h2>
              <p className="max-w-3xl mx-auto text-gray-700">
                Our journey of transformation and measurable impact across Eastern Africa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-charis-green-light flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-charis-green-dark text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Registered and operating in Nairobi since 2019, serving communities across the region.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-charis-green-light flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-charis-green-dark text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Trained caregivers through our Train-the-Trainer courses following Fulbright participation in Durban, June 2024.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-charis-green-light flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-charis-green-dark text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Delivered feeding and outreach activities in various slums (Eg Kibagare Slum), Nairobi, pairing nutrition with psychosocial care.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-charis-green-light flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-charis-green-dark text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Produced music and theatre festivals for older persons (e.g., PCEA Riara Ridge, Githunguri) that increased community engagement and mental wellbeing.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-charis-green-light flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-charis-green-dark text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Showcased elder-made crafts at LeadingAge Expo exhibitions in the USA, generating income for elders and raising international awareness.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Get Involved</h2>
              <p className="max-w-3xl mx-auto text-gray-700">
                Charis Eagle Springs welcomes partners, volunteers, donors and advocates. Join us to ensure that every elder lives with dignity, purpose and a voice.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Donate",
                  description: "Support feeding programmes and caregiver training.",
                  icon: "💝"
                },
                {
                  title: "Partner",
                  description: "Partner with us on events, health screenings and capacity building.",
                  icon: "🤝"
                },
                {
                  title: "Volunteer",
                  description: "Volunteer as a facilitator, fundraiser or logistics support.",
                  icon: "👥"
                },
                {
                  title: "Adopt a Grandparent",
                  description: "Mentor, visit and support an elder in your community.",
                  icon: "👴👵"
                }
              ].map((item, index) => (
                <div key={index} className="bg-charis-neutral-light p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-charis-blue-dark mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-charis-blue-dark font-semibold">
                Charis Eagle Springs believes that ageing is not the end of contribution — it is a season that deserves respect, creativity and care.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default About;
