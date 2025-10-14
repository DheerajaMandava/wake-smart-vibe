import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const PhotoTask = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tasks = [
    "Take a photo of something blue",
    "Take a photo of a cup",
    "Take a photo of your favorite item",
    "Take a photo of something outside",
  ];

  const currentTask = tasks[Math.floor(Math.random() * tasks.length)];

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
        setTaskCompleted(true);
        toast({
          title: "Photo captured!",
          description: "Task completed successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    if (taskCompleted) {
      toast({
        title: "🎉 Alarm stopped!",
        description: "Photo task completed",
      });
      setTimeout(() => navigate("/alarms"), 1500);
    } else {
      toast({
        title: "Take a photo first",
        description: "Complete the task to stop the alarm",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <img src={logo} alt="PuzzAlarm" className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-bold">Photo Task</h1>
        </div>

        {/* Task Card */}
        <div className="bg-card rounded-3xl p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">📷</div>
            <h2 className="text-xl font-semibold">{currentTask}</h2>
          </div>

          {/* Photo Preview */}
          {photo ? (
            <div className="relative rounded-2xl overflow-hidden bg-secondary/50">
              <img src={photo} alt="Captured" className="w-full h-64 object-cover" />
              <div className="absolute top-2 right-2 bg-green-500 rounded-full p-2">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
          ) : (
            <div className="bg-secondary/50 rounded-2xl h-64 flex items-center justify-center">
              <Camera className="w-16 h-16 text-muted-foreground" />
            </div>
          )}

          {/* Capture Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoCapture}
            className="hidden"
          />
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            <Camera className="mr-2" />
            {photo ? "Retake Photo" : "Take Photo"}
          </Button>

          {/* Complete Button */}
          <Button
            onClick={handleComplete}
            disabled={!taskCompleted}
            className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Stop Alarm
          </Button>
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

export default PhotoTask;
