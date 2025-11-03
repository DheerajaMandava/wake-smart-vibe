import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AlarmModal } from "@/components/AlarmModal";

export interface Alarm {
  id: string;
  time: string;
  days: string[];
  isActive: boolean;
  task: string;
  isOnce?: boolean;
}

interface AlarmContextType {
  alarms: Alarm[];
  addAlarm: (alarm: Omit<Alarm, "id">) => void;
  toggleAlarm: (id: string) => void;
  deleteAlarm: (id: string) => void;
  triggeredAlarm: Alarm | null;
  dismissAlarm: () => void;
  completeAlarmTask: () => void;
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
  
  const [triggeredAlarm, setTriggeredAlarm] = useState<Alarm | null>(null);

  // Check alarms every minute
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      
      const currentTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
      const currentDay = now.toLocaleDateString("en-US", { weekday: "short" });

      console.log("Checking alarms - Current time:", currentTime, "Current day:", currentDay);
      console.log("Active alarms:", alarms.filter(a => a.isActive));

      alarms.forEach((alarm) => {
        console.log(`Comparing alarm ${alarm.id}:`, {
          alarmTime: alarm.time,
          currentTime,
          timeMatch: alarm.time === currentTime,
          alarmDays: alarm.days,
          currentDay,
          dayMatch: alarm.days.includes(currentDay),
          isActive: alarm.isActive
        });

        const shouldTrigger = alarm.isOnce 
          ? alarm.isActive && alarm.time === currentTime
          : alarm.isActive && alarm.time === currentTime && alarm.days.includes(currentDay);

        if (shouldTrigger) {
          console.log("🔔 ALARM TRIGGERED!", alarm);
          setTriggeredAlarm(alarm);
          
          // Auto-disable one-time alarms after they ring
          if (alarm.isOnce) {
            toggleAlarm(alarm.id);
          }
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

  const dismissAlarm = () => {
    setTriggeredAlarm(null);
  };

  const completeAlarmTask = () => {
    if (triggeredAlarm) {
      const route = taskRoutes[triggeredAlarm.task] || "/task/puzzle";
      setTriggeredAlarm(null);
      window.location.href = route;
    }
  };

  return (
    <AlarmContext.Provider value={{ 
      alarms, 
      addAlarm, 
      toggleAlarm, 
      deleteAlarm,
      triggeredAlarm,
      dismissAlarm,
      completeAlarmTask
    }}>
      {children}
      <AlarmModal
        isOpen={!!triggeredAlarm}
        time={triggeredAlarm?.time || ""}
        task={triggeredAlarm?.task || ""}
        onDismiss={dismissAlarm}
        onComplete={completeAlarmTask}
      />
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
