import React from "react";
import { CalendarCheck, ArrowRight, Star, CheckCircle, Clock } from "lucide-react";
import { Card } from "./card";

interface Milestone {
  id: string;
  title: string;
  date: string;
  status: "completed" | "in-progress" | "upcoming";
  description: string;
  impact?: string;
}

interface Project {
  id: string;
  title: string;
  timeline: Milestone[];
  startDate: string;
  endDate: string;
  progress: number;
}

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Rural Education Initiative",
    startDate: "2025-01",
    endDate: "2025-12",
    progress: 65,
    timeline: [
      {
        id: "m1",
        title: "School Building Construction",
        date: "2025-03",
        status: "completed",
        description: "Completed construction of main school building with 6 classrooms",
        impact: "Can accommodate 180 students"
      },
      {
        id: "m2",
        title: "Teacher Training Program",
        date: "2025-06",
        status: "completed",
        description: "Trained 12 local teachers in modern teaching methods",
        impact: "Enhanced learning experience for students"
      },
      {
        id: "m3",
        title: "Digital Lab Setup",
        date: "2025-08",
        status: "in-progress",
        description: "Setting up computer lab with 20 workstations",
        impact: "Will provide digital literacy to 400+ students"
      },
      {
        id: "m4",
        title: "Library Development",
        date: "2025-11",
        status: "upcoming",
        description: "Creating library with 5000+ books",
        impact: "Will serve entire community"
      }
    ]
  }
];

const statusColors = {
  completed: "text-green-500",
  "in-progress": "text-[hsl(330,100%,50%)]",
  upcoming: "text-muted-foreground"
};

const statusIcons = {
  completed: CheckCircle,
  "in-progress": Clock,
  upcoming: CalendarCheck
};

const ProjectTimeline: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Project <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track our progress and see the impact of your support in real-time.
          </p>
        </div>

        {sampleProjects.map((project) => (
          <Card key={project.id} className="mb-8 p-6 glass-card">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground">
                  {project.startDate} - {project.endDate}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Progress</div>
                    <div className="font-bold gradient-text">{project.progress}%</div>
                  </div>
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[hsl(330,100%,50%)] to-[hsl(280,100%,60%)]"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 relative before:absolute before:left-[17px] before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[hsl(330,100%,50%)] before:to-[hsl(280,100%,60%)] before:opacity-20">
              {project.timeline.map((milestone) => {
                const StatusIcon = statusIcons[milestone.status];
                return (
                  <div
                    key={milestone.id}
                    className="relative pl-10 animate-fade-in hover:translate-x-1 transition-transform"
                  >
                    <div className="absolute left-0 top-1.5 bg-background rounded-full p-0.5">
                      <StatusIcon className={`w-5 h-5 ${statusColors[milestone.status]}`} />
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{milestone.title}</h4>
                        <span className="text-sm text-muted-foreground">{milestone.date}</span>
                      </div>
                      <p className="text-muted-foreground mb-2">{milestone.description}</p>
                      {milestone.impact && (
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-[hsl(330,100%,50%)]" />
                          <span className="gradient-text font-medium">{milestone.impact}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <button className="text-sm text-[hsl(330,100%,50%)] hover:text-[hsl(330,100%,60%)] flex items-center gap-1 mx-auto transition-colors">
                View Detailed Reports
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectTimeline;