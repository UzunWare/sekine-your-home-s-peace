import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { I18nProvider } from "@/lib/i18n";
import sekineLogo from "@/assets/sekine-logo.png";

// Pages
import Splash from "./pages/Splash";
import Idle from "./pages/Idle";
import Adhan from "./pages/Adhan";
import Iqamah from "./pages/Iqamah";
import Player from "./pages/Player";
import Screensaver from "./pages/Screensaver";
import Pairing from "./pages/Pairing";
// Invocations is now part of the unified Player component
import NotFound from "./pages/NotFound";

// Setup Wizard
import SetupWelcome from "./pages/setup/SetupWelcome";
import SetupMode from "./pages/setup/SetupMode";
import SetupLocation from "./pages/setup/SetupLocation";
import SetupCalculation from "./pages/setup/SetupCalculation";
import SetupPairing from "./pages/setup/SetupPairing";
import SetupComplete from "./pages/setup/SetupComplete";

// Lazy load larger pages
const Quran = lazy(() => import("./pages/Quran"));
const Settings = lazy(() => import("./pages/Settings"));
const QuranSettings = lazy(() => import("./pages/settings/QuranSettings"));
const AdhanSettings = lazy(() => import("./pages/settings/AdhanSettings"));
const DownloadsSettings = lazy(() => import("./pages/settings/DownloadsSettings"));
const TestingSettings = lazy(() => import("./pages/settings/TestingSettings"));
const IqamahSettings = lazy(() => import("./pages/settings/IqamahSettings"));
const LocationSettings = lazy(() => import("./pages/settings/LocationSettings"));
const CalculationSettings = lazy(() => import("./pages/settings/CalculationSettings"));
const DisplaySettings = lazy(() => import("./pages/settings/DisplaySettings"));
const NightModeSettings = lazy(() => import("./pages/settings/NightModeSettings"));
const LanguageSettings = lazy(() => import("./pages/settings/LanguageSettings"));
const ModeSettings = lazy(() => import("./pages/settings/ModeSettings"));
const AsrSettings = lazy(() => import("./pages/settings/AsrSettings"));
const LayoutSettings = lazy(() => import("./pages/settings/LayoutSettings"));

// Dashboard pages
const DashboardLogin = lazy(() => import("./pages/dashboard/DashboardLogin"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const DashboardDevices = lazy(() => import("./pages/dashboard/DashboardDevices"));
const DashboardDeviceSettings = lazy(() => import("./pages/dashboard/DashboardDeviceSettings"));
const DashboardPair = lazy(() => import("./pages/dashboard/DashboardPair"));
const DashboardSettings = lazy(() => import("./pages/dashboard/DashboardSettings"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <img src={sekineLogo} alt="Sekine" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 animate-pulse" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
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
                {/* Invocations now handled by /player?type=invocations */}
                <Route path="/pairing" element={<Pairing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/quran" element={<QuranSettings />} />
                <Route path="/settings/adhan" element={<AdhanSettings />} />
                <Route path="/settings/downloads" element={<DownloadsSettings />} />
                <Route path="/settings/testing" element={<TestingSettings />} />
                <Route path="/settings/iqamah" element={<IqamahSettings />} />
                <Route path="/settings/location" element={<LocationSettings />} />
                <Route path="/settings/calculation" element={<CalculationSettings />} />
                <Route path="/settings/display" element={<DisplaySettings />} />
                <Route path="/settings/night" element={<NightModeSettings />} />
                <Route path="/settings/language" element={<LanguageSettings />} />
                <Route path="/settings/mode" element={<ModeSettings />} />
                <Route path="/settings/asr" element={<AsrSettings />} />
                <Route path="/settings/layout" element={<LayoutSettings />} />
                
                {/* Setup wizard */}
                <Route path="/setup" element={<SetupWelcome />} />
                <Route path="/setup/mode" element={<SetupMode />} />
                <Route path="/setup/location" element={<SetupLocation />} />
                <Route path="/setup/calculation" element={<SetupCalculation />} />
                <Route path="/setup/pairing" element={<SetupPairing />} />
                <Route path="/setup/complete" element={<SetupComplete />} />
                
                {/* Web Dashboard */}
                <Route path="/dashboard/login" element={<DashboardLogin />} />
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/dashboard/devices" element={<DashboardDevices />} />
                <Route path="/dashboard/devices/:deviceId" element={<DashboardDeviceSettings />} />
                <Route path="/dashboard/pair" element={<DashboardPair />} />
                <Route path="/dashboard/settings" element={<DashboardSettings />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
