import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto"
      >
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">Lovable</span>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/login')}
          className="btn-secondary"
        >
          Login
        </Button>
      </motion.header>

      {/* Hero Section */}
      <main className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Hire Smarter.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Swipe Faster.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Lovable helps you screen and schedule candidates{" "}
              <span className="text-primary font-semibold">5x faster</span> with a swipe.
            </motion.p>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                onClick={() => navigate('/dashboard')}
                className="btn-primary group"
              >
                Start Swiping
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
                className="btn-secondary"
              >
                Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="grid md:grid-cols-3 gap-8 mt-32 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Review candidates in seconds with intuitive swipe gestures"
              },
              {
                icon: Users,
                title: "Smart Scheduling",
                description: "Auto-schedule interviews with calendar integration"
              },
              {
                icon: Heart,
                title: "Better Matches",
                description: "AI-powered recommendations for perfect candidate fits"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="swipe-card p-8 text-center hover:shadow-2xl group"
              >
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-10 w-20 h-20 gradient-secondary rounded-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 left-10 w-32 h-32 gradient-primary rounded-full opacity-10"
        />
      </main>
    </div>
  );
};

export default Landing;