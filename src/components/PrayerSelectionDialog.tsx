import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Prayer {
  id: string;
  name: string;
  arabicName: string;
}

const prayers: Prayer[] = [
  { id: 'fajr', name: 'Fajr', arabicName: 'الفجر' },
  { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر' },
  { id: 'asr', name: 'Asr', arabicName: 'العصر' },
  { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب' },
  { id: 'isha', name: 'Isha', arabicName: 'العشاء' },
];

interface PrayerSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onSelectPrayer: (prayerId: string) => void;
}

const PrayerSelectionDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onSelectPrayer,
}: PrayerSelectionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">{title}</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-3 mt-4">
          {prayers.map((prayer) => (
            <Button
              key={prayer.id}
              data-focusable="true"
              variant="outline"
              onClick={() => onSelectPrayer(prayer.id)}
              data-prayer-id={prayer.id}
              className="flex items-center justify-between px-6 py-6 h-auto border-primary/20 hover:bg-primary/10 hover:border-primary/40 focus:ring-2 focus:ring-primary transition-all"
            >
              <span className="text-base font-medium">{prayer.name}</span>
              <span className="font-arabic text-xl text-primary">{prayer.arabicName}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <Button
            data-focusable="true"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrayerSelectionDialog;
