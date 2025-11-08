import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Gift, TrendingUp } from "lucide-react";

const impactMetrics = [
  {
    title: "Lives Impacted",
    value: "10,000+",
    description: "Direct beneficiaries of our programs",
    icon: <Heart className="w-8 h-8 text-pink-500" />
  },
  {
    title: "Active Donors",
    value: "2,500+",
    description: "Compassionate supporters like you",
    icon: <Users className="w-8 h-8 text-blue-500" />
  },
  {
    title: "Funds Raised",
    value: "$2.5M+",
    description: "Towards our mission",
    icon: <TrendingUp className="w-8 h-8 text-green-500" />
  }
];

export function DonorImpactDashboard() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Your <span className="gradient-text">Impact</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                {metric.icon}
              </div>
              <CardTitle className="text-3xl font-bold mb-2">{metric.value}</CardTitle>
              <p className="text-lg font-medium mb-2">{metric.title}</p>
              <p className="text-muted-foreground">{metric.description}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Current Campaign Progress</h3>
          <div className="space-y-6">
            {[
              { title: "Education Fund", progress: 75, goal: "$100,000", raised: "$75,000" },
              { title: "Healthcare Initiative", progress: 45, goal: "$150,000", raised: "$67,500" },
              { title: "Sustainable Farming", progress: 30, goal: "$75,000", raised: "$22,500" },
            ].map((campaign, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{campaign.title}</span>
                  <span className="text-muted-foreground">
                    {campaign.raised} of {campaign.goal}
                  </span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonorImpactDashboard;
