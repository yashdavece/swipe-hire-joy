import { useState, useRef } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Heart, FileText, MapPin, Calendar, Briefcase } from "lucide-react";
import { mockCandidates, Candidate } from "@/data/mockCandidates";
import { useToast } from "@/hooks/use-toast";

export function SwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const constraintsRef = useRef(null);
  const { toast } = useToast();

  const currentCandidate = mockCandidates[currentIndex];

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (isAnimating || currentIndex >= mockCandidates.length) return;

    setIsAnimating(true);
    
    await controls.start({
      x: direction === 'left' ? -1000 : 1000,
      opacity: 0,
      rotate: direction === 'left' ? -30 : 30,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    });

    // Handle the swipe action
    if (direction === 'right') {
      toast({
        title: "Candidate Shortlisted! 🎉",
        description: `${currentCandidate.name} has been added to your interview list.`,
      });
    } else {
      toast({
        title: "Candidate Rejected",
        description: `${currentCandidate.name} has been sent a rejection email.`,
        variant: "destructive",
      });
    }

    // Move to next candidate
    setCurrentIndex(prev => prev + 1);
    
    // Reset animation
    controls.set({ x: 0, opacity: 1, rotate: 0 });
    setIsAnimating(false);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 150;
    
    if (Math.abs(info.offset.x) > threshold) {
      handleSwipe(info.offset.x > 0 ? 'right' : 'left');
    } else {
      controls.start({ x: 0, rotate: 0 });
    }
  };

  if (currentIndex >= mockCandidates.length) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">All done! 🎉</h2>
          <p className="text-muted-foreground mb-6">
            You've reviewed all candidates for this position.
          </p>
          <Button 
            onClick={() => setCurrentIndex(0)}
            className="btn-primary"
          >
            Review Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Candidate Review</h2>
        <p className="text-muted-foreground">
          {currentIndex + 1} of {mockCandidates.length} candidates
        </p>
      </div>

      <div className="relative h-[600px] flex items-center justify-center" ref={constraintsRef}>
        {/* Next card (behind) */}
        {currentIndex + 1 < mockCandidates.length && (
          <div className="absolute inset-0 scale-95 opacity-50">
            <CandidateCard candidate={mockCandidates[currentIndex + 1]} />
          </div>
        )}

        {/* Current card */}
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.3}
          animate={controls}
          onDragEnd={handleDragEnd}
          whileDrag={{ 
            scale: 1.05,
            rotate: 0,
            transition: { duration: 0.2 }
          }}
          style={{
            x: 0,
            rotate: 0
          }}
        >
          <CandidateCard candidate={currentCandidate} />
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-8 mt-8">
        <Button
          onClick={() => handleSwipe('left')}
          disabled={isAnimating}
          variant="outline"
          size="lg"
          className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="w-8 h-8" />
        </Button>
        
        <Button
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          size="lg"
          className="w-16 h-16 rounded-full btn-primary"
        >
          <Heart className="w-8 h-8" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        <p>Swipe left to reject • Swipe right to interview</p>
      </div>
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Card className="swipe-card h-full p-8 flex flex-col">
      {/* Profile Section */}
      <div className="text-center mb-6">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={candidate.profileImage} alt={candidate.name} />
          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h3 className="text-2xl font-bold mb-1">{candidate.name}</h3>
        <p className="text-muted-foreground">{candidate.email}</p>
      </div>

      {/* Role & Experience */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <span className="font-medium">{candidate.role}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span>{candidate.experience} experience</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span>{candidate.location}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="rounded-full">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-3">
        <Button variant="outline" className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          View Resume
        </Button>
        <Button variant="outline" className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          View Cover Letter
        </Button>
      </div>
    </Card>
  );
}