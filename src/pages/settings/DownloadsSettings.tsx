import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Trash2, HardDrive, Music, X } from 'lucide-react';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DownloadedItem {
  id: string;
  name: string;
  reciter: string;
  size: string;
  sizeBytes: number;
}

interface ActiveDownload {
  id: string;
  name: string;
  progress: number;
}

// Mock data for demonstration
const mockDownloads: DownloadedItem[] = [
  { id: '1', name: 'Al-Fatiha', reciter: 'Mishary Alafasy', size: '2.4 MB', sizeBytes: 2400000 },
  { id: '2', name: 'Al-Baqarah', reciter: 'Mishary Alafasy', size: '45.2 MB', sizeBytes: 45200000 },
  { id: '36', name: 'Ya-Sin', reciter: 'Abdul Basit', size: '12.8 MB', sizeBytes: 12800000 },
];

const mockActiveDownloads: ActiveDownload[] = [
  { id: '67', name: 'Al-Mulk', progress: 65 },
];

export default function DownloadsSettings() {
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState<DownloadedItem[]>(mockDownloads);
  const [activeDownloads, setActiveDownloads] = useState<ActiveDownload[]>(mockActiveDownloads);
  const [deleteItem, setDeleteItem] = useState<DownloadedItem | null>(null);

  useTVNavigation({
    onBack: () => {
      if (deleteItem) {
        setDeleteItem(null);
      } else {
        navigate('/settings');
      }
    },
  });

  const totalSize = downloads.reduce((acc, item) => acc + item.sizeBytes, 0);
  const totalSizeFormatted = (totalSize / (1024 * 1024)).toFixed(1);
  const storageLimit = 500; // MB
  const usagePercent = (totalSize / (storageLimit * 1024 * 1024)) * 100;

  const handleDelete = (item: DownloadedItem) => {
    setDownloads(downloads.filter(d => d.id !== item.id));
    setDeleteItem(null);
  };

  const handleCancelDownload = (id: string) => {
    setActiveDownloads(activeDownloads.filter(d => d.id !== id));
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
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6 text-primary" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Downloads</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4 sm:space-y-6">
          {/* Storage Summary */}
          <div className="glass-card p-4 sm:p-5 lg:p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 sm:p-4 rounded-xl bg-primary/20">
                <HardDrive className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg lg:text-xl font-medium">Storage</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {totalSizeFormatted} MB used of {storageLimit} MB
                </p>
              </div>
            </div>
            <Progress value={usagePercent} className="h-2 sm:h-3" />
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {(storageLimit - parseFloat(totalSizeFormatted)).toFixed(1)} MB remaining
            </p>
          </div>

          {/* Active Downloads */}
          {activeDownloads.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 px-1">
                <Download className="w-5 h-5 text-primary animate-pulse" />
                Downloading
              </h2>
              {activeDownloads.map((download) => (
                <div
                  key={download.id}
                  className="glass-card p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Music className="w-5 h-5 text-muted-foreground" />
                      <span className="text-base sm:text-lg font-medium">{download.name}</span>
                    </div>
                    <button
                      data-focusable="true"
                      onClick={() => handleCancelDownload(download.id)}
                      className="p-2 sm:p-3 rounded-xl hover:bg-destructive/20 text-destructive transition-colors focus:outline-none focus:ring-2 focus:ring-destructive"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <Progress value={download.progress} className="h-2 sm:h-3" />
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    {download.progress}% complete
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Downloaded Items */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold px-1">Downloaded Surahs</h2>
            
            {downloads.length === 0 ? (
              <div className="glass-card p-6 sm:p-8 text-center">
                <Music className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-sm sm:text-base text-muted-foreground">No downloaded content</p>
                <p className="text-xs sm:text-sm text-muted-foreground/70 mt-1">
                  Download Surahs from the Quran player for offline playback
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {downloads.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card p-4 sm:p-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="p-2 sm:p-3 rounded-xl bg-primary/20 shrink-0">
                        <Music className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base sm:text-lg font-medium truncate">{item.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {item.reciter} • {item.size}
                        </p>
                      </div>
                    </div>
                    <button
                      data-focusable="true"
                      onClick={() => setDeleteItem(item)}
                      className="p-3 sm:p-4 rounded-xl hover:bg-destructive/20 text-destructive transition-colors focus:outline-none focus:ring-2 focus:ring-destructive shrink-0"
                    >
                      <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓ to navigate • SELECT to delete • BACK to return
          </p>
        </div>
      </footer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent className="max-w-md sm:max-w-lg mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">Delete Download?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base">
              Are you sure you want to delete "{deleteItem?.name}"? You'll need to download it again for offline playback.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3">
            <AlertDialogCancel 
              data-focusable="true"
              className="w-full sm:w-auto px-6 py-3"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-focusable="true"
              onClick={() => deleteItem && handleDelete(deleteItem)}
              className="w-full sm:w-auto px-6 py-3 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
