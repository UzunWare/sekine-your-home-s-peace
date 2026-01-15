import { MapPin } from "lucide-react";

interface LocationBadgeProps {
  location: string;
}

const LocationBadge = ({ location }: LocationBadgeProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 backdrop-blur border border-border/30 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <MapPin className="w-4 h-4 text-gold-soft" />
      <span className="text-sm text-foreground/80">{location}</span>
    </div>
  );
};

export default LocationBadge;
