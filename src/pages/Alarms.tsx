import { useState } from "react";
import { Plus, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AlarmCard from "@/components/AlarmCard";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface Alarm {
  id: string;
  time: string;
  days: string[];
  isActive: boolean;
  task: string;
}

const Alarms = () => {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: "1", time: "7:00 AM", days: ["M", "T", "W", "T", "F"], isActive: true, task: "puzzle" },
    { id: "2", time: "10:30 AM", days: ["M", "T", "W", "T", "F"], isActive: false, task: "tictactoe" },
    { id: "3", time: "8:00 AM", days: ["M", "T", "F"], isActive: true, task: "photo" },
  ]);

  const handleToggle = (id: string) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
    ));
  };

  const handleDelete = (id: string) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <img src={logo} alt="PuzzAlarm" className="w-20 h-20 mx-auto" />
          <h1 className="text-3xl font-bold">Alarms</h1>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Bell size={16} /> Sleep | Wake Up
          </p>
        </div>

        {/* Clock Display */}
        <div className="bg-card rounded-full w-48 h-48 mx-auto flex items-center justify-center border-4 border-border relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-16 bg-foreground origin-bottom absolute" style={{ transform: "rotate(90deg)" }} />
            <div className="w-1 h-12 bg-foreground/60 origin-bottom absolute" style={{ transform: "rotate(180deg)" }} />
            <div className="w-3 h-3 rounded-full bg-foreground absolute" />
          </div>
        </div>

        {/* Add Alarm Button */}
        <Button
          onClick={() => navigate("/add-alarm")}
          className="w-full h-12 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          <Plus size={20} className="mr-2" />
          Alarm
        </Button>

        {/* Alarms List */}
        <div className="space-y-3">
          {alarms.map(alarm => (
            <AlarmCard
              key={alarm.id}
              time={alarm.time}
              days={alarm.days}
              isActive={alarm.isActive}
              onToggle={() => handleToggle(alarm.id)}
              onDelete={() => handleDelete(alarm.id)}
              onClick={() => navigate("/add-alarm")}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Alarms;
