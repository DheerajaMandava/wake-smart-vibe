import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoBadge from "@/components/LogoBadge";
import ScrollPicker from "@/components/ScrollPicker";

const AddAlarm = () => {
  const navigate = useNavigate();
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(50);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 text-center space-y-4">
          <LogoBadge />
        </div>

        {/* Time Picker */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="relative w-full max-w-md">
            <div className="flex justify-center items-center gap-2">
              <ScrollPicker
                value={hour}
                onChange={setHour}
                items={hours}
                className="w-24"
              />
              <span className="text-4xl font-light text-muted-foreground">:</span>
              <ScrollPicker
                value={minute}
                onChange={setMinute}
                items={minutes}
                className="w-24"
              />
            </div>
            
            {/* AM/PM Toggle */}
            <div className="flex justify-center gap-3 mt-8">
              <Button
                variant={period === "AM" ? "default" : "outline"}
                className="w-24 h-14 rounded-full font-semibold text-lg"
                onClick={() => setPeriod("AM")}
              >
                AM
              </Button>
              <Button
                variant={period === "PM" ? "default" : "outline"}
                className="w-24 h-14 rounded-full font-semibold text-lg"
                onClick={() => setPeriod("PM")}
              >
                PM
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-14 h-14"
            onClick={() => navigate("/alarms")}
          >
            <X size={24} />
          </Button>
          <Button
            className="flex-1 h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            onClick={() => {
              const paddedHour = String(hour).padStart(2, "0");
              const paddedMinute = String(minute).padStart(2, "0");
              const timeString = `${paddedHour}:${paddedMinute} ${period}`;
              navigate("/select-days", { state: { time: timeString } });
            }}
          >
            Select Days
            <Check size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAlarm;
