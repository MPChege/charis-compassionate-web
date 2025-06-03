
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, DollarSign, CreditCard, Sparkles, Gift } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: string;
}

const DonationModal = ({ isOpen, onClose, selectedType }: DonationModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [donationData, setDonationData] = useState({
    amount: "",
    frequency: "one-time",
    paymentMethod: "",
    name: "",
    email: "",
    anonymous: false
  });

  const predefinedAmounts = ["500", "1000", "2500", "5000", "10000", "25000"];
  const paymentMethods = [
    { id: "mpesa", label: "M-Pesa", icon: "📱" },
    { id: "card", label: "Credit/Debit Card", icon: "💳" },
    { id: "bank", label: "Bank Transfer", icon: "🏦" }
  ];

  const handleAmountSelect = (amount: string) => {
    setDonationData(prev => ({ ...prev, amount }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setDonationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDonate = () => {
    console.log("Donation data:", donationData);
    
    toast({
      title: "🎉 Thank You for Your Generosity!",
      description: `Your ${donationData.frequency} donation of KSH ${Number(donationData.amount).toLocaleString()} will make a real difference in older persons' lives.`,
      variant: "default",
    });

    // Reset and close
    setStep(1);
    setDonationData({
      amount: "",
      frequency: "one-time",
      paymentMethod: "",
      name: "",
      email: "",
      anonymous: false
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-charis-blue-dark">
            <Gift className="h-6 w-6 text-charis-green" />
            Make a Donation
            {selectedType && (
              <Badge className="bg-charis-blue-light text-charis-blue-dark">
                {selectedType}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center p-6 bg-gradient-to-br from-charis-green-light to-charis-blue-light rounded-lg">
              <Heart className="h-12 w-12 mx-auto text-charis-green-dark mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-charis-blue-dark mb-2">
                Your Impact Matters
              </h3>
              <p className="text-gray-700">
                Every donation helps us reach more older persons with mental health support and theatre programs.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Choose Donation Amount (KSH)
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={donationData.amount === amount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(amount)}
                    className={`h-12 transition-all duration-200 hover:scale-105 ${
                      donationData.amount === amount 
                        ? 'bg-charis-green hover:bg-charis-green-dark' 
                        : 'hover:border-charis-green'
                    }`}
                  >
                    KSH {Number(amount).toLocaleString()}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <Input
                  name="amount"
                  value={donationData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter custom amount"
                  type="number"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Donation Frequency
              </label>
              <div className="flex gap-3">
                <Button
                  variant={donationData.frequency === "one-time" ? "default" : "outline"}
                  onClick={() => setDonationData(prev => ({ ...prev, frequency: "one-time" }))}
                  className={`flex-1 transition-all duration-200 hover:scale-105 ${
                    donationData.frequency === "one-time" 
                      ? 'bg-charis-blue hover:bg-charis-blue-dark' 
                      : ''
                  }`}
                >
                  One-time
                </Button>
                <Button
                  variant={donationData.frequency === "monthly" ? "default" : "outline"}
                  onClick={() => setDonationData(prev => ({ ...prev, frequency: "monthly" }))}
                  className={`flex-1 transition-all duration-200 hover:scale-105 ${
                    donationData.frequency === "monthly" 
                      ? 'bg-charis-blue hover:bg-charis-blue-dark' 
                      : ''
                  }`}
                >
                  Monthly
                </Button>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!donationData.amount}
              className="w-full bg-charis-green hover:bg-charis-green-dark transform hover:scale-105 transition-all duration-200"
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between p-4 bg-charis-neutral-light rounded-lg">
              <div>
                <span className="text-lg font-semibold text-charis-blue-dark">
                  KSH {Number(donationData.amount).toLocaleString()} {donationData.frequency}
                </span>
                <p className="text-sm text-gray-600">
                  {donationData.frequency === "monthly" 
                    ? "Recurring monthly donation" 
                    : "One-time donation"
                  }
                </p>
              </div>
              <Sparkles className="h-8 w-8 text-charis-green animate-pulse" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Payment Method
              </label>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setDonationData(prev => ({ ...prev, paymentMethod: method.id }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                      donationData.paymentMethod === method.id
                        ? 'border-charis-green bg-charis-green-light'
                        : 'border-gray-200 hover:border-charis-blue-light'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-medium text-charis-blue-dark">{method.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                <Input
                  name="name"
                  value={donationData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={donationData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={donationData.anonymous}
                onChange={handleInputChange}
                className="rounded border-gray-300"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Make this donation anonymous
              </label>
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
                onClick={handleDonate}
                disabled={!donationData.paymentMethod}
                className="flex-1 bg-charis-green hover:bg-charis-green-dark transform hover:scale-105 transition-all duration-200"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Complete Donation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
