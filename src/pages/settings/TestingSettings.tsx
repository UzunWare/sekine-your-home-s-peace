import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Circle, ChevronDown, ChevronUp, Play, RotateCcw } from 'lucide-react';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { Progress } from '@/components/ui/progress';

type TestStatus = 'untested' | 'passed' | 'failed';

interface TestItem {
  id: string;
  description: string;
  status: TestStatus;
}

interface TestCategory {
  id: string;
  name: string;
  tests: TestItem[];
  expanded: boolean;
}

const initialCategories: TestCategory[] = [
  {
    id: 'setup',
    name: 'Setup & Onboarding',
    expanded: true,
    tests: [
      { id: 'setup-1', description: 'Splash screen displays correctly', status: 'untested' },
      { id: 'setup-2', description: 'Setup wizard completes successfully', status: 'untested' },
      { id: 'setup-3', description: 'Location selection works', status: 'untested' },
      { id: 'setup-4', description: 'Calculation method saves correctly', status: 'untested' },
      { id: 'setup-5', description: 'Pairing code generates', status: 'untested' },
    ],
  },
  {
    id: 'prayer',
    name: 'Prayer Times',
    expanded: false,
    tests: [
      { id: 'prayer-1', description: 'All 6 prayer times display', status: 'untested' },
      { id: 'prayer-2', description: 'Current prayer is highlighted', status: 'untested' },
      { id: 'prayer-3', description: 'Countdown updates in real-time', status: 'untested' },
      { id: 'prayer-4', description: 'Hijri date displays correctly', status: 'untested' },
      { id: 'prayer-5', description: 'Times recalculate at midnight', status: 'untested' },
    ],
  },
  {
    id: 'adhan',
    name: 'Adhan Playback',
    expanded: false,
    tests: [
      { id: 'adhan-1', description: 'Adhan plays at scheduled time', status: 'untested' },
      { id: 'adhan-2', description: 'Manual Adhan button works', status: 'untested' },
      { id: 'adhan-3', description: 'Volume control works', status: 'untested' },
      { id: 'adhan-4', description: 'Mute button functions', status: 'untested' },
      { id: 'adhan-5', description: 'Skip button ends Adhan', status: 'untested' },
      { id: 'adhan-6', description: 'Fade in works correctly', status: 'untested' },
    ],
  },
  {
    id: 'quran',
    name: 'Quran Player',
    expanded: false,
    tests: [
      { id: 'quran-1', description: 'Surah list displays all 114', status: 'untested' },
      { id: 'quran-2', description: 'Reciter selection works', status: 'untested' },
      { id: 'quran-3', description: 'Audio plays correctly', status: 'untested' },
      { id: 'quran-4', description: 'Progress bar updates', status: 'untested' },
      { id: 'quran-5', description: 'Play/Pause works', status: 'untested' },
      { id: 'quran-6', description: 'Next/Previous track works', status: 'untested' },
      { id: 'quran-7', description: 'Minimize to floating bar works', status: 'untested' },
    ],
  },
  {
    id: 'settings',
    name: 'Settings',
    expanded: false,
    tests: [
      { id: 'settings-1', description: 'All settings categories accessible', status: 'untested' },
      { id: 'settings-2', description: 'Settings persist after restart', status: 'untested' },
      { id: 'settings-3', description: 'Clock format toggle works', status: 'untested' },
      { id: 'settings-4', description: 'Screensaver timeout works', status: 'untested' },
    ],
  },
  {
    id: 'offline',
    name: 'Offline Mode',
    expanded: false,
    tests: [
      { id: 'offline-1', description: 'Offline indicator appears', status: 'untested' },
      { id: 'offline-2', description: 'Prayer times work offline', status: 'untested' },
      { id: 'offline-3', description: 'Downloaded content plays offline', status: 'untested' },
      { id: 'offline-4', description: 'Bundled images display offline', status: 'untested' },
    ],
  },
  {
    id: 'remote',
    name: 'Remote Control',
    expanded: false,
    tests: [
      { id: 'remote-1', description: 'D-pad navigation works', status: 'untested' },
      { id: 'remote-2', description: 'Select/Enter activates elements', status: 'untested' },
      { id: 'remote-3', description: 'Back button navigates correctly', status: 'untested' },
      { id: 'remote-4', description: 'Focus indicators are visible', status: 'untested' },
    ],
  },
];

