import { motion } from "framer-motion";
import { FileText, TrendingUp, Bookmark, Target } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = [
    { label: "Resumes Uploaded", value: "3", icon: FileText, color: "text-neon-cyan" },
    { label: "Job Matches", value: "24", icon: TrendingUp, color: "text-neon-green" },
    { label: "Bookmarked Jobs", value: "8", icon: Bookmark, color: "text-neon-magenta" },
    { label: "Career Score", value: "85", icon: Target, color: "text-neon-purple" },
  ];

  const uploadHistory = [
    { name: "Resume_2024_v3.pdf", date: "2 days ago", status: "Analyzed" },
    { name: "Resume_Senior_Dev.pdf", date: "1 week ago", status: "Analyzed" },
    { name: "Resume_Updated.docx", date: "2 weeks ago", status: "Analyzed" },
  ];

  const skillProgress = [
    { skill: "React", level: 90 },
    { skill: "TypeScript", level: 85 },
    { skill: "Node.js", level: 80 },
    { skill: "AWS", level: 70 },
    { skill: "Docker", level: 65 },
  ];

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
            Your <span className="bg-gradient-primary bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your career progress and job search journey
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-neon-cyan/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className={`font-display text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload History */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <FileText className="w-5 h-5 text-neon-cyan" />
                  Upload History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadHistory.map((upload, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-neon-cyan/50 transition-all"
                    >
                      <div>
                        <p className="font-medium text-foreground">{upload.name}</p>
                        <p className="text-sm text-muted-foreground">{upload.date}</p>
                      </div>
                      <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                        {upload.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skill Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Target className="w-5 h-5 text-neon-purple" />
                  Skill Progress Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillProgress.map((item, idx) => (
                    <motion.div
                      key={item.skill}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{item.skill}</span>
                        <span className="text-sm font-bold text-neon-cyan">{item.level}%</span>
                      </div>
                      <Progress value={item.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Career Score Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Target className="w-6 h-6 text-neon-purple" />
                Career Score Meter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-8">
                <div className="relative w-48 h-48 mb-6">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                      fill="none"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="hsl(var(--neon-purple))"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 502.4" }}
                      animate={{ strokeDasharray: "427 502.4" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      style={{ filter: "drop-shadow(0 0 10px hsl(var(--neon-purple)))" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-neon-purple">85</span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground text-center max-w-md">
                  Your career score is excellent! Keep improving your skills to unlock even more opportunities.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
