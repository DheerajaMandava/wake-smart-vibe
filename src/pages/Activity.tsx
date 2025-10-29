import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Activity = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(0);
  const targetSteps = 20;
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (steps >= targetSteps) {
      toast({
        title: "🎉 Goal reached!",
        description: "Alarm stopped successfully!",
      });
      setTimeout(() => navigate("/alarms"), 1500);
    }
  }, [steps, navigate]);

  useEffect(() => {
    // Listen for device motion events
    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (acceleration) {
        const totalAcceleration = Math.abs(acceleration.x || 0) + 
                                 Math.abs(acceleration.y || 0) + 
                                 Math.abs(acceleration.z || 0);
        
        if (totalAcceleration > 20 && !isShaking) {
          setIsShaking(true);
          setSteps(prev => Math.min(prev + 1, targetSteps));
          setTimeout(() => setIsShaking(false), 500);
        }
      }
    };

    // Request permission for iOS 13+
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        });
    } else {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [isShaking]);

  const handleManualStep = () => {
    if (steps < targetSteps) {
      setSteps(prev => prev + 1);
    }
  };

  const progress = (steps / targetSteps) * 100;

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center p-1 shadow-md mx-auto">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center p-1.5">
              <img src={logo} alt="PuzzAlarm" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Activity Challenge</h1>
          <p className="text-muted-foreground">Walk {targetSteps} steps to stop the alarm</p>
        </div>

        {/* Activity Card */}
        <div className="bg-card rounded-3xl p-6 space-y-8">
          {/* Step Counter */}
          <div className="text-center space-y-4">
            <div className="text-8xl">🚶</div>
            <div className="space-y-2">
              <h2 className="text-6xl font-bold">{steps}</h2>
              <p className="text-xl text-muted-foreground">/ {targetSteps} steps</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-4" />
            <p className="text-center text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </p>
          </div>

          {/* Manual Step Button (for testing) */}
          <div className="space-y-2">
            <Button
              onClick={handleManualStep}
              className="w-full h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              disabled={steps >= targetSteps}
            >
              Add Step (Manual)
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Shake your device or tap to count steps
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-around pt-4 border-t border-border">
          <button onClick={() => navigate(-1)} className="flex flex-col items-center gap-1 text-muted-foreground">
            <ArrowLeft size={24} />
            <span className="text-xs">Back</span>
          </button>
          <button onClick={() => navigate("/alarms")} className="flex flex-col items-center gap-1">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activity;
