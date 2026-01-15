import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [downloads, setDownloads] = useState<DownloadedItem[]>(mockDownloads);
  const [activeDownloads, setActiveDownloads] = useState<ActiveDownload[]>(mockActiveDownloads);
  const [deleteItem, setDeleteItem] = useState<DownloadedItem | null>(null);

  useTVNavigation({
    onBack: () => {
      if (deleteItem) setDeleteItem(null);
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
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/settings"
          className="p-3 rounded-xl bg-card/50 hover:bg-card transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold">Downloads</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Storage Summary */}
        <div className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <HardDrive className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">Storage</h3>
              <p className="text-muted-foreground">
                {totalSizeFormatted} MB used of {storageLimit} MB
              </p>
            </div>
          </div>
          <Progress value={usagePercent} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {(storageLimit - parseFloat(totalSizeFormatted)).toFixed(1)} MB remaining
          </p>
        </div>

        {/* Active Downloads */}
        {activeDownloads.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Download className="w-5 h-5 text-primary animate-pulse" />
              Downloading
            </h2>
            {activeDownloads.map((download) => (
              <div
                key={download.id}
                className="p-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{download.name}</span>
                  </div>
                  <button
                    onClick={() => handleCancelDownload(download.id)}
                    className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors focus:outline-none focus:ring-2 focus:ring-destructive"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <Progress value={download.progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  {download.progress}% complete
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Downloaded Items */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Downloaded Surahs</h2>
          
          {downloads.length === 0 ? (
            <div className="p-8 rounded-2xl bg-card/20 border border-border/30 text-center">
              <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No downloaded content</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Download Surahs from the Quran player for offline playback
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {downloads.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Music className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.reciter} • {item.size}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDeleteItem(item)}
                    className="p-3 rounded-xl hover:bg-destructive/20 text-destructive transition-colors focus:outline-none focus:ring-2 focus:ring-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Download?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteItem?.name}"? You'll need to download it again for offline playback.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteItem && handleDelete(deleteItem)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
