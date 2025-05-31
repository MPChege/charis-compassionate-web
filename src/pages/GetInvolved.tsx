
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { Heart, HandHelping, Users, Link as LinkIcon, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation, useParallaxScroll } from "@/hooks/useScrollAnimation";
import VolunteerModal from "@/components/get-involved/VolunteerModal";
import DonationModal from "@/components/get-involved/DonationModal";
import PartnershipModal from "@/components/get-involved/PartnershipModal";

const GetInvolved = () => {
  const { toast } = useToast();
  const scrollY = useParallaxScroll();
  const { elementRef: waysRef, isVisible: waysVisible } = useScrollAnimation(0.1);
  const { elementRef: donationRef, isVisible: donationVisible } = useScrollAnimation(0.1);
  const { elementRef: formRef, isVisible: formVisible } = useScrollAnimation(0.1);
  const { elementRef: testimonialRef, isVisible: testimonialVisible } = useScrollAnimation(0.1);
  
  // Modal states
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);
  const [selectedDonationType, setSelectedDonationType] = useState<string>("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: ""
    });

    toast({
      title: "Form Submitted!",
      description: "Thank you for your interest. We'll be in touch soon.",
      variant: "default",
    });
  };

  const handleDonationSelect = (donationType: string) => {
    setSelectedDonationType(donationType);
    setDonationModalOpen(true);
  };

  const donations = [
    {
      title: "One-time Donation",
      description: "Support our work with a single contribution of any amount.",
      amount: "Any amount helps",
      benefits: [
        "Immediate impact on our programs",
        "Tax-deductible contribution",
        "Recognition on our donor list (optional)"
      ]
    },
    {
      title: "Monthly Giving",
      description: "Become a sustaining supporter with a recurring monthly donation.",
      amount: "Starting at $10/month",
      benefits: [
        "Sustained support for long-term initiatives",
        "Convenient automatic payments",
        "Quarterly impact updates",
        "Special recognition on our website"
      ]
    },
    {
      title: "Corporate Sponsorship",
      description: "Partner with us as a business to make a larger impact.",
      amount: "Custom packages available",
      benefits: [
        "Brand visibility on materials and events",
        "Employee engagement opportunities",
        "Social responsibility recognition",
        "Custom impact reports"
      ]
    }
  ];

  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section className="relative bg-gradient-to-br from-charis-purple-light via-charis-blue-light to-charis-green-light pt-20 pb-16 overflow-hidden">
        {/* Floating elements with parallax */}
        <div 
          className="absolute top-20 right-10 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Heart className="w-20 h-20 text-charis-blue-dark animate-pulse" />
        </div>
        <div 
          className="absolute bottom-20 left-10 opacity-20"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        >
          <HandHelping className="w-16 h-16 text-charis-green-dark animate-pulse delay-700" />
        </div>
        
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-6 animate-fade-in">Get Involved</h1>
            <p className="text-xl text-gray-700">
              Join us in our mission to improve mental health care and awareness for older persons. There are many ways to contribute and make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Get Involved with Scroll Animation */}
      <section ref={waysRef} className="py-16 bg-white">
        <div className="container-custom">
          <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            waysVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Ways to Support Our Mission</h2>
            <p className="text-gray-700">
              Whether through volunteering, donating, or partnering with us, your support helps us create a more compassionate world for older persons.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            waysVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Volunteer */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-charis-blue-light flex items-center justify-center mb-4">
                  <HandHelping className="h-8 w-8 text-charis-blue-dark" />
                </div>
                <CardTitle className="text-2xl text-charis-blue-dark">Volunteer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-6">
                  Share your time and skills to support our programs and help older persons in your community.
                </CardDescription>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>Assist with workshops and events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>Provide administrative support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>Help with community outreach</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <Button 
                  onClick={() => setVolunteerModalOpen(true)}
                  className="bg-charis-blue hover:bg-charis-blue-dark w-full transform hover:scale-105 transition-all duration-200"
                >
                  Become a Volunteer
                </Button>
              </CardFooter>
            </Card>

            {/* Donate */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-charis-green">
              <CardHeader className="pb-0">
                <div className="mx-auto h-16 w-16 rounded-full bg-charis-green-light flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-charis-green-dark" />
                </div>
                <CardTitle className="text-2xl text-charis-blue-dark">Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-6">
                  Support our work financially to help us expand our programs and reach more older persons in need.
                </CardDescription>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>One-time or recurring donations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>In-kind goods and services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>Corporate matching gifts</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <Button 
                  onClick={() => setDonationModalOpen(true)}
                  className="bg-charis-green hover:bg-charis-green-dark w-full transform hover:scale-105 transition-all duration-200"
                >
                  Donate Now
                </Button>
              </CardFooter>
            </Card>

            {/* Partner */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-charis-purple-light flex items-center justify-center mb-4">
                  <LinkIcon className="h-8 w-8 text-charis-blue-dark" />
                </div>
                <CardTitle className="text-2xl text-charis-blue-dark">Partner With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-6">
                  Collaborate with us as an organization to create greater impact through joint initiatives and programs.
                </CardDescription>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>Strategic partnerships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>Co-sponsored events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                    <span>Resource sharing</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <Button 
                  onClick={() => setPartnershipModalOpen(true)}
                  className="bg-charis-blue hover:bg-charis-blue-dark w-full transform hover:scale-105 transition-all duration-200"
                >
                  Become a Partner
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Options with Scroll Animation */}
      <section ref={donationRef} className="py-16 bg-charis-neutral-light">
        <div className="container-custom">
          <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            donationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Donation Options</h2>
            <p className="text-gray-700">
              Your financial support enables us to continue our vital work in mental health care and awareness for older persons.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            donationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {donations.map((donation, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-center text-charis-blue-dark">{donation.title}</CardTitle>
                  <div className="bg-charis-blue-light text-charis-blue-dark text-center py-2 px-4 rounded-full mx-auto mt-2 font-medium">
                    {donation.amount}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 mb-6 text-center">
                    {donation.description}
                  </CardDescription>
                  <div className="bg-charis-neutral-light/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-charis-blue-dark mb-2">Benefits:</h4>
                    <ul className="space-y-2">
                      {donation.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-charis-green-dark flex-shrink-0 mt-0.5 mr-2" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    onClick={() => handleDonationSelect(donation.title)}
                    className="bg-charis-green hover:bg-charis-green-dark w-full transform hover:scale-105 transition-all duration-200"
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form with Scroll Animation */}
      <section ref={formRef} className="py-16 bg-white">
        <div className="container-custom">
          <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
            formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Interested in Getting Involved?</h2>
            <p className="text-gray-700">
              Fill out the form below and we'll get in touch with you about the best ways to contribute based on your interests and availability.
            </p>
          </div>

          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number (Optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="interest" className="text-sm font-medium text-gray-700">
                    Area of Interest
                  </label>
                  <Input
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    placeholder="Volunteering, Donating, Partnering, etc."
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us a bit more about how you'd like to get involved"
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full bg-charis-blue hover:bg-charis-blue-dark">
                <Send className="mr-2 h-5 w-5" />
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section ref={testimonialRef} className="py-16 bg-charis-blue-light">
        <div className="container-custom">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            testimonialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Users className="h-16 w-16 mx-auto text-charis-blue-dark opacity-40 mb-8" />
            <p className="text-xl md:text-2xl italic text-charis-blue-dark mb-8">
              "Volunteering with Charis Eagle Springs has been one of the most rewarding experiences of my life. Seeing the positive impact on older persons and their families makes every minute worthwhile."
            </p>
            <div>
              <h4 className="font-semibold text-charis-blue-dark">James Mwangi</h4>
              <p className="text-gray-700">Volunteer since 2020</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <VolunteerModal 
        isOpen={volunteerModalOpen} 
        onClose={() => setVolunteerModalOpen(false)} 
      />
      
      <DonationModal 
        isOpen={donationModalOpen} 
        onClose={() => setDonationModalOpen(false)}
        selectedType={selectedDonationType}
      />
      
      <PartnershipModal 
        isOpen={partnershipModalOpen} 
        onClose={() => setPartnershipModalOpen(false)} 
      />

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default GetInvolved;
