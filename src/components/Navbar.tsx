import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const location = useLocation();
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles className="w-6 h-6 text-neon-cyan animate-glow" />
          <span className="font-display font-bold text-xl bg-gradient-primary bg-clip-text text-transparent group-hover:animate-pulse-glow transition-all">
            SkillMatch AI
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-foreground hover:text-neon-cyan transition-colors">
              Dashboard
            </Button>
          </Link>
          <Link to="/upload">
            <Button className="bg-gradient-primary hover:shadow-glow-purple transition-all duration-300">
              <Upload className="w-4 h-4 mr-2" />
              Upload Resume
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};
