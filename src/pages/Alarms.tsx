import { Plus, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AlarmCard from "@/components/AlarmCard";
import { Button } from "@/components/ui/button";
import { useAlarms } from "@/contexts/AlarmContext";
import logo from "@/assets/logo.png";

const Alarms = () => {
  const navigate = useNavigate();
  const { alarms, toggleAlarm, deleteAlarm } = useAlarms();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center p-1 shadow-md mx-auto">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center p-1.5">
              <img src={logo} alt="PuzzAlarm" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Alarms</h1>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Bell size={16} /> Sleep | Wake Up
          </p>
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
              onToggle={() => toggleAlarm(alarm.id)}
              onDelete={() => deleteAlarm(alarm.id)}
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
