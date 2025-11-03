import { useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlarmModalProps {
  isOpen: boolean;
  time: string;
  task: string;
  onDismiss: () => void;
  onComplete: () => void;
}

export const AlarmModal = ({ isOpen, time, task, onDismiss, onComplete }: AlarmModalProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Create and play audio when modal opens
      audioRef.current = new Audio("/alarm-sound.mp3");
      audioRef.current.loop = true;
      audioRef.current.play().catch(err => console.log("Audio play error:", err));
    }

    return () => {
      // Stop audio when modal closes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isOpen]);

  const handleDismiss = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onDismiss();
  };

  const handleComplete = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onComplete();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
            <Bell className="w-8 h-8 text-primary" />
          </div>
          <AlertDialogTitle className="text-center text-2xl">
            Alarm: {time}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            Complete <span className="font-semibold">{task}</span> to dismiss the alarm!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={handleComplete} className="w-full" size="lg">
            Complete Task
          </Button>
          <Button onClick={handleDismiss} variant="outline" className="w-full">
            Dismiss
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
