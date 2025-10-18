import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, Award } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      description: "20+ years in nonprofit leadership",
    },
    {
      name: "Michael Chen",
      role: "Program Director",
      description: "Expert in community development",
    },
    {
      name: "Aisha Patel",
      role: "Healthcare Lead",
      description: "MD with focus on public health",
    },
    {
      name: "Carlos Rodriguez",
      role: "Education Coordinator",
      description: "Former teacher and curriculum designer",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">HopeForAll</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We are a global nonprofit organization dedicated to transforming lives through sustainable development, education, and healthcare initiatives.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card p-8 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-3 rounded-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower underserved communities worldwide by providing access to quality education, healthcare, and sustainable development opportunities. We believe every individual deserves the chance to thrive and reach their full potential.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-3 rounded-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where every person, regardless of their circumstances, has access to the resources and opportunities needed to live a healthy, educated, and fulfilling life. We envision communities that are self-sustaining and resilient.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="gradient-text">Core Values</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Inclusivity", description: "We embrace diversity and ensure equal opportunities for all" },
              { icon: Award, title: "Excellence", description: "We strive for the highest quality in everything we do" },
              { icon: Target, title: "Impact", description: "We focus on creating measurable, lasting change" },
              { icon: Eye, title: "Transparency", description: "We operate with honesty and accountability" },
            ].map((value, index) => (
              <Card key={index} className="glass-card p-6 text-center hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-4 rounded-lg w-fit mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Led by passionate professionals committed to making a difference
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-card overflow-hidden hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-48 bg-gradient-to-br from-[hsl(330,100%,50%)]/20 to-[hsl(280,100%,60%)]/20 flex items-center justify-center">
                  <Users className="w-20 h-20 text-muted-foreground/50" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-sm gradient-text font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
