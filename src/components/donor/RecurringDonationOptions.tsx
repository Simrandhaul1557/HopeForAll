import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Heart, CheckCircle2 } from "lucide-react";

const frequencyOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
];

const amountOptions = [50, 100, 250, 500, 1000];

export function RecurringDonationOptions() {
  const [frequency, setFrequency] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
        <p className="text-green-600 mb-6">
          Your recurring donation of ${selectedAmount || customAmount} {frequency} has been set up successfully!
        </p>
        <Button onClick={() => setIsSuccess(false)}>Make Another Donation</Button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-pink-100 p-2 rounded-full">
          <Heart className="w-6 h-6 text-pink-500" />
        </div>
        <h3 className="text-2xl font-bold">Make it Monthly</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">I want to give:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {amountOptions.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant={selectedAmount === amount ? "default" : "outline"}
                className={`h-14 text-lg ${selectedAmount === amount ? 'bg-gradient-to-r from-pink-500 to-purple-600' : ''}`}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
              >
                ${amount}
              </Button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              type="number"
              placeholder="Custom amount"
              className="pl-8 h-14 text-lg"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(0);
              }}
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Frequency:</h4>
          <RadioGroup 
            value={frequency} 
            onValueChange={setFrequency}
            className="grid grid-cols-3 gap-3"
          >
            {frequencyOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
          <Calendar className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800">Sustained Impact</p>
            <p className="text-sm text-blue-600">
              Your recurring gift helps us plan for the future and respond quickly to urgent needs.
            </p>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          disabled={!selectedAmount && !customAmount || isSubmitting}
        >
          {isSubmitting ? 'Processing...' : `Donate ${frequency}`}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          You can modify or cancel your recurring donation at any time.
        </p>
      </form>
    </div>
  );
}

export default RecurringDonationOptions;
