import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Puzzle = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState<boolean[]>([]);
  const [oddIndex, setOddIndex] = useState<number>(0);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    resetPuzzle();
  }, []);

  const resetPuzzle = () => {
    const newGrid = Array(16).fill(false);
    const randomIndex = Math.floor(Math.random() * 16);
    setOddIndex(randomIndex);
    setGrid(newGrid);
    setClicks(0);
  };

  const handleClick = (index: number) => {
    if (index === oddIndex) {
      toast({
        title: "🎉 Correct!",
        description: "Alarm stopped successfully!",
      });
      setTimeout(() => navigate("/alarms"), 1500);
    } else {
      setClicks(clicks + 1);
      toast({
        title: "Try again!",
        description: "That's not the odd one out",
        variant: "destructive",
      });
    }
  };

  const getColor = (index: number) => {
    if (index === oddIndex) {
      return "hsl(var(--primary))";
    }
    return "hsl(var(--accent))";
  };

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
          <h1 className="text-2xl font-bold">Find the Odd One</h1>
          <p className="text-muted-foreground">Tap the different colored square</p>
        </div>

        {/* Puzzle Grid */}
        <div className="bg-card rounded-3xl p-6 space-y-6">
          <div className="grid grid-cols-4 gap-3">
            {grid.map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className="aspect-square rounded-xl transition-all hover:scale-95 active:scale-90"
                style={{ backgroundColor: getColor(index) }}
              />
            ))}
          </div>

          <div className="text-center space-y-2">
            <Button
              onClick={resetPuzzle}
              variant="outline"
              className="w-full h-12 rounded-full"
            >
              Reset Puzzle
            </Button>
            <p className="text-sm text-muted-foreground">Attempts: {clicks}</p>
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

export default Puzzle;
