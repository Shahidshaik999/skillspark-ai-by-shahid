import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload as UploadIcon,
  FileText,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { RoleKey } from "@/data/roleConfig";

// ---- API base URL ----
// If VITE_API_BASE_URL is set, use that.
// Otherwise default to Render backend URL.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://skillspark-ai-by-shahid.onrender.com";

// ---- types for backend response ----
interface AnalysisResponse {
  fileName?: string;
  skills?: string[];
  suggestedRoles?: string[];
  certifications?: string[];
  experienceYears?: number;
  experienceLevel?: string;
  summary?: string;
  interviewQuestions?: string[];
  error?: string;
}

// 👇 helper to map role text from backend to our internal keys
const mapRoleNameToKey = (name: string): RoleKey | null => {
  const lower = name.toLowerCase();
  if (lower.includes("full")) return "fullstack";
  if (lower.includes("ml")) return "ml-engineer";
  if (lower.includes("machine")) return "ml-engineer";
  if (lower.includes("data")) return "data-engineer";
  if (lower.includes("front")) return "frontend";
  if (lower.includes("back")) return "backend";
  if (lower.includes("devops")) return "devops";
  return null;
};

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [jobRoles, setJobRoles] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      void handleFileUpload(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleFileUpload(file);
    }
  };

  // 🔥 Backend call with timeout + proper error handling
  const handleFileUpload = async (file: File) => {
    setFileName(file.name);
    setIsAnalyzing(true);
    setIsAnalyzed(false);

    const formData = new FormData();
    formData.append("file", file);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(`${API_BASE_URL}/analyze-resume`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      let data: AnalysisResponse | null = null;

      try {
        data = (await res.json()) as AnalysisResponse;
      } catch (jsonError) {
        console.error("Failed to parse backend JSON:", jsonError);
        data = null;
      }

      const hasError = !!data?.error;

      if (!res.ok || hasError) {
        const description =
          data?.error ||
          (res.status >= 500
            ? "Server error while analyzing resume."
            : "Unable to analyze resume right now.");

        toast({
          title: "Upload failed",
          description,
          variant: "destructive",
        });
        return;
      }

      // ✅ success path
      setExtractedSkills(data?.skills ?? []);
      setJobRoles(data?.suggestedRoles ?? []);

      // store for Results / RoleAdvice pages
      localStorage.setItem("analysisResult", JSON.stringify(data));

      setIsAnalyzing(false);
      setIsAnalyzed(true);

      toast({
        title: "Resume analyzed successfully!",
        description: "Your skills and roles have been extracted.",
      });
    } catch (err: unknown) {
      console.error(err);
      let description = "Unable to analyze resume right now.";

      if (err instanceof DOMException && err.name === "AbortError") {
        description =
          "The server is taking too long to respond. Please try again in a few minutes.";
      }

      toast({
        title: "Something went wrong",
        description,
        variant: "destructive",
      });
    } finally {
      clearTimeout(timeoutId);
      setIsAnalyzing(false);
    }
  };

  const handleFindJobs = () => {
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Upload Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Resume
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Let AI analyze your skills and find perfect job matches
            </p>
          </div>

          {!isAnalyzed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  isDragging
                    ? "border-neon-cyan bg-neon-cyan/10 scale-105"
                    : "border-border/50 hover:border-neon-cyan/50"
                } ${isAnalyzing ? "animate-pulse-glow" : ""}`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileSelect}
                  disabled={isAnalyzing}
                />

                <label htmlFor="file-upload" className="cursor-pointer">
                  <motion.div
                    animate={isAnalyzing ? { rotate: 360 } : {}}
                    transition={{
                      duration: 2,
                      repeat: isAnalyzing ? Infinity : 0,
                      ease: "linear",
                    }}
                  >
                    {isAnalyzing ? (
                      <Sparkles className="w-20 h-20 mx-auto mb-4 text-neon-cyan animate-glow" />
                    ) : (
                      <UploadIcon className="w-20 h-20 mx-auto mb-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
                    )}
                  </motion.div>

                  <h3 className="font-display text-2xl font-bold mb-2">
                    {isAnalyzing
                      ? "Analyzing Your Resume..."
                      : "Drop your resume here"}
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    {isAnalyzing
                      ? "Extracting skills and experience"
                      : "or click to browse"}
                  </p>

                  {fileName && (
                    <div className="flex items-center justify-center gap-2 text-neon-cyan">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">{fileName}</span>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mt-4">
                    Supported formats: PDF, DOCX
                  </p>
                </label>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-center gap-2 text-neon-green">
                <CheckCircle className="w-6 h-6" />
                <span className="font-display text-xl font-bold">
                  Analysis Complete!
                </span>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-neon-cyan" />
                  Extracted Skills
                </h2>
                {extractedSkills.length === 0 ? (
                  <p className="text-muted-foreground">
                    No skills detected – try another resume or check backend.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {extractedSkills.map((skill, idx) => (
                      <motion.div
                        key={skill + idx}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50 text-base py-2 px-4">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h2 className="font-display text-2xl font-bold">
                  Possible Job Roles
                </h2>
                {jobRoles.length === 0 ? (
                  <p className="text-muted-foreground mt-2">
                    No roles suggested yet.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {jobRoles.map((role, idx) => {
                      const key = mapRoleNameToKey(role);
                      return (
                        <motion.div
                          key={role + idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-primary/10 border border-primary/30 rounded-lg p-4 hover:border-neon-cyan/50 transition-all cursor-pointer"
                          onClick={() => {
                            if (key) {
                              localStorage.setItem("selectedRoleKey", key);
                              navigate("/role-advice");
                            } else {
                              toast({
                                title: "Role not supported yet",
                                description:
                                  "We haven't configured a roadmap for this role yet.",
                              });
                            }
                          }}
                        >
                          <p className="font-semibold text-foreground">
                            {role}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Click to view roadmap & resources
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              <Button
                onClick={handleFindJobs}
                size="lg"
                className="w-full bg-gradient-primary hover:shadow-glow-purple transition-all duration-300 text-lg py-6"
              >
                Find My Jobs 🚀
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
