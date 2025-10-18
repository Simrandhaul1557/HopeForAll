import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Heart, Globe, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Volunteer = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll be in touch soon.",
    });
  };

  const skillOptions = [
    "Teaching",
    "Healthcare",
    "Construction",
    "Marketing",
    "Fundraising",
    "IT/Technology",
  ];

  const opportunities = [
    {
      icon: Heart,
      title: "Community Outreach",
      description: "Help organize events and engage with local communities",
      commitment: "10-15 hours/week",
    },
    {
      icon: Globe,
      title: "International Projects",
      description: "Join our teams working on projects around the world",
      commitment: "2-6 months",
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Guide and support youth in our education programs",
      commitment: "5-8 hours/week",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-4 rounded-full w-fit mx-auto mb-6">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join as a <span className="gradient-text">Volunteer</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Make a real difference by sharing your time, skills, and passion with communities in need
            </p>
          </div>
        </section>

        {/* Opportunities */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Volunteer <span className="gradient-text">Opportunities</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="glass-card text-center hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-4 rounded-full w-fit mx-auto mb-4">
                    <opportunity.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                  <CardDescription className="text-base">{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{opportunity.commitment}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="container mx-auto px-4 max-w-3xl">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">Volunteer Application</CardTitle>
              <CardDescription>Tell us about yourself and how you'd like to contribute</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location/City *</Label>
                    <Input id="location" required />
                  </div>
                </div>

                {/* Volunteer Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Volunteer Preferences</h3>
                  <div>
                    <Label htmlFor="availability">Availability *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hours">Hours per week *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hours per week" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        <SelectItem value="1-5">1-5 hours</SelectItem>
                        <SelectItem value="5-10">5-10 hours</SelectItem>
                        <SelectItem value="10-20">10-20 hours</SelectItem>
                        <SelectItem value="20+">20+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Skills & Interests */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Skills & Interests</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={skills.includes(skill)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSkills([...skills, skill]);
                            } else {
                              setSkills(skills.filter((s) => s !== skill));
                            }
                          }}
                        />
                        <Label htmlFor={skill} className="cursor-pointer">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <Label htmlFor="motivation">Why do you want to volunteer with us? *</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Tell us about your motivation and what you hope to contribute..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Share any relevant volunteer or professional experience..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Submit Application
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting this form, you agree to our volunteer terms and conditions
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Volunteer;
