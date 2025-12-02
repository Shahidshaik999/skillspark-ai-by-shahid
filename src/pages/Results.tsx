import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Filter, MapPin, Briefcase, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AnalysisResult = {
  fileName: string;
  skills: string[];
  suggestedRoles: string[];
};

type BaseJob = {
  title: string;
  company: string;
  location: string;
  requiredSkills: string[];
};

type JobWithMatch = BaseJob & {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
};

const Results = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [experience, setExperience] = useState([3]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [jobs, setJobs] = useState<JobWithMatch[]>([]);

  const baseJobs: BaseJob[] = [
    {
      title: "Senior Full Stack Engineer",
      company: "TechCorp Global",
      location: "Remote (USA)",
      requiredSkills: ["React", "TypeScript", "Node.js", "AWS", "MongoDB", "Docker"],
    },
    {
      title: "Frontend Developer",
      company: "Innovation Labs",
      location: "San Francisco, CA",
      requiredSkills: ["React", "TypeScript", "CSS", "Webpack", "Jest"],
    },
    {
      title: "DevOps Engineer",
      company: "CloudScale Inc",
      location: "Remote (Europe)",
      requiredSkills: ["Docker", "Kubernetes", "AWS", "Python", "CI/CD", "Terraform"],
    },
    {
      title: "Backend Developer",
      company: "DataStream Solutions",
      location: "Austin, TX",
      requiredSkills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "Redis"],
    },
    {
      title: "Full Stack Developer",
      company: "StartupX",
      location: "New York, NY",
      requiredSkills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"],
    },
    {
      title: "Software Engineer",
      company: "MegaCorp Technologies",
      location: "Remote (Global)",
      requiredSkills: ["JavaScript", "Python", "Docker", "AWS", "GraphQL"],
    },
  ];

  const calculateMatches = (analysisResult: AnalysisResult | null): JobWithMatch[] => {
    if (!analysisResult || !analysisResult.skills?.length) {
      return baseJobs.map((job) => ({
        ...job,
        matchPercentage: 0,
        matchedSkills: [],
        missingSkills: job.requiredSkills,
      }));
    }

    const userSkillsSet = new Set(
      analysisResult.skills.map((s) => s.toLowerCase().trim())
    );

    return baseJobs
      .map((job) => {
        const matchedSkills = job.requiredSkills.filter((skill) =>
          userSkillsSet.has(skill.toLowerCase())
        );

        const missingSkills = job.requiredSkills.filter(
          (skill) => !userSkillsSet.has(skill.toLowerCase())
        );

        const matchPercentage =
          job.requiredSkills.length > 0
            ? Math.round((matchedSkills.length / job.requiredSkills.length) * 100)
            : 0;

        return {
          ...job,
          matchPercentage,
          matchedSkills,
          missingSkills,
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (stored) {
      try {
        const parsed: AnalysisResult = JSON.parse(stored);
        setAnalysis(parsed);
        setJobs(calculateMatches(parsed));
      } catch (e) {
        console.error("Failed to parse analysisResult from localStorage", e);
        setJobs(calculateMatches(null));
      }
    } else {
      setJobs(calculateMatches(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Your Job{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Matches
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {jobs.length > 0
              ? `Found ${jobs.length} opportunities ranked by your skill match`
              : "No jobs available yet"}
          </p>
        </motion.div>

        {analysis ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neon-cyan" />
              <h2 className="font-display text-xl font-bold">
                Based on your resume: {analysis.fileName}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="font-semibold flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> Suggested roles:
              </span>
              <span className="text-muted-foreground">
                {analysis.suggestedRoles?.length
                  ? analysis.suggestedRoles.join(", ")
                  : "No roles detected"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="font-semibold flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Key skills:
              </span>
              <span className="text-muted-foreground">
                {analysis.skills?.length
                  ? analysis.skills.join(", ")
                  : "No skills detected"}
              </span>
            </div>
          </motion.div>
        ) : (
          <p className="mb-8 text-sm text-muted-foreground">
            No resume analysis found. Go back to the upload page and analyze your
            resume first for better matches.
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (same as before) */}
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5 text-neon-cyan" />
                  Filters
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base">Location Type</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Remote Only</span>
                    <Switch
                      checked={remoteOnly}
                      onCheckedChange={setRemoteOnly}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Experience Level (Years)</Label>
                  <div className="pt-2">
                    <Slider
                      value={experience}
                      onValueChange={setExperience}
                      max={15}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-muted-foreground">0</span>
                      <span className="text-sm font-semibold text-neon-cyan">
                        {experience[0]}
                      </span>
                      <span className="text-sm text-muted-foreground">15+</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Country</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                  onClick={() => {
                    setRemoteOnly(false);
                    setExperience([3]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </motion.aside>

          {/* Job Cards Grid */}
          <div className="flex-1">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>

            <div className="grid gap-6">
              {jobs.map((job, idx) => (
                <JobCard
                  key={idx}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  requiredSkills={job.requiredSkills}
                  matchedSkills={job.matchedSkills}
                  missingSkills={job.missingSkills}
                  matchPercentage={job.matchPercentage}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
