import { useState, useEffect } from "react";
import { motion } from "motion/react";

// Target date: 10 days from current date for demo purposes
// Current Date: 2026-04-25T10:10:47Z
const TARGET_DATE = new Date("2026-05-15T00:00:00").getTime();

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      className="min-h-[80vh] flex flex-col items-center justify-center relative px-4"
      id="countdown"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-16 rounded-3xl z-10 w-full max-w-4xl box-glow relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-base to-transparent" />

        <h2 className="text-3xl md:text-5xl text-center mb-12 text-white font-bold">
          The Celebration Begins In
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {timeBlocks.map((block, i) => (
            <div key={block.label} className="flex flex-col items-center">
              <motion.div
                key={block.value}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-royal-surface border border-white/10 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,215,0,0.15)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gold-base/5 group-hover:bg-gold-base/10 transition-colors" />
                <span className="text-4xl md:text-6xl font-bold text-gold-light font-mono tabular-nums text-glow">
                  {block.value.toString().padStart(2, "0")}
                </span>
              </motion.div>
              <span className="text-gray-400 uppercase tracking-widest text-sm font-semibold">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
