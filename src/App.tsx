import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

// Pages
import Splash from "./pages/Splash";
import Idle from "./pages/Idle";
import Adhan from "./pages/Adhan";
import Iqamah from "./pages/Iqamah";
import Player from "./pages/Player";
import Screensaver from "./pages/Screensaver";
import Pairing from "./pages/Pairing";
import NotFound from "./pages/NotFound";

// Setup Wizard
import SetupWelcome from "./pages/setup/SetupWelcome";
import SetupMode from "./pages/setup/SetupMode";
import SetupLocation from "./pages/setup/SetupLocation";
import SetupCalculation from "./pages/setup/SetupCalculation";
import SetupPairing from "./pages/setup/SetupPairing";
import SetupComplete from "./pages/setup/SetupComplete";

// Lazy load larger pages
import { lazy, Suspense } from "react";
const Quran = lazy(() => import("./pages/Quran"));
const Settings = lazy(() => import("./pages/Settings"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <span className="text-4xl text-primary animate-pulse">☪</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Main screens */}
              <Route path="/" element={<Splash />} />
              <Route path="/idle" element={<Idle />} />
              <Route path="/adhan" element={<Adhan />} />
              <Route path="/iqamah" element={<Iqamah />} />
              <Route path="/player" element={<Player />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/screensaver" element={<Screensaver />} />
              <Route path="/pairing" element={<Pairing />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Setup wizard */}
              <Route path="/setup" element={<SetupWelcome />} />
              <Route path="/setup/mode" element={<SetupMode />} />
              <Route path="/setup/location" element={<SetupLocation />} />
              <Route path="/setup/calculation" element={<SetupCalculation />} />
              <Route path="/setup/pairing" element={<SetupPairing />} />
              <Route path="/setup/complete" element={<SetupComplete />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
