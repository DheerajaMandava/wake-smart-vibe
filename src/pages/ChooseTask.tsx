import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface TaskOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

const tasks: TaskOption[] = [
  {
    id: "tictactoe",
    title: "Tic-Tac-Toe",
    description: "Win the game to stop the alarm",
    icon: "⭕",
    route: "/task/tictactoe",
  },
  {
    id: "puzzle",
    title: "Puzzles",
    description: "Tap the odd spots to stop the alarm",
    icon: "🧩",
    route: "/task/puzzle",
  },
  {
    id: "photo",
    title: "Photo Task",
    description: "Click a photo of things to stop the alarm",
    icon: "📷",
    route: "/task/photo",
  },
  {
    id: "activity",
    title: "Activity",
    description: "Walk 20 steps to stop the alarm",
    icon: "🚶",
    route: "/task/activity",
  },
];

const ChooseTask = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <img src={logo} alt="PuzzAlarm" className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-bold">Choose a Task</h1>
        </div>

        {/* Task Options */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => navigate(task.route)}
              className="w-full bg-secondary/50 hover:bg-secondary/70 rounded-2xl p-4 flex items-center gap-4 transition-colors"
            >
              <div className="text-4xl">{task.icon}</div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Save Button */}
        <Button
          onClick={() => navigate("/alarms")}
          className="w-full h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg"
        >
          Save
        </Button>

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

export default ChooseTask;
