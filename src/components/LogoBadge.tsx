import React from "react";
import { cn } from "@/lib/utils";
import puzzleClockLogo from "@/assets/puzzle-clock-logo.png";

interface LogoBadgeProps {
  size?: "lg" | "md" | "sm";
  className?: string;
}

const sizeMap = {
  lg: { container: "w-28 h-28", image: "w-20 h-20" },
  md: { container: "w-20 h-20", image: "w-14 h-14" },
  sm: { container: "w-12 h-12", image: "w-8 h-8" },
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
        <img 
          src={puzzleClockLogo} 
          alt="PuzzAlarm Logo" 
          className={cn(s.image, "object-contain")}
        />
      </div>
    </div>
  );
};

export default LogoBadge;
