import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface Alarm {
  id: string;
  time: string;
  days: string[];
  isActive: boolean;
  task: string;
}

interface AlarmContextType {
  alarms: Alarm[];
  addAlarm: (alarm: Omit<Alarm, "id">) => void;
  toggleAlarm: (id: string) => void;
  deleteAlarm: (id: string) => void;
}

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

const taskRoutes: Record<string, string> = {
  "Tic-Tac-Toe": "/task/tictactoe",
  "Puzzles": "/task/puzzle",
  "Photo Task": "/task/photo",
  "Activity": "/task/activity",
};

export const AlarmProvider = ({ children }: { children: ReactNode }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: "1",
      time: "6:30 AM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      isActive: true,
      task: "Tic-Tac-Toe",
    },
  ]);

  // Check alarms every minute
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const currentDay = now.toLocaleDateString("en-US", { weekday: "short" });

      alarms.forEach((alarm) => {
        if (
          alarm.isActive &&
          alarm.time === currentTime &&
          alarm.days.includes(currentDay)
        ) {
          const route = taskRoutes[alarm.task] || "/task/puzzle";
          toast.info(`Alarm: ${alarm.time} - Complete ${alarm.task} to dismiss!`);
          window.location.href = route;
        }
      });
    };

    const interval = setInterval(checkAlarms, 30000); // Check every 30 seconds
    checkAlarms(); // Check immediately

    return () => clearInterval(interval);
  }, [alarms]);

  const addAlarm = (alarm: Omit<Alarm, "id">) => {
    const newAlarm: Alarm = {
      ...alarm,
      id: Date.now().toString(),
    };
    setAlarms([...alarms, newAlarm]);
  };

  const toggleAlarm = (id: string) => {
    setAlarms(
      alarms.map((alarm) =>
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    );
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  return (
    <AlarmContext.Provider value={{ alarms, addAlarm, toggleAlarm, deleteAlarm }}>
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarms = () => {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error("useAlarms must be used within AlarmProvider");
  }
  return context;
};
