import { useState, useEffect } from "react";

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2 animate-fade-in">
      <div className="flex items-baseline gap-1">
        <span className="text-8xl lg:text-9xl font-light tabular-nums text-foreground text-shadow-soft">
          {hours}
        </span>
        <span className="text-7xl lg:text-8xl font-light text-gold animate-gentle-pulse">:</span>
        <span className="text-8xl lg:text-9xl font-light tabular-nums text-foreground text-shadow-soft">
          {minutes}
        </span>
        <span className="text-4xl lg:text-5xl font-light tabular-nums text-muted-foreground ml-2">
          {seconds}
        </span>
      </div>
    </div>
  );
};

export default CurrentTime;
