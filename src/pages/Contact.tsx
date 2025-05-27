import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, MessageCircle, Globe, Headphones, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Reset the form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    // Show success toast
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll respond as soon as possible.",
      variant: "default"
    });
  };
  return <>
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background with modern overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charis-blue-dark via-charis-purple to-charis-green-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        {/* Communication icons floating */}
        <div className="absolute top-20 left-10 opacity-20">
          <MessageCircle className="w-16 h-16 text-white animate-pulse" />
        </div>
        <div className="absolute top-32 right-20 opacity-20">
          <Globe className="w-12 h-12 text-white animate-pulse delay-500" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-20">
          <Headphones className="w-14 h-14 text-white animate-pulse delay-1000" />
        </div>
        
        {/* Connection lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M20,20 Q50,5 80,20 T80,80 Q50,95 20,80 T20,20" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M10,50 Q30,30 50,50 T90,50" stroke="white" strokeWidth="0.3" fill="none" />
          </svg>
        </div>
        
        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="text-sm font-light tracking-widest text-white/80 uppercase mb-4 block">
                Connect • Communicate • Collaborate
              </span>
              <h1 className="font-heading text-white mb-6 leading-tight drop-shadow-lg">
                Contact Us
              </h1>
              <div className="flex justify-center items-center mb-8">
                <div className="w-6 h-6 bg-white/20 rounded-full mr-3"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-white/40 to-white/80 mr-3"></div>
                <div className="w-3 h-3 bg-white/60 rounded-full mr-3"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-white/80 to-white/40 mr-3"></div>
                <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Have questions or want to learn more? We're here to help. Reach out to our dedicated team using the information below.
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-white/60"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full mx-auto mt-2"></div>
        </div>
      </section>

      {/* Contact Information & Map */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <Card className="bg-charis-neutral-light border-none hover:bg-charis-blue-light/30 transition-colors">
                  <CardContent className="flex items-start p-6">
                    <div className="h-12 w-12 rounded-full bg-charis-blue-light flex items-center justify-center mr-6">
                      <MapPin className="h-6 w-6 text-charis-blue-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-charis-blue-dark mb-2">Our Location</h3>
                      <p className="text-gray-700">P.O. Box 62362-00200</p>
                      <p className="text-gray-700">Nairobi, Kenya</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-charis-neutral-light border-none hover:bg-charis-blue-light/30 transition-colors">
                  <CardContent className="flex items-start p-6">
                    <div className="h-12 w-12 rounded-full bg-charis-blue-light flex items-center justify-center mr-6">
                      <Phone className="h-6 w-6 text-charis-blue-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-charis-blue-dark mb-2">Phone</h3>
                      <p className="text-gray-700">+254 722 679 107</p>
                      <p className="text-gray-500 text-sm">Monday - Friday, 9am - 5pm</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-charis-neutral-light border-none hover:bg-charis-blue-light/30 transition-colors">
                  <CardContent className="flex items-start p-6">
                    <div className="h-12 w-12 rounded-full bg-charis-blue-light flex items-center justify-center mr-6">
                      <Mail className="h-6 w-6 text-charis-blue-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-charis-blue-dark mb-2">Email</h3>
                      <p className="text-gray-700">info@chriseaglesprings.org</p>
                      <p className="text-gray-500 text-sm">We'll respond as soon as possible</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-charis-neutral-light border-none hover:bg-charis-blue-light/30 transition-colors">
                  
                </Card>
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="font-semibold text-xl text-charis-blue-dark mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="h-12 w-12 rounded-full bg-charis-blue flex items-center justify-center text-white hover:bg-charis-blue-dark transition-colors" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="h-12 w-12 rounded-full bg-charis-blue flex items-center justify-center text-white hover:bg-charis-blue-dark transition-colors" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="h-12 w-12 rounded-full bg-charis-blue flex items-center justify-center text-white hover:bg-charis-blue-dark transition-colors" aria-label="X (formerly Twitter)">
                    <img src="/lovable-uploads/c5b2be7f-c9d2-401e-8b03-2b8f54fe800c.png" alt="X" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853792106!2d36.68258066316405!3d-1.3028617916137266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1650222190172!5m2!1sen!2sus" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Charis Eagle Springs Location" className="rounded-xl"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-charis-neutral-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Send Us a Message</h2>
              <p className="text-gray-700">
                Have a specific question or want to learn more about our programs? Fill out the form below and we'll get back to you.
              </p>
            </div>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is your message about?" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..." rows={6} required />
                  </div>
                  <Button type="submit" className="w-full bg-charis-blue hover:bg-charis-blue-dark">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ (Optional) */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-charis-blue-dark mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-700">
              Find quick answers to common questions about our organization and work.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[{
            question: "How can I volunteer with Charis Eagle Springs?",
            answer: "You can volunteer by filling out the form on our Get Involved page, or by contacting us directly via email or phone. We have various volunteer opportunities available depending on your skills and interests."
          }, {
            question: "Are donations to Charis Eagle Springs tax-deductible?",
            answer: "Yes, Charis Eagle Springs is a registered non-profit organization, and all donations are tax-deductible to the extent allowed by law. We provide receipts for all donations for tax purposes."
          }, {
            question: "Do you offer training for family caregivers?",
            answer: "Yes, we regularly conduct training sessions for family caregivers of elderly individuals with mental health challenges. Check our Awareness Hub page for upcoming training sessions and workshops."
          }, {
            question: "How can my organization partner with Charis Eagle Springs?",
            answer: "We welcome partnerships with organizations that share our mission of improving elderly mental health care. Please contact us through our website or by email to discuss potential collaboration opportunities."
          }].map((faq, index) => <div key={index} className="bg-charis-neutral-light rounded-lg p-6">
                <h3 className="text-xl font-semibold text-charis-blue-dark mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>)}
          </div>
        </div>
      </section>

      <Footer />
    </>;
};
export default Contact;