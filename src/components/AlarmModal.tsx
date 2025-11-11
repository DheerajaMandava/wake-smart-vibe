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
  onComplete: () => void;
}

export const AlarmModal = ({ isOpen, time, task, onComplete }: AlarmModalProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Create a soothing alarm sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        // Create oscillator for the tone
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        // Soothing bell-like tone (A4 note at 440Hz)
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

        // Gentle pulsing effect
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        // Create a gentle pulsing pattern
        const pulseInterval = setInterval(() => {
          if (gainNode.gain && audioContext.state === 'running') {
            const now = audioContext.currentTime;
            gainNode.gain.cancelScheduledValues(now);
            gainNode.gain.setValueAtTime(gainNode.gain.value, now);
            gainNode.gain.linearRampToValueAtTime(0.5, now + 0.5);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 1);
          }
        }, 1000);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();

        oscillatorRef.current = oscillator;
        gainNodeRef.current = gainNode;

        // Store pulse interval for cleanup
        (oscillator as any).pulseInterval = pulseInterval;

        console.log("🔊 Alarm sound started");
      } catch (err) {
        console.error("Audio error:", err);
      }
    }

    return () => {
      // Stop audio when modal closes
      if (oscillatorRef.current) {
        try {
          clearInterval((oscillatorRef.current as any).pulseInterval);
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (err) {
          console.log("Audio stop error:", err);
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isOpen]);

  const handleComplete = () => {
    if (oscillatorRef.current) {
      try {
        clearInterval((oscillatorRef.current as any).pulseInterval);
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (err) {
        console.log("Audio stop error:", err);
      }
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
