import { motion } from "framer-motion";
import { Sparkles, Briefcase, Rocket, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import heroImage from "@/assets/hero-ai.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Turn Your Skills Into{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent animate-pulse-glow">
                  Global Opportunities
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Upload your resume → AI finds job matches you didn't even know existed.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/upload">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow-purple transition-all duration-300 text-lg px-8">
                    Upload Resume
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 text-lg px-8">
                  Explore Features
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-30 animate-pulse-glow" />
              <img 
                src={heroImage} 
                alt="AI analyzing resume and matching with jobs"
                className="relative rounded-3xl border border-border/50 shadow-2xl animate-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Powered by <span className="bg-gradient-accent bg-clip-text text-transparent">Advanced AI</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Your future job is just one upload away
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Sparkles}
              title="Skill Analyzer"
              description="AI extracts and analyzes your skills, experience, and potential from your resume with precision."
              delay={0.1}
            />
            <FeatureCard
              icon={Briefcase}
              title="Smart Job Matches"
              description="Get matched with global opportunities perfectly aligned with your unique skill set."
              delay={0.2}
            />
            <FeatureCard
              icon={Rocket}
              title="Skill Gap Fixer"
              description="Discover missing skills and get personalized learning roadmaps to land your dream job."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-neon-cyan">Job Seekers</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See how SkillMatch AI transformed careers worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Chen"
              role="Software Engineer at Google"
              content="Found my dream job in 2 weeks! The skill gap analysis was a game-changer."
              rating={5}
              delay={0.1}
            />
            <TestimonialCard
              name="Michael Rodriguez"
              role="Product Manager at Meta"
              content="I discovered opportunities I never knew existed. This platform is revolutionary."
              rating={5}
              delay={0.2}
            />
            <TestimonialCard
              name="Priya Sharma"
              role="Data Scientist at Amazon"
              content="The AI-powered matching is incredibly accurate. Got matched with my current role!"
              rating={5}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-neon-cyan" />
              <span className="font-display font-bold text-xl">SkillMatch AI</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              Made with <Heart className="w-4 h-4 text-neon-magenta fill-neon-magenta animate-glow" /> by Shaik
            </div>

            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
