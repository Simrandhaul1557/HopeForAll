import { Trophy, Star, Heart, Sparkles, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const donorLevels = [
  {
    name: "Visionary",
    minAmount: 10000,
    icon: <Trophy className="w-5 h-5" />,
    color: "text-yellow-400"
  },
  {
    name: "Benefactor",
    minAmount: 5000,
    icon: <Star className="w-5 h-5" />,
    color: "text-purple-400"
  },
  {
    name: "Patron",
    minAmount: 2500,
    icon: <Award className="w-5 h-5" />,
    color: "text-blue-400"
  },
  {
    name: "Supporter",
    minAmount: 1000,
    icon: <Heart className="w-5 h-5" />,
    color: "text-pink-400"
  },
  {
    name: "Friend",
    minAmount: 100,
    icon: <Sparkles className="w-5 h-5" />,
    color: "text-green-400"
  }
];

const recentDonors = [
  { name: "Sarah Johnson", amount: 2500, date: "2025-10-15", anonymous: false },
  { name: "Anonymous", amount: 5000, date: "2025-10-14", anonymous: true },
  { name: "Michael Chen", amount: 1000, date: "2025-10-14", anonymous: false },
  { name: "The Patel Family", amount: 250, date: "2025-10-13", anonymous: false },
  { name: "Emily Wilson", amount: 500, date: "2025-10-12", anonymous: false },
  { name: "Anonymous", amount: 10000, date: "2025-10-11", anonymous: true },
  { name: "David Kim", amount: 1500, date: "2025-10-10", anonymous: false },
  { name: "Lisa Rodriguez", amount: 750, date: "2025-10-09", anonymous: false },
  { name: "James Wilson", amount: 3000, date: "2025-10-08", anonymous: false },
  { name: "Anonymous", amount: 2000, date: "2025-10-07", anonymous: true },
];

const topDonors = [
  { name: "The Wilson Foundation", total: 50000, years: 5 },
  { name: "Tech for Good Inc.", total: 35000, years: 3 },
  { name: "Sarah & Robert Johnson", total: 28000, years: 7 },
  { name: "Global Impact Fund", total: 25000, years: 2 },
  { name: "The Patel Family", total: 18000, years: 4 },
  { name: "Anonymous", total: 15000, years: 1 },
  { name: "Michael Chen", total: 12000, years: 3 },
  { name: "Community Builders LLC", total: 10000, years: 5 },
  { name: "Emily Wilson", total: 8500, years: 2 },
  { name: "The Green Initiative", total: 7500, years: 3 },
];

const getDonorLevel = (amount: number) => {
  return donorLevels.find(level => amount >= level.minAmount) || donorLevels[donorLevels.length - 1];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function DonorWall() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Our Generous Supporters
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're grateful for the individuals and organizations who make our work possible.
          </p>
        </div>
        
        {/* Donor Levels */}
        <Card className="mb-12 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl">Donor Recognition Levels</CardTitle>
            <CardDescription>See how your contribution makes an impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {donorLevels.map((level, index) => (
                <div key={index} className="p-4 transition-all rounded-lg bg-card hover:bg-card/80">
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center ${level.color.replace('text', 'bg')}/10`}>
                    {React.cloneElement(level.icon, { className: `${level.color} w-6 h-6` })}
                  </div>
                  <h4 className={`font-semibold text-sm ${level.color}`}>{level.name}</h4>
                  <p className="text-xs text-muted-foreground">${level.minAmount.toLocaleString()}+</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Our most recent supporters</CardDescription>
            </CardHeader>
            <Separator className="bg-muted-foreground/20" />
            <CardContent className="p-0">
              <div className="divide-y divide-muted-foreground/10">
                {recentDonors.slice(0, 5).map((donor, index) => {
                  const level = getDonorLevel(donor.amount);
                  return (
                    <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 border border-muted-foreground/20">
                            <AvatarFallback className="bg-muted">
                              {donor.anonymous ? 'A' : donor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {donor.anonymous ? 'Anonymous' : donor.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(donor.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(donor.amount)}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${level.color} border-muted-foreground/20`}
                          >
                            {level.name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Donors */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Top Donors</CardTitle>
              <CardDescription>Our most generous supporters</CardDescription>
            </CardHeader>
            <Separator className="bg-muted-foreground/20" />
            <CardContent className="p-0">
              <div className="divide-y divide-muted-foreground/10">
                {topDonors.slice(0, 5).map((donor, index) => {
                  const level = getDonorLevel(donor.total);
                  return (
                    <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-6 h-6 text-sm font-bold rounded-full bg-muted">
                            {index + 1}
                          </div>
                          <p className="font-medium text-sm">{donor.name}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${level.color} border-muted-foreground/20`}
                        >
                          {level.name}
                        </Badge>
                      </div>
                      <div className="pl-9">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                          <span>Total Donated</span>
                          <span className="font-medium">{formatCurrency(donor.total)}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-muted">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500" 
                            style={{ width: `${Math.min(100, (donor.total / 50000) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>{donor.years} {donor.years === 1 ? 'year' : 'years'}</span>
                          <span>{Math.round((donor.total / 50000) * 100)}% of goal</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">Become a Supporter</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join our community of supporters and help us make a lasting impact in the lives of those we serve.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            asChild
          >
            <a href="/donate">
              Make a Donation
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default DonorWall;