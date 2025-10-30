import React from "react";
import { AlarmClock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoBadgeProps {
  size?: "lg" | "md" | "sm";
  className?: string;
}

const sizeMap = {
  lg: { container: "w-28 h-28", icon: 56 },
  md: { container: "w-20 h-20", icon: 36 },
  sm: { container: "w-12 h-12", icon: 24 },
};

const LogoBadge: React.FC<LogoBadgeProps> = ({ size = "md", className }) => {
  const s = sizeMap[size];
  return (
    <div
      className={cn(
        s.container,
        "rounded-full bg-gradient-to-br from-accent to-secondary p-1 shadow-md mx-auto"
      )}
    >
      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
        <AlarmClock
          size={s.icon}
          className="text-accent drop-shadow-md"
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
};

export default LogoBadge;
