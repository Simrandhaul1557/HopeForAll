import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroVisual from "@/components/ui/HeroVisual";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, CreditCard, DollarSign, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DonorWall from "@/components/donor/DonorWall";

const Donate = () => {
  const { toast } = useToast();
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = ["25", "50", "100", "250", "500"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Thank you for your donation!',
      description: 'Your contribution will make a real difference.',
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16 relative">
          <HeroVisual />
          <div className="text-center max-w-3xl mx-auto animate-fade-in relative z-10">
            <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-4 rounded-full w-fit mx-auto mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Make a <span className="gradient-text">Donation</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Every contribution, no matter the size, helps us create lasting change in communities around the world
            </p>
          </div>
        </section>

        {/* Donation Form */}
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="md:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Donation Details</CardTitle>
                  <CardDescription>Choose your donation amount and frequency</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Donation Type */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Donation Frequency</Label>
                      <RadioGroup value={donationType} onValueChange={setDonationType} className="grid grid-cols-2 gap-4">
                        <div>
                          <RadioGroupItem value="one-time" id="one-time" className="peer sr-only" />
                          <Label
                            htmlFor="one-time"
                            className="flex items-center justify-center rounded-lg border-2 border-border bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[hsl(330,100%,50%)] peer-data-[state=checked]:bg-[hsl(330,100%,50%)]/10 cursor-pointer transition-all"
                          >
                            One-Time
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                          <Label
                            htmlFor="monthly"
                            className="flex items-center justify-center rounded-lg border-2 border-border bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[hsl(330,100%,50%)] peer-data-[state=checked]:bg-[hsl(330,100%,50%)]/10 cursor-pointer transition-all"
                          >
                            Monthly
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Amount Selection */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Select Amount</Label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {predefinedAmounts.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setAmount(amt);
                              setCustomAmount("");
                            }}
                            className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                              amount === amt
                                ? "border-[hsl(330,100%,50%)] bg-[hsl(330,100%,50%)]/10"
                                : "border-border hover:border-[hsl(330,100%,50%)]/50"
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Custom amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setAmount("");
                          }}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Personal Information</Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Payment Method</Label>
                      <Select defaultValue="card">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/10">
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Card Details */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="pl-10" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" type="password" maxLength={3} required />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      <Lock className="w-5 h-5 mr-2" />
                      Complete Donation
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Your payment is secure and encrypted. We never store your card details.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Impact Summary */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-[hsl(330,100%,50%)]/10 to-[hsl(280,100%,60%)]/10 rounded-lg border border-[hsl(330,100%,50%)]/20">
                    <p className="text-3xl font-bold gradient-text mb-1">
                      ${customAmount || amount || "0"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {donationType === "monthly" ? "per month" : "one-time"}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] mt-1.5"></div>
                      <p className="text-muted-foreground">100% of your donation goes directly to our programs</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] mt-1.5"></div>
                      <p className="text-muted-foreground">Tax-deductible receipt sent via email</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] mt-1.5"></div>
                      <p className="text-muted-foreground">Cancel monthly donations anytime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Other Ways to Give</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">• Corporate matching</p>
                  <p className="text-muted-foreground">• Planned giving</p>
                  <p className="text-muted-foreground">• Stock donations</p>
                  <p className="text-muted-foreground">• Donor-advised funds</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <DonorWall /> 
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
