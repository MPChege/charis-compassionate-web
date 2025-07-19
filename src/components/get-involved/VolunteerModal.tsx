
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, Calendar, Users, CheckCircle, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerModal = ({ isOpen, onClose }: VolunteerModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
    experience: "",
    motivation: ""
  });

  const volunteerAreas = [
    { id: "workshops", label: "Theatre Workshops", icon: "🎭" },
    { id: "events", label: "Community Events", icon: "🎪" },
    { id: "admin", label: "Administrative Support", icon: "📋" },
    { id: "outreach", label: "Community Outreach", icon: "🤝" },
    { id: "fundraising", label: "Fundraising", icon: "💰" },
    { id: "marketing", label: "Marketing & Communications", icon: "📢" }
  ];

  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Save to database
      const { error } = await supabase
        .from('volunteer_applications')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          availability: formData.availability || null,
          experience: formData.experience || null,
          motivation: formData.motivation || null,
          volunteer_areas: selectedAreas
        }]);

      if (error) {
        console.error('Error submitting application:', error);
        toast({
          title: "Error",
          description: "Failed to submit your application. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-volunteer-email', {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            availability: formData.availability,
            experience: formData.experience,
            motivation: formData.motivation,
            volunteer_areas: selectedAreas
          }
        });

        if (emailError) {
          console.error('Error sending email notification:', emailError);
        }
      } catch (emailError) {
        console.error('Error with email function:', emailError);
      }

      toast({
        title: "🎉 Welcome to the Team!",
        description: "Your volunteer application has been submitted. We'll contact you within 48 hours!",
        variant: "default",
      });

      // Reset and close
      setStep(1);
      setSelectedAreas([]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        availability: "",
        experience: "",
        motivation: ""
      });
      onClose();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-charis-blue-dark">
            <Heart className="h-6 w-6 text-charis-green" />
            Join Our Volunteer Family
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center p-6 bg-gradient-to-br from-charis-blue-light to-charis-green-light rounded-lg">
              <Sparkles className="h-12 w-12 mx-auto text-charis-blue-dark mb-4" />
              <h3 className="text-xl font-semibold text-charis-blue-dark mb-2">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-700">
                Choose the areas where you'd like to volunteer. You can select multiple areas!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {volunteerAreas.map((area) => (
                <div
                  key={area.id}
                  onClick={() => handleAreaToggle(area.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedAreas.includes(area.id)
                      ? 'border-charis-green bg-charis-green-light shadow-lg'
                      : 'border-gray-200 hover:border-charis-blue-light'
                  }`}
                >
                  <div className="text-2xl mb-2">{area.icon}</div>
                  <div className="font-medium text-charis-blue-dark">{area.label}</div>
                  {selectedAreas.includes(area.id) && (
                    <CheckCircle className="h-5 w-5 text-charis-green-dark mt-2" />
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={selectedAreas.length === 0}
              className="w-full bg-charis-blue hover:bg-charis-blue-dark transform hover:scale-105 transition-all duration-200"
            >
              Continue to Application
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-charis-green" />
              <span className="text-sm text-gray-600">Selected Areas:</span>
              <div className="flex flex-wrap gap-1">
                {selectedAreas.map(areaId => {
                  const area = volunteerAreas.find(a => a.id === areaId);
                  return (
                    <Badge key={areaId} variant="secondary" className="bg-charis-green-light text-charis-green-dark">
                      {area?.label}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Availability</label>
                <Input
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekends, 2 hours/week"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Relevant Experience (Optional)
              </label>
              <Textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Tell us about any relevant experience you have..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                What motivates you to volunteer with us?
              </label>
              <Textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                placeholder="Share what drives your passion for helping older persons..."
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || isSubmitting}
                className="flex-1 bg-charis-green hover:bg-charis-green-dark transform hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerModal;
