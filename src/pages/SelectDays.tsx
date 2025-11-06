import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import LogoBadge from "@/components/LogoBadge";

const daysOfWeek = [
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
  { short: "Sun", full: "Sunday" },
];

const SelectDays = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const time = location.state?.time || "9:00 AM";
  const [repeatType, setRepeatType] = useState<"repeat" | "once">("repeat");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleContinue = () => {
    if (selectedDays.length === 0) {
      return;
    }
    const days = selectedDays;
    navigate("/choose-task", { state: { time, days, isOnce: repeatType === "once" } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 text-center space-y-4">
          <LogoBadge />
          <div>
            <h1 className="text-4xl font-light">{time}</h1>
            <p className="text-muted-foreground mt-2">Select Days</p>
          </div>
        </div>

        {/* Repeat Type Selection */}
        <div className="px-6 py-4">
          <RadioGroup value={repeatType} onValueChange={(value) => setRepeatType(value as "repeat" | "once")}>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value="repeat" id="repeat" />
                <Label htmlFor="repeat" className="text-lg font-medium cursor-pointer">Repeat</Label>
              </div>
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value="once" id="once" />
                <Label htmlFor="once" className="text-lg font-medium cursor-pointer">Once</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Days Selection */}
        <div className="flex-1 px-6 py-8">
          <div className="space-y-3">
            {daysOfWeek.map((day) => (
              <button
                key={day.short}
                onClick={() => toggleDay(day.short)}
                className={`w-full p-4 rounded-2xl font-semibold text-lg transition-all ${
                  selectedDays.includes(day.short)
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary/70"
                }`}
              >
                {day.full}
              </button>
            ))}
          </div>
          {repeatType === "once" && (
            <p className="text-muted-foreground text-sm mt-4">
              This alarm will ring once on the selected day(s).
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-14 h-14"
            onClick={() => navigate("/add-alarm")}
          >
            <X size={24} />
          </Button>
          <Button
            className="flex-1 h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            onClick={handleContinue}
            disabled={selectedDays.length === 0}
          >
            Choose Task
            <Check size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectDays;
