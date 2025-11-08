import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroVisual from "@/components/ui/HeroVisual";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import axios from 'axios';

const VolunteerApply = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [] as string[],
    availability: ['weekends'], // Default value
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSkillChange = (value: string) => {
    setFormData(prev => {
      const skills = [...prev.skills];
      if (skills.includes(value)) {
        return { ...prev, skills: skills.filter(skill => skill !== value) };
      } else {
        return { ...prev, skills: [...skills, value] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/volunteers/apply',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: [],
        availability: ['weekends'],
        address: ''
      });
      
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillOptions = [
    "Teaching",
    "Healthcare",
    "Construction",
    "Marketing",
    "Fundraising",
    "IT/Technology",
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 mb-16 relative">
          <HeroVisual />
          <div className="text-center max-w-3xl mx-auto animate-fade-in relative z-10">
            <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-4 rounded-full w-fit mx-auto mb-6">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Volunteer <span className="gradient-text">Application</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Fill out the form below to apply for volunteer opportunities and make a real impact.
            </p>
          </div>
        </section>
        <section className="container mx-auto px-4 max-w-2xl">
          <Card className="glass-card p-8">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    required 
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    placeholder="+1 (123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Skills *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`skill-${skill}`} 
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={() => handleSkillChange(skill)}
                        />
                        <Label htmlFor={`skill-${skill}`} className="font-normal">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Your address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" required />
                  <Label htmlFor="agree">I agree to the terms and conditions</Label>
                </div>
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VolunteerApply;
