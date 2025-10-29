import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "@/assets/logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/alarms");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-lg flex flex-col items-center space-y-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center p-1 shadow-lg">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center p-2">
            <img src={logo} alt="PuzzAlarm Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center">PUZZALARM</h1>
        <p className="text-center text-foreground/80 text-sm">
          Proof you can solve things before coffee
        </p>
      </div>
    </div>
  );
};

export default Welcome;
