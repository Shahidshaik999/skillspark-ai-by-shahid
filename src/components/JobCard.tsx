import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Resource = {
  label: string;
  url: string;
};

type JobCardProps = {
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills?: string[];
  delay?: number;
};

// simple skill → resources mapping
const LEARNING_RESOURCES: Record<string, Resource[]> = {
  react: [
    {
      label: "React Official Docs",
      url: "https://react.dev/learn",
    },
    {
      label: "FreeCodeCamp React Course",
      url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    },
  ],
  "node.js": [
    {
      label: "Node.js Docs",
      url: "https://nodejs.org/en/docs",
    },
    {
      label: "Node.js Crash Course",
      url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
    },
  ],
  typescript: [
    {
      label: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/",
    },
  ],
  docker: [
    {
      label: "Docker Getting Started",
      url: "https://docs.docker.com/get-started/",
    },
    {
      label: "Docker for Beginners - YouTube",
      url: "https://www.youtube.com/watch?v=gAkwW2tuIqE",
    },
  ],
  aws: [
    {
      label: "AWS Cloud Practitioner Free Course",
      url: "https://www.youtube.com/watch?v=SOTamWNgDKc",
    },
  ],
  mongodb: [
    {
      label: "MongoDB University Free Courses",
      url: "https://learn.mongodb.com/",
    },
  ],
  "rest apis": [
    {
      label: "REST API Tutorial",
      url: "https://restfulapi.net/",
    },
  ],
  python: [
    {
      label: "Python for Beginners",
      url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    },
  ],
  "machine learning": [
    {
      label: "Andrew Ng ML Course (Free Audit)",
      url: "https://www.coursera.org/learn/machine-learning",
    },
  ],
};

const getResourcesForSkills = (skills: string[]): Resource[] => {
  const seen = new Set<string>();
  const result: Resource[] = [];

  skills.forEach((skill) => {
    const key = skill.toLowerCase();
    const resources = LEARNING_RESOURCES[key];
    if (resources) {
      resources.forEach((res) => {
        const id = key + res.url;
        if (!seen.has(id)) {
          seen.add(id);
          result.push(res);
        }
      });
    }
  });

  return result;
};

export const JobCard = ({
  title,
  company,
  location,
  matchPercentage,
  requiredSkills,
  matchedSkills,
  missingSkills = [],
  delay = 0,
}: JobCardProps) => {
  const hasGaps = missingSkills.length > 0;
  const learningLinks = hasGaps ? getResourcesForSkills(missingSkills) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="bg-card/60 backdrop-blur-sm border border-border/50 hover:border-neon-cyan/60 transition-all duration-300 hover:shadow-glow-purple">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-neon-cyan" />
                <h3 className="font-display text-xl font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>{company}</span>
                <span className="text-xs">•</span>
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">
                Skill Match
              </p>
              <p className="font-display text-2xl font-bold text-neon-cyan">
                {matchPercentage}%
              </p>
              <Progress value={matchPercentage} className="mt-1 h-2" />
            </div>
          </div>

          {/* Skills row */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Matched skills
            </p>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.length > 0 ? (
                matchedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-neon-cyan/15 text-neon-cyan border-neon-cyan/40"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  No direct matches yet.
                </span>
              )}
            </div>
          </div>

          {/* Skill gaps */}
          {hasGaps && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Skill gaps
              </p>
              <p className="text-sm text-muted-foreground">
                Improve:{" "}
                <span className="text-foreground font-medium">
                  {missingSkills.join(", ")}
                </span>
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm">
              View & Apply
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>

            {hasGaps && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gradient-primary text-sm flex items-center gap-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    Fix my gaps
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Learning roadmap for this job</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 mt-2">
                    <p className="text-sm text-muted-foreground">
                      Focus on these skills to boost your match for{" "}
                      <span className="font-semibold">{title}</span>:
                    </p>

                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {missingSkills.map((skill) => (
                        <li key={skill}>
                          <span className="font-semibold">{skill}</span>
                        </li>
                      ))}
                    </ul>

                    {learningLinks.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">
                          Recommended free resources:
                        </p>
                        <ul className="space-y-1 text-sm">
                          {learningLinks.map((res) => (
                            <li key={res.url}>
                              <a
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-neon-cyan hover:underline flex items-center gap-1"
                              >
                                <ArrowUpRight className="w-3 h-3" />
                                {res.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No specific links mapped for these skills yet. You can
                        still search them on YouTube or roadmap.sh.
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
