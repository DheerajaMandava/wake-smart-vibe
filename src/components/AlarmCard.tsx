import { Bell, Trash2, Gamepad2, Puzzle, Camera, Activity } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AlarmCardProps {
  time: string;
  days: string[];
  isActive: boolean;
  task: string;
  onToggle: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const taskIcons: Record<string, React.ReactNode> = {
  "Tic-Tac-Toe": <Gamepad2 size={16} />,
  "Puzzles": <Puzzle size={16} />,
  "Photo Task": <Camera size={16} />,
  "Activity": <Activity size={16} />,
};

const AlarmCard = ({ time, days, isActive, task, onToggle, onDelete, onClick }: AlarmCardProps) => {
  return (
    <div className="bg-secondary/50 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex-1 cursor-pointer" onClick={onClick}>
        <div className="text-2xl font-bold">{time}</div>
        <div className="text-sm text-muted-foreground flex gap-1 mt-1 flex-wrap">
          {days.map((day, idx) => (
            <span key={idx} className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center text-xs">
              {day}
            </span>
          ))}
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
          {taskIcons[task] || <Bell size={16} />}
          <span>{task}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={isActive} onCheckedChange={onToggle} />
        <button onClick={onDelete} className="text-destructive p-2">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default AlarmCard;
