import mosqueBackground1 from "@/assets/mosque-background-1.jpg";
import mosqueBackground2 from "@/assets/mosque-background-2.jpg";
import { useState, useEffect } from "react";

const BackgroundSlideshow = () => {
  const backgrounds = [mosqueBackground1, mosqueBackground2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        setIsTransitioning(false);
      }, 1000);
    }, 30000); // Change every 30 seconds

    return () => clearInterval(timer);
  }, [backgrounds.length]);

  return (
    <div className="fixed inset-0 z-0">
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      
      {/* Additional top fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, hsl(222 47% 6% / 0.4) 100%)"
      }} />

      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-30 pointer-events-none" />
    </div>
  );
};

export default BackgroundSlideshow;
