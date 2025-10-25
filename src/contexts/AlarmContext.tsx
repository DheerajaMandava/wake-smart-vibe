import { createContext, useContext, useState, ReactNode } from "react";

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
