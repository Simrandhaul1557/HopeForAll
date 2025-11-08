import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroVisual from "@/components/ui/HeroVisual";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Leaf, GraduationCap, Stethoscope, Droplet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectTimeline from "@/components/ui/ProjectTimeline";

const Projects = () => {
  const ongoingProjects = [
    {
      title: "Rural Education Initiative",
      category: "Education",
      icon: GraduationCap,
      description: "Building schools and providing learning materials in rural communities across 5 countries.",
      progress: 75,
      beneficiaries: "5,000+ students",
      location: "Southeast Asia",
    },
    {
      title: "Mobile Health Clinics",
      category: "Healthcare",
      icon: Stethoscope,
      description: "Delivering essential healthcare services to remote villages with limited medical infrastructure.",
      progress: 62,
      beneficiaries: "10,000+ patients",
      location: "Sub-Saharan Africa",
    },
    {
      title: "Clean Water Access",
      category: "Infrastructure",
      icon: Droplet,
      description: "Installing water purification systems and wells in communities lacking clean water.",
      progress: 88,
      beneficiaries: "20,000+ people",
      location: "Latin America",
    },
    {
      title: "Sustainable Farming Program",
      category: "Agriculture",
      icon: Leaf,
      description: "Teaching modern farming techniques and providing tools for sustainable agriculture.",
      progress: 54,
      beneficiaries: "2,000+ farmers",
      location: "East Africa",
    },
  ];

  const completedProjects = [
    {
      title: "Women's Empowerment Center",
      category: "Social Development",
      icon: Users,
      description: "Established a community center providing vocational training and microfinance support for women.",
      impact: "500+ women trained and employed",
      location: "South Asia",
      year: "2023",
    },
    {
      title: "Youth Leadership Academy",
      category: "Education",
      icon: GraduationCap,
      description: "Created leadership development program for young people in underserved communities.",
      impact: "1,000+ youth graduated",
      location: "Central America",
      year: "2022",
    },
    {
      title: "Solar Energy Initiative",
      category: "Clean Energy",
      icon: Leaf,
      description: "Installed solar panels in 50 schools and health centers, providing reliable electricity.",
      impact: "50 facilities powered",
      location: "West Africa",
      year: "2023",
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Transforming communities through targeted initiatives that create lasting impact
            </p>
          </div>
        </section>

        {/* Projects Tabs */}
        <section className="container mx-auto px-4">
          <Tabs defaultValue="ongoing" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {ongoingProjects.map((project, index) => (
                  <Card key={index} className="glass-card hover:scale-[1.02] transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-3 rounded-lg">
                          <project.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>
                      <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-base">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Beneficiaries</p>
                          <p className="font-semibold">{project.beneficiaries}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Location</p>
                          <p className="font-semibold">{project.location}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold gradient-text">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] h-full rounded-full transition-all duration-1000"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Link to="/donate">
                        <Button variant="hero-outline" className="w-full">
                          Support This Project
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                {completedProjects.map((project, index) => (
                  <Card key={index} className="glass-card hover:scale-[1.02] transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-3 rounded-lg">
                          <project.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="outline" className="border-green-500 text-green-500">Completed {project.year}</Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-sm mb-4">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Impact</p>
                          <p className="font-semibold gradient-text">{project.impact}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Location</p>
                          <p className="font-semibold">{project.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Project Timeline Visualization */}
        <ProjectTimeline />

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-20">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Support Our <span className="gradient-text">Projects?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your contribution can help us expand our reach and create more positive change in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate">
                <Button variant="hero" size="lg">
                  Make a Donation
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="hero-outline" size="lg">
                  Volunteer With Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
