import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Alarms from "./pages/Alarms";
import AddAlarm from "./pages/AddAlarm";
import ChooseTask from "./pages/ChooseTask";
import TicTacToe from "./pages/TicTacToe";
import Puzzle from "./pages/Puzzle";
import PhotoTask from "./pages/PhotoTask";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/alarms" element={<Alarms />} />
          <Route path="/add-alarm" element={<AddAlarm />} />
          <Route path="/choose-task" element={<ChooseTask />} />
          <Route path="/task/tictactoe" element={<TicTacToe />} />
          <Route path="/task/puzzle" element={<Puzzle />} />
          <Route path="/task/photo" element={<PhotoTask />} />
          <Route path="/task/activity" element={<Activity />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
