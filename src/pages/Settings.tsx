import BottomNav from "@/components/BottomNav";
import logo from "@/assets/logo.png";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <img src={logo} alt="PuzzAlarm" className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="bg-card rounded-2xl p-6">
          <p className="text-muted-foreground text-center">Settings coming soon...</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
