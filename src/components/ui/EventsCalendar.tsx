import React from "react";
import { CalendarDays, MapPin, Users, Clock, CheckCircle2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  spots: number;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Community Clean-Up Drive",
    date: "2025-11-05",
    time: "09:00 AM - 12:00 PM",
    location: "Central Park, City",
    description: "Join us to clean up the park and raise awareness about environmental sustainability.",
    spots: 30,
  },
  {
    id: "2",
    title: "Health Camp Volunteer",
    date: "2025-11-12",
    time: "10:00 AM - 4:00 PM",
    location: "Hope Clinic, Downtown",
    description: "Assist medical staff in providing free check-ups and health education to the community.",
    spots: 15,
  },
  {
    id: "3",
    title: "Education Workshop",
    date: "2025-11-20",
    time: "02:00 PM - 5:00 PM",
    location: "Sunrise School, Suburb",
    description: "Help organize and run interactive learning sessions for children.",
    spots: 20,
  },
];

const EventsCalendar: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="gradient-text">Volunteer Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get involved and make a difference! Sign up for our upcoming volunteer opportunities below.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="glass-card p-6 rounded-xl animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <CalendarDays className="w-5 h-5 text-[hsl(330,100%,50%)]" />
                <span className="font-semibold text-lg">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <h3 className="font-bold text-xl mb-2 gradient-text">{event.title}</h3>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-4">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{event.spots} spots available</span>
              </div>
              <a 
                href={`/events/${event.id}/signup`}
                className="block w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] text-white font-semibold hover:opacity-90 transition text-center"
              >
                Sign Up
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