const STORAGE_KEY = 'sekine-tv-qa-tests';

export default function TestingSettings() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<TestCategory[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const toggleCategory = (categoryId: string) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    ));
  };

  const cycleTestStatus = (categoryId: string, testId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        tests: cat.tests.map(test => {
          if (test.id !== testId) return test;
          const nextStatus: TestStatus =
            test.status === 'untested' ? 'passed' :
            test.status === 'passed' ? 'failed' : 'untested';
          return { ...test, status: nextStatus };
        }),
      };
    }));
  };

  const getTotalTests = () => categories.reduce((acc, cat) => acc + cat.tests.length, 0);
  const getPassedTests = () => categories.reduce((acc, cat) =>
    acc + cat.tests.filter(t => t.status === 'passed').length, 0);
  const getFailedTests = () => categories.reduce((acc, cat) =>
    acc + cat.tests.filter(t => t.status === 'failed').length, 0);

  const getCategoryProgress = (category: TestCategory) => {
    const passed = category.tests.filter(t => t.status === 'passed').length;
    return (passed / category.tests.length) * 100;
  };

  const StatusIcon = ({ status }: { status: TestStatus }) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />;
      default:
        return <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
          <button
            data-focusable="true"
            autoFocus
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">QA Testing</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4 sm:space-y-6">
          {/* Overall Progress */}
          <div className="glass-card p-4 sm:p-5 lg:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Overall Progress</h3>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                {getPassedTests()}/{getTotalTests()}
              </span>
            </div>
            <Progress value={(getPassedTests() / getTotalTests()) * 100} className="h-2 sm:h-3" />
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 text-xs sm:text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {getPassedTests()} Passed
              </span>
              <span className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" />
                {getFailedTests()} Failed
              </span>
              <span className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-muted-foreground" />
                {getTotalTests() - getPassedTests() - getFailedTests()} Untested
              </span>
            </div>
          </div>

          {/* Quick Action */}
          <button
            data-focusable="true"
            onClick={() => navigate('/adhan')}
            className="w-full glass-card p-4 sm:p-5 bg-primary/10 border-primary/30 flex items-center justify-center gap-3 hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="text-base sm:text-lg font-medium">Test Adhan Now</span>
          </button>

          {/* Test Categories */}
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="glass-card overflow-hidden"
              >
                {/* Category Header */}
                <button
                  data-focusable="true"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-base sm:text-lg font-medium">{category.name}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {category.tests.filter(t => t.status === 'passed').length}/{category.tests.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Progress
                      value={getCategoryProgress(category)}
                      className="w-16 sm:w-20 h-2"
                    />
                    {category.expanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Tests List */}
                {category.expanded && (
                  <div className="border-t border-border/30">
                    {category.tests.map((test) => (
                      <button
                        key={test.id}
                        data-focusable="true"
                        onClick={() => cycleTestStatus(category.id, test.id)}
                        className="w-full p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-card/30 transition-colors border-b border-border/20 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset text-left"
                      >
                        <StatusIcon status={test.status} />
                        <span className={`text-sm sm:text-base ${test.status === 'passed' ? 'text-green-500' : test.status === 'failed' ? 'text-destructive' : ''}`}>
                          {test.description}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reset Button */}
          <button
            data-focusable="true"
            onClick={() => setCategories(initialCategories)}
            className="w-full glass-card p-4 sm:p-5 flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-base sm:text-lg">Reset All Tests</span>
          </button>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓ to navigate • SELECT to toggle status • BACK to return
          </p>
        </div>
      </footer>
    </div>
  );
}
