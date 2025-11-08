import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroVisual from "@/components/ui/HeroVisual";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Heart, Globe, Clock, Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EventsCalendar from "@/components/ui/EventsCalendar";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { SkillMatching } from "@/components/volunteer/SkillMatching";

const Volunteer = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);
  const { t } = useTranslation();

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
        <section className="container mx-auto px-4 mb-16 relative">
          <HeroVisual />
          <div className="text-center max-w-3xl mx-auto animate-fade-in relative z-10">
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
                  <Link to="/volunteer-apply">
                    <Button variant="hero" className="w-full mt-4">
                      Apply
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Events Calendar Section */}
        <EventsCalendar />

        {/* Skill-Based Matching Section */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-muted/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-5xl lg:text-5xl font-bold mb-6">
                  {t('volunteer.title')}
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                  {t('volunteer.subtitle')}
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl shadow-2xl p-8 md:p-12">
                <SkillMatching />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Volunteer;
