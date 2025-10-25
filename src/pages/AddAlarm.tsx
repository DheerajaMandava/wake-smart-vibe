import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

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
          <img src={logo} alt="PuzzAlarm" className="w-16 h-16 mx-auto" />
        </div>

        {/* Time Picker */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-xs">
            <div className="flex justify-center items-center gap-4 text-6xl font-light">
              <div className="relative h-32 overflow-hidden">
                <div 
                  className="transition-transform duration-200"
                  style={{ transform: `translateY(-${(hour - 1) * 128}px)` }}
                >
                  {hours.map((h, idx) => (
                    <div
                      key={idx}
                      className={`h-32 flex items-center justify-center cursor-pointer ${
                        parseInt(h) === hour ? "text-foreground" : "text-muted-foreground"
                      }`}
                      onClick={() => setHour(parseInt(h))}
                    >
                      {h}
                    </div>
                  ))}
                </div>
              </div>
              <span>:</span>
              <div className="relative h-32 overflow-hidden">
                <div 
                  className="transition-transform duration-200"
                  style={{ transform: `translateY(-${minute * 128}px)` }}
                >
                  {minutes.map((m, idx) => (
                    <div
                      key={idx}
                      className={`h-32 flex items-center justify-center cursor-pointer ${
                        parseInt(m) === minute ? "text-foreground" : "text-muted-foreground"
                      }`}
                      onClick={() => setMinute(parseInt(m))}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* AM/PM Toggle */}
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant={period === "AM" ? "default" : "outline"}
                className="w-20 h-12 rounded-full font-semibold"
                onClick={() => setPeriod("AM")}
              >
                AM
              </Button>
              <Button
                variant={period === "PM" ? "default" : "outline"}
                className="w-20 h-12 rounded-full font-semibold"
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
            onClick={() => navigate("/choose-task")}
          >
            Choose time
            <Check size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAlarm;
