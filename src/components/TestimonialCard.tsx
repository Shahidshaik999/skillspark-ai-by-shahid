import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  delay?: number;
}

export const TestimonialCard = ({ name, role, content, rating, delay = 0 }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6"
    >
      <div className="flex gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + (i * 0.1) }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 fill-neon-cyan text-neon-cyan" />
          </motion.div>
        ))}
      </div>
      
      <p className="text-muted-foreground mb-4 italic">"{content}"</p>
      
      <div>
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </motion.div>
  );
};
