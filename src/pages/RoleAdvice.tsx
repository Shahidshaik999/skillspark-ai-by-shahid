import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ROLE_CONFIG, RoleConfig, RoleKey } from "@/data/roleConfig";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AnalysisResult = {
  fileName: string;
  skills: string[];
  suggestedRoles: string[];
  certifications?: string[];
  experienceYears?: number;
  experienceLevel?: string;
  summary?: string;
  interviewQuestions?: string[];
};

const RoleAdvice = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [roleConfig, setRoleConfig] = useState<RoleConfig | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("analysisResult");
    const storedRoleKey = localStorage.getItem("selectedRoleKey") as RoleKey | null;

    if (!storedAnalysis || !storedRoleKey) return;

    try {
      const parsed: AnalysisResult = JSON.parse(storedAnalysis);
      setAnalysis(parsed);
      setRoleConfig(ROLE_CONFIG[storedRoleKey]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!analysis || !roleConfig) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32">
          <p className="text-muted-foreground">
            Missing data. Please upload your resume again and select a role.
          </p>
          <Button className="mt-4" onClick={() => navigate("/upload")}>
            Go to Upload
          </Button>
        </div>
      </div>
    );
  }

  const userSkills = new Set(
    (analysis.skills || []).map((s) => s.toLowerCase().trim())
  );

  const strongSkills = roleConfig.coreSkills.filter((s) =>
    userSkills.has(s.toLowerCase())
  );
  const missingCore = roleConfig.coreSkills.filter(
    (s) => !userSkills.has(s.toLowerCase())
  );
  const alreadyNice = roleConfig.niceToHaveSkills.filter((s) =>
    userSkills.has(s.toLowerCase())
  );
  const missingNice = roleConfig.niceToHaveSkills.filter(
    (s) => !userSkills.has(s.toLowerCase())
  );

  const certifications = analysis.certifications || [];
  const experienceLevel = analysis.experienceLevel || "Unknown";
  const experienceYears =
    typeof analysis.experienceYears === "number" ? analysis.experienceYears : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20 max-w-5xl">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-neon-cyan" />
            Roadmap for {roleConfig.displayName}
          </h1>
          <p className="text-muted-foreground mt-2">
            Based on your resume:{" "}
            <span className="font-semibold">{analysis.fileName}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Experience level:{" "}
            <span className="font-semibold text-foreground">
              {experienceLevel}
              {experienceYears !== undefined && experienceYears > 0
                ? ` (~${experienceYears} years)`
                : ""}
            </span>
          </p>
        </motion.div>

        {/* AI Summary */}
        {analysis.summary && (
          <section className="mb-8 bg-card/50 border border-border/50 rounded-xl p-6 space-y-3">
            <h2 className="font-display text-xl font-semibold">Profile summary</h2>
            <p className="text-sm text-muted-foreground">{analysis.summary}</p>
          </section>
        )}

        {/* Certifications */}
        <section className="mb-8 bg-card/50 border border-border/50 rounded-xl p-6 space-y-3">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <Award className="w-5 h-5 text-neon-cyan" />
            Certifications & courses detected
          </h2>
          {certifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              We didn't detect specific certifications. For {roleConfig.displayName},{" "}
              consider adding at least 1–2 strong courses or certificates from the
              resources below.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <Badge
                  key={c}
                  className="bg-purple-500/15 text-purple-300 border-purple-500/40"
                >
                  {c}
                </Badge>
              ))}
            </div>
          )}
        </section>

        {/* Strengths */}
        <section className="mb-8 bg-card/50 border border-border/50 rounded-xl p-6 space-y-3">
          <h2 className="font-display text-xl font-semibold">What you already have</h2>
          <p className="text-sm text-muted-foreground">
            These skills from your resume are strong for a {roleConfig.displayName}:
          </p>
          <div className="flex flex-wrap gap-2">
            {strongSkills.length === 0 ? (
              <span className="text-sm text-muted-foreground">
                No strong core skills detected yet — don’t worry, you can build them.
              </span>
            ) : (
              strongSkills.map((s) => (
                <Badge
                  key={s}
                  className="bg-neon-cyan/15 text-neon-cyan border-neon-cyan/40"
                >
                  {s}
                </Badge>
              ))
            )}
          </div>

          {alreadyNice.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Bonus skills you already have:{" "}
              <span className="text-foreground font-medium">
                {alreadyNice.join(", ")}
              </span>
            </p>
          )}
        </section>

        {/* Gaps */}
        <section className="mb-8 bg-card/50 border border-border/50 rounded-xl p-6 space-y-3">
          <h2 className="font-display text-xl font-semibold">Skill gaps to focus on</h2>
          <p className="text-sm text-muted-foreground">
            Build these next to become strong for {roleConfig.displayName}:
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {missingCore.length === 0 ? (
              <span className="text-sm text-neon-green">
                You cover most of the core skills. Focus on depth & projects now.
              </span>
            ) : (
              missingCore.map((s) => (
                <Badge
                  key={s}
                  className="bg-red-500/10 text-red-400 border-red-500/40"
                >
                  {s}
                </Badge>
              ))
            )}
          </div>

          {missingNice.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Nice-to-have extras to stand out:{" "}
              <span className="text-foreground font-medium">
                {missingNice.join(", ")}
              </span>
            </p>
          )}
        </section>

        {/* Resources + Interview */}
        <section className="mb-8 grid md:grid-cols-2 gap-6">
          <div className="bg-card/50 border border-border/50 rounded-xl p-6 space-y-3">
            <h3 className="font-display text-lg font-semibold">Study resources</h3>
            <p className="text-sm text-muted-foreground mb-1">YouTube channels:</p>
            <ul className="text-sm space-y-1">
              {roleConfig.resources.youtube.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neon-cyan hover:underline"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground mt-3 mb-1">Courses / certs:</p>
            <ul className="text-sm space-y-1">
              {roleConfig.resources.courses.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neon-cyan hover:underline"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card/50 border border-border/50 rounded-xl p-6 space-y-3">
            <h3 className="font-display text-lg font-semibold">
              Interview & projects
            </h3>

            {/* AI interview questions from backend */}
            {analysis.interviewQuestions && analysis.interviewQuestions.length > 0 && (
              <>
                <p className="text-sm text-muted-foreground mb-1">
                  Practice these questions first:
                </p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  {analysis.interviewQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </>
            )}

            <p className="text-sm text-muted-foreground mt-3 mb-1">
              Additional interview resources:
            </p>
            <ul className="text-sm space-y-1">
              {roleConfig.resources.interview.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neon-cyan hover:underline"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground mt-3 mb-1">
              Good projects to add:
            </p>
            <ul className="text-sm list-disc list-inside space-y-1">
              {roleConfig.resources.projects.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Job links */}
        <section className="bg-card/50 border border-border/50 rounded-xl p-6 space-y-3">
          <h3 className="font-display text-lg font-semibold">
            Start applying for {roleConfig.displayName}
          </h3>
          <p className="text-sm text-muted-foreground">
            Use these links to find real roles on job platforms:
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            {roleConfig.jobLinks.map((j) => (
              <Button
                key={j.url}
                asChild
                size="sm"
                variant="outline"
                className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
              >
                <a href={j.url} target="_blank" rel="noreferrer">
                  {j.label}
                </a>
              </Button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoleAdvice;
