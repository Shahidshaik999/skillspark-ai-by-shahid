import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500" />
      
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-neon-cyan/50 transition-all duration-300">
        <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow-purple transition-all duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>
        
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
