import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Users, ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { events } from "@/components/ui/EventsCalendar";

const EventSignUp = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Find the event by ID
  const event = events.find((e) => e.id === eventId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    toast({
      title: "Success!",
      description: `You've successfully signed up for ${event?.title}. We'll send you more details soon!`,
    });
    // Navigate back to the volunteer page after 2 seconds
    setTimeout(() => {
      navigate("/volunteer");
    }, 2000);
  };

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/volunteer")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Volunteer
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
              {/* Event Header */}
              <div className="bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <p className="text-white/90">{event.description}</p>
              </div>
              
              <div className="p-6 md:p-8">
                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Date</h3>
                        <p className="text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Time</h3>
                        <p className="text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Available Spots</h3>
                        <p className="text-muted-foreground">{event.spots} remaining</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Signup Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Sign Up for This Event</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Why do you want to volunteer for this event? (Optional)</Label>
                      <Textarea id="message" rows={3} />
                    </div>
                    
                    <div className="pt-2">
                      <Button type="submit" className="w-full">
                        Complete Sign Up
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      By signing up, you agree to our volunteer terms and conditions.
                    </p>
                  </form>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">What to bring:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                      <span>Comfortable clothing and shoes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                      <span>Water bottle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                      <span>Any required personal medication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventSignUp;
