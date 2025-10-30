import React from "react";
import { cn } from "@/lib/utils";
import puzzleClockIcon from "@/assets/puzzle-clock-icon.png";

interface LogoBadgeProps {
  size?: "lg" | "md" | "sm";
  className?: string;
}

const sizeMap = {
  lg: { container: "w-28 h-28", image: "w-16 h-16" },
  md: { container: "w-20 h-20", image: "w-12 h-12" },
  sm: { container: "w-12 h-12", image: "w-7 h-7" },
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
          src={puzzleClockIcon} 
          alt="Puzzle Clock" 
          className={cn(s.image, "object-contain")}
        />
      </div>
    </div>
  );
};

export default LogoBadge;
