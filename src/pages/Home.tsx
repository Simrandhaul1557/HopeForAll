import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Leaf, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import heroImage from "@/assets/hero-bg.jpg";
import educationImage from "@/assets/cause-education.jpg";
import healthcareImage from "@/assets/cause-healthcare.jpg";
import sustainabilityImage from "@/assets/cause-sustainability.jpg";

const Home = () => {
  const causes = [
    {
      title: "Education for All",
      description: "Empowering children through quality education and learning resources.",
      image: educationImage,
      icon: Heart,
      raised: "75%",
    },
    {
      title: "Healthcare Access",
      description: "Providing essential medical care and health services to communities in need.",
      image: healthcareImage,
      icon: Users,
      raised: "62%",
    },
    {
      title: "Sustainable Development",
      description: "Building resilient communities through sustainable agriculture and clean energy.",
      image: sustainabilityImage,
      icon: Leaf,
      raised: "88%",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Together, We{" "}
              <span className="gradient-text">Empower Lives</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Join us in creating lasting change through education, healthcare, and sustainable development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/donate">
                <Button variant="hero" size="lg" className="min-w-[200px]">
                  Donate Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="hero-outline" size="lg" className="min-w-[200px]">
                  Join as Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[hsl(330,100%,50%)] rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gradient-to-b from-[hsl(330,100%,50%)] to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Causes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Making a difference in the lives of thousands through our dedicated programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {causes.map((cause, index) => (
              <Card
                key={index}
                className="glass-card hover:scale-105 transition-transform duration-300 overflow-hidden group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-3 rounded-lg">
                    <cause.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{cause.title}</CardTitle>
                  <CardDescription className="text-base">{cause.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold gradient-text">{cause.raised}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] h-full rounded-full transition-all duration-1000"
                        style={{ width: cause.raised }}
                      ></div>
                    </div>
                  </div>
                  <Link to="/projects">
                    <Button variant="ghost" className="w-full mt-4 group">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Lives Impacted" },
              { value: "50+", label: "Active Projects" },
              { value: "200+", label: "Volunteers" },
              { value: "$2M+", label: "Funds Raised" },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a <span className="gradient-text">Difference?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your support can transform lives. Join us today in our mission to create a better tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate">
                <Button variant="hero" size="lg">
                  Make a Donation
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
