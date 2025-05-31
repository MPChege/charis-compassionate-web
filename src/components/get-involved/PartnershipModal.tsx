
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Building2, Handshake, Star, Zap, Target } from "lucide-react";

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PartnershipModal = ({ isOpen, onClose }: PartnershipModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [partnershipData, setPartnershipData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    organizationType: "",
    website: "",
    description: "",
    goals: "",
    resources: ""
  });

  const partnershipTypes = [
    { id: "strategic", label: "Strategic Partnership", icon: "🤝", description: "Long-term collaboration" },
    { id: "event", label: "Event Co-sponsorship", icon: "🎪", description: "Joint events and programs" },
    { id: "resource", label: "Resource Sharing", icon: "📚", description: "Share expertise and materials" },
    { id: "funding", label: "Funding Partnership", icon: "💰", description: "Financial support programs" },
    { id: "advocacy", label: "Advocacy Alliance", icon: "📢", description: "Joint advocacy initiatives" },
    { id: "research", label: "Research Collaboration", icon: "🔬", description: "Joint research projects" }
  ];

  const organizationTypes = [
    "Non-profit Organization",
    "Healthcare Institution",
    "Educational Institution",
    "Government Agency",
    "Corporate/Business",
    "Community Group",
    "Other"
  ];

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartnershipData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Partnership application:", { ...partnershipData, types: selectedTypes });
    
    toast({
      title: "🚀 Partnership Application Received!",
      description: "We're excited about potential collaboration. Our team will review your application and contact you within 5 business days.",
      variant: "default",
    });

    // Reset and close
    setStep(1);
    setSelectedTypes([]);
    setPartnershipData({
      organizationName: "",
      contactName: "",
      email: "",
      phone: "",
      organizationType: "",
      website: "",
      description: "",
      goals: "",
      resources: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-charis-blue-dark">
            <Handshake className="h-6 w-6 text-charis-green" />
            Partnership Application
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center p-6 bg-gradient-to-br from-charis-purple-light to-charis-blue-light rounded-lg">
              <Star className="h-12 w-12 mx-auto text-charis-blue-dark mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-charis-blue-dark mb-2">
                Let's Create Impact Together
              </h3>
              <p className="text-gray-700">
                Select the types of partnership you're interested in exploring with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partnershipTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => handleTypeToggle(type.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedTypes.includes(type.id)
                      ? 'border-charis-green bg-charis-green-light shadow-lg'
                      : 'border-gray-200 hover:border-charis-blue-light'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-medium text-charis-blue-dark mb-1">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={selectedTypes.length === 0}
              className="w-full bg-charis-blue hover:bg-charis-blue-dark transform hover:scale-105 transition-all duration-200"
            >
              Continue to Application
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-charis-green" />
              <span className="text-sm text-gray-600">Partnership Types:</span>
              <div className="flex flex-wrap gap-1">
                {selectedTypes.map(typeId => {
                  const type = partnershipTypes.find(t => t.id === typeId);
                  return (
                    <Badge key={typeId} variant="secondary" className="bg-charis-green-light text-charis-green-dark">
                      {type?.label}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Organization Name
                </label>
                <Input
                  name="organizationName"
                  value={partnershipData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter organization name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Organization Type
                </label>
                <select
                  name="organizationType"
                  value={partnershipData.organizationType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-charis-blue focus:border-transparent"
                  required
                >
                  <option value="">Select type</option>
                  {organizationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Contact Person
                </label>
                <Input
                  name="contactName"
                  value={partnershipData.contactName}
                  onChange={handleInputChange}
                  placeholder="Enter contact name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={partnershipData.email}
                  onChange={handleInputChange}
                  placeholder="contact@organization.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Phone
                </label>
                <Input
                  name="phone"
                  value={partnershipData.phone}
                  onChange={handleInputChange}
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Website (Optional)
                </label>
                <Input
                  name="website"
                  value={partnershipData.website}
                  onChange={handleInputChange}
                  placeholder="https://organization.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Organization Description
              </label>
              <Textarea
                name="description"
                value={partnershipData.description}
                onChange={handleInputChange}
                placeholder="Briefly describe your organization's mission and activities..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Partnership Goals
              </label>
              <Textarea
                name="goals"
                value={partnershipData.goals}
                onChange={handleInputChange}
                placeholder="What do you hope to achieve through this partnership?"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Resources You Can Offer
              </label>
              <Textarea
                name="resources"
                value={partnershipData.resources}
                onChange={handleInputChange}
                placeholder="What resources, expertise, or support can your organization provide?"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-charis-green hover:bg-charis-green-dark transform hover:scale-105 transition-all duration-200"
              >
                <Zap className="mr-2 h-4 w-4" />
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PartnershipModal;
