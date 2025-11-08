import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Briefcase, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const skills = [
  "Teaching", "Mentoring", "Coding", "Design", "Marketing", 
  "Writing", "Photography", "Videography", "Social Media", 
  "Event Planning", "Fundraising", "Cooking", "First Aid", 
  "Translation", "Legal", "Accounting", "Healthcare", "Counseling"
];

const opportunities = [
  {
    id: 1,
    titleKey: "opportunities.youthMentor",
    orgKey: "organizations.futureLeaders",
    skills: ["Mentoring", "Teaching", "Counseling"],
    location: "New York, NY",
    commitment: "5-10",
    descKey: "descriptions.youthMentor"
  },
  {
    id: 2,
    titleKey: "opportunities.webDev",
    orgKey: "organizations.techForGood",
    skills: ["Coding", "Design"],
    location: "Remote",
    commitment: "10-15",
    descKey: "descriptions.webDev"
  },
  {
    id: 3,
    titleKey: "opportunities.healthWorker",
    orgKey: "organizations.healthFirst",
    skills: ["Healthcare", "First Aid", "Counseling"],
    location: "Chicago, IL",
    commitment: "8-12",
    descKey: "descriptions.healthWorker"
  }
];

export function SkillMatching() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const filteredOpportunities = opportunities.filter(opportunity => 
    selectedSkills.length === 0 || 
    selectedSkills.some(skill => opportunity.skills.includes(skill))
  );

  const { t } = useTranslation();

  return (
    <section className="py-12 bg-muted/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{t('volunteer.filterTitle')}</CardTitle>
              <CardDescription>{t('volunteer.filterDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t('volunteer.skills')}</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t('volunteer.location')}</Label>
                <Input
                  id="location"
                  placeholder="City, State, or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('volunteer.timeCommitment')}</Label>
                <Select value={timeCommitment} onValueChange={setTimeCommitment}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('volunteer.timeCommitment')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 hours/week</SelectItem>
                    <SelectItem value="5-10">5-10 hours/week</SelectItem>
                    <SelectItem value="10-15">10-15 hours/week</SelectItem>
                    <SelectItem value="15+">15+ hours/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Opportunities List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map(opportunity => (
                <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{t(opportunity.titleKey)}</h3>
                          {selectedSkills.some(skill => opportunity.skills.includes(skill)) && (
                            <Badge variant="secondary" className="text-xs">
                              {t('volunteer.goodMatch')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{t(opportunity.orgKey)}</p>
                        <p className="mt-3 text-sm">{t(opportunity.descKey)}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {opportunity.skills.map(skill => (
                            <Badge 
                              key={skill} 
                              variant={selectedSkills.includes(skill) ? "default" : "outline"}
                              className={selectedSkills.includes(skill) ? "bg-pink-500" : ""}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{t(`locations.${opportunity.location}`, { defaultValue: opportunity.location })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{t(`commitments.${opportunity.commitment}`, { defaultValue: `${opportunity.commitment} hours/week` })}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4 sm:mt-0">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">{t('volunteer.noOpportunities')}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('volunteer.tryFilters')}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedSkills([]);
                      setLocation("");
                      setTimeCommitment("");
                    }}
                  >
                    {t('volunteer.clearFilters')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
