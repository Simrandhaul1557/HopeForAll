import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Leaf, ArrowRight, FileText, Download, Clock, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroVisual from "@/components/ui/HeroVisual";
import PartnerMarquee from "@/components/ui/PartnerMarquee";
import StoriesSection from "@/components/ui/StoriesSection";
import educationImage from "@/assets/cause-education.jpg";
import healthcareImage from "@/assets/cause-healthcare.jpg";
import sustainabilityImage from "@/assets/cause-sustainability.jpg";
import { useToast } from "@/hooks/use-toast";

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

  const causesRef = useRef<HTMLElement | null>(null);

  const scrollToCauses = () => {
    if (causesRef.current) {
      causesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resources = [
    {
      title: "Volunteer Handbook",
      url: "/docs/volunteer-handbook.pdf",
      desc: "Essential info for new volunteers."
    },
    {
      title: "Partner Onboarding Guide",
      url: "/docs/partner-onboarding.pdf",
      desc: "How to collaborate with our NGO."
    },
    {
      title: "Child Safety Policy",
      url: "/docs/child-safety-policy.pdf",
      desc: "Our commitment to safe environments."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroVisual />

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

            {/* Impact chips and trust line */}
            <div className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-3 rounded-lg">
                    <Heart className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold gradient-text">10K+</div>
                    <div className="text-sm text-muted-foreground">Lives Impacted</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-3 rounded-lg">
                    <Users className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold gradient-text">50+</div>
                    <div className="text-sm text-muted-foreground">Active Projects</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-3 rounded-lg">
                    <Leaf className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold gradient-text">200+</div>
                    <div className="text-sm text-muted-foreground">Volunteers</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground text-center">
                Trusted by communities and partners worldwide
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator (clickable & keyboard accessible) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div
            role="button"
            tabIndex={0}
            aria-label="Scroll to causes"
            onClick={scrollToCauses}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                scrollToCauses();
              }
            }}
            className="w-6 h-10 border-2 border-[hsl(330,100%,50%)] rounded-full flex items-start justify-center p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[hsl(330,100%,50%)]"
          >
            <div className="w-1 h-3 bg-gradient-to-b from-[hsl(330,100%,50%)] to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

  {/* Partner logos marquee */}
  <PartnerMarquee className="bg-transparent" />

      {/* Causes Section */}
      <section ref={causesRef} className="py-20">
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
                  <Link to={`/awareness?tag=${cause.tag}`}>
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

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="gradient-text">Supporters Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from people whose lives were touched by our programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aisha Rahman",
                role: "Community Leader",
                quote:
                  "The education programs transformed our village — children are excited to learn and attend school regularly.",
              },
              {
                name: "Carlos Mendes",
                role: "Healthcare Volunteer",
                quote:
                  "Local clinics now have the supplies and training they need to serve hundreds more patients each month.",
              },
              {
                name: "Priya Sharma",
                role: "Sustainability Advocate",
                quote:
                  "Their sustainable farming workshops helped our cooperative double its yield while protecting the land.",
              },
            ].map((t, i) => (
              <Card key={i} className="p-6">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] flex items-center justify-center text-white font-semibold">
                      {t.name
                        .split(" ")
                        .map((s) => s[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mt-4 text-base">“{t.quote}”</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <StoriesSection />

      {/* Downloadable Reports Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Annual <span className="gradient-text">Reports</span> & Transparency
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download our latest annual reports and transparency documents to see our impact and financials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: "2025",
                title: "Annual Report",
                url: "/docs/annual-report-2025.pdf"
              },
              {
                year: "2024",
                title: "Annual Report",
                url: "/docs/annual-report-2024.pdf"
              },
              {
                year: "2025",
                title: "Transparency Statement",
                url: "/docs/transparency-2025.pdf"
              }
            ].map((doc, i) => (
              <a
                key={i}
                href={doc.url}
                download
                className="glass-card p-6 rounded-xl flex flex-col items-center gap-4 hover:scale-[1.03] transition-transform group"
              >
                <FileText className="w-10 h-10 text-[hsl(330,100%,50%)] group-hover:text-[hsl(280,100%,60%)]" />
                <div className="text-lg font-semibold gradient-text">{doc.title}</div>
                <div className="text-sm text-muted-foreground">{doc.year}</div>
                <div className="flex items-center gap-2 text-[hsl(330,100%,50%)] font-medium">
                  <Download className="w-4 h-4" /> Download
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section for Volunteers & Partners */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Resources for <span className="gradient-text">Volunteers & Partners</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access guides, training materials, and policy documents to help you make the most impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                download
                className="glass-card p-6 rounded-xl flex flex-col items-center gap-4 hover:scale-[1.03] transition-transform group"
              >
                <FileText className="w-10 h-10 text-[hsl(330,100%,50%)] group-hover:text-[hsl(280,100%,60%)]" />
                <div className="text-lg font-semibold gradient-text">{resource.title}</div>
                <div className="text-sm text-muted-foreground text-center">{resource.desc}</div>
                <div className="flex items-center gap-2 text-[hsl(330,100%,50%)] font-medium">
                  <Download className="w-4 h-4" /> Download
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from Our Blog Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest from Our Blog</h2>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              View all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "5 Ways to Make a Difference in Your Community",
                excerpt: "Discover simple yet impactful ways to contribute to your local community and create positive change.",
                publishedAt: '2023-10-20',
                readTime: '4 min read',
                category: 'Community',
                image: '/src/assets/community.jpg',
                slug: '5-ways-to-make-a-difference'
              },
              {
                id: 2,
                title: "The Importance of Sustainable Development",
                excerpt: "Learn why sustainable development is crucial for our future and how you can contribute to a greener planet.",
                publishedAt: '2023-10-15',
                readTime: '6 min read',
                category: 'Sustainability',
                image: '/src/assets/sustainability.jpg',
                slug: 'sustainable-development-importance'
              },
              {
                id: 3,
                title: "How Education Transforms Lives",
                excerpt: "Explore the transformative power of education and how it can break the cycle of poverty.",
                publishedAt: '2023-10-10',
                readTime: '5 min read',
                category: 'Education',
                image: '/src/assets/Education.jpg',
                slug: 'education-transforms-lives'
              }
            ].map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="group">
                <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-12 pt-8">
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

      {/* Newsletter Signup */}
      <section className="pt-0 pb-12">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">Subscribe to our newsletter for stories, updates, and volunteer opportunities.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};


    const NewsletterForm: React.FC = () => {
      const [email, setEmail] = useState("");
      const { toast } = useToast();

      const validateEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(email)) {
          toast({ title: "Invalid email", description: "Please enter a valid email address." });
          return;
        }

        // Placeholder: integrate with real subscription API
        toast({ title: "Subscribed", description: "Thanks for subscribing to our newsletter!" });
        setEmail("");
      };

      return (
        <form onSubmit={onSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-input bg-transparent focus:ring-2 focus:ring-[hsl(330,100%,50%)]"
            aria-label="Email address"
            required
          />
          <Button type="submit" variant="hero">
            Subscribe
          </Button>
        </form>
      );
    };

    export default Home;
