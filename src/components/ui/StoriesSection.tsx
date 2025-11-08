import React, { useState } from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Textarea } from "./textarea";
import { Input } from "./input";
import { useToast } from "@/hooks/use-toast";
import { Camera, Heart, Star, User } from "lucide-react";

interface Story {
  id: string;
  name: string;
  role: string;
  story: string;
  image?: string;
  featured?: boolean;
  date: string;
}

const sampleStories: Story[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Volunteer Teacher",
    story: "Teaching at the rural education center changed my life. Seeing the children's eyes light up when they understand a new concept is the most rewarding experience.",
    featured: true,
    date: "2025-10-15"
  },
  {
    id: "2",
    name: "David Chen",
    role: "Community Member",
    story: "The sustainable farming program helped our entire village become self-sufficient. We now grow enough food for everyone and even share with neighboring communities.",
    date: "2025-10-12"
  },
  {
    id: "3",
    name: "Maria Garcia",
    role: "Healthcare Beneficiary",
    story: "Thanks to the mobile health clinic, my children finally received the medical care they needed. The staff was compassionate and professional.",
    date: "2025-10-10"
  }
];

const StoriesSection: React.FC = () => {
  const { toast } = useToast();
  const [stories] = useState<Story[]>(sampleStories);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    story: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.story) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit your story.",
      });
      return;
    }

    // In a real app, this would send to an API
    toast({
      title: "Story submitted successfully!",
      description: "Thank you for sharing your story. It will be reviewed and published soon.",
    });
    
    setFormData({ name: "", role: "", story: "" });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Share Your <span className="gradient-text">Story</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every story has the power to inspire. Share your journey and experience with our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story) => (
            <div
              key={story.id}
              className={`glass-card p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                story.featured ? "border-2 border-[hsl(330,100%,50%)]/20" : ""
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{story.name}</h3>
                  <p className="text-sm text-muted-foreground">{story.role}</p>
                </div>
                {story.featured && (
                  <div className="ml-auto">
                    <Star className="w-5 h-5 text-[hsl(330,100%,50%)]" />
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">{story.story}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>{new Date(story.date).toLocaleDateString()}</span>
                <button
                  className="flex items-center gap-1 text-[hsl(330,100%,50%)] hover:text-[hsl(330,100%,60%)] transition-colors"
                  onClick={() => toast({ title: "Thanks for the love!" })}
                >
                  <Heart className="w-4 h-4" /> Like
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg" className="gap-2">
                <Camera className="w-5 h-5" />
                Share Your Story
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Share Your Story</DialogTitle>
                <DialogDescription>
                  Your story can inspire others and show the real impact of our work. Please share your experience with us.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Your Role (e.g., Volunteer, Community Member)"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Share your story here..."
                    className="min-h-[150px]"
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <Button type="submit" variant="hero">Submit Story</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;