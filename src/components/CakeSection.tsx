import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Gift, X } from "lucide-react";

export function CakeSection() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);

      const audio = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3",
      );
      audio.play().catch(() => {});

      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        );
      }, 250);
    }
  };

  return (
    <section className="min-h-screen py-24 flex flex-col items-center justify-center relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-4"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
          Make a Wish
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
          Tap the cake to blow out the candles and start the fireworks!
        </p>
      </motion.div>

      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBlowCandles}
      >
        {/* Cake Illustration */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-end drop-shadow-2xl">
          {/* Candles */}
          <div className="flex gap-4 mb-[-10px] z-20 absolute top-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Flame */}
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={
                    candlesBlown
                      ? { opacity: 0, scale: 0, y: -20 }
                      : { opacity: 1, scale: [1, 1.2, 1], rotate: [-2, 2, -2] }
                  }
                  transition={
                    candlesBlown
                      ? { duration: 0.5 }
                      : { duration: 1.5, repeat: Infinity, delay: i * 0.2 }
                  }
                  className="w-4 h-8 bg-gradient-to-t from-gold-base to-red-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_20px_#ffd700] mb-1"
                />
                {/* Candle Stick */}
                <div className="w-3 h-12 bg-gradient-to-r from-red-300 via-white to-red-300 rounded-sm rounded-t-none border border-white/20 shadow-inner" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="z-10 relative">
            <div className="w-40 h-20 bg-gradient-to-b from-pink-300 to-pink-400 rounded-[50%] absolute -top-10 left-1/2 -translate-x-1/2 shadow-inner border-t border-white/40" />
            <div className="w-40 h-24 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-b-2xl mx-auto shadow-[0_10px_20px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div
                className="absolute top-0 w-full h-8 bg-pink-200 rounded-b-full"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 50%, 80% 100%, 60% 40%, 40% 90%, 20% 30%, 0 80%)",
                }}
              />
            </div>

            <div className="w-56 h-24 bg-gradient-to-b from-purple-400 to-purple-500 rounded-[50%] absolute top-8 left-1/2 -translate-x-1/2 shadow-inner border-t border-white/30 z-[-1]" />
            <div className="w-56 h-32 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-b-2xl mx-auto shadow-[0_15px_30px_rgba(0,0,0,0.4)] relative mt-[-20px] overflow-hidden">
              <div
                className="absolute top-0 w-full h-10 bg-purple-300 rounded-b-full"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 60%, 85% 30%, 70% 90%, 50% 40%, 30% 100%, 15% 50%, 0 80%)",
                }}
              />
            </div>
          </div>

          {/* Cake Stand */}
          <div className="w-72 h-8 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-[50%] mt-[-10px] z-[-2] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-b-4 border-gray-400" />
          <div className="w-32 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-b-full mt-[-5px] z-[-3] shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
        </div>
      </motion.div>

      <AnimatePresence>
        {candlesBlown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 px-4"
          >
            <h3 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark text-glow mb-8 text-center uppercase tracking-widest">
              Happy Birthday!
            </h3>

            <button
              onClick={() => setShowSurprise(true)}
              className="glass-button px-8 py-4 rounded-full flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(255,215,0,0.2)]"
            >
              <Gift className="w-5 h-5" />
              Open Surprise Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-royal-base/90 backdrop-blur-xl isolate"
            onClick={() => setShowSurprise(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors z-50"
              onClick={() => setShowSurprise(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="glass-panel max-w-2xl w-full p-8 md:p-12 rounded-3xl relative text-center box-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-4xl md:text-5xl font-serif text-gold-base mb-6 text-glow">
                Special Surprise!
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                To the world's best Mamaji, your infectious laughter and
                unconditional support mean the universe to us. We hope this year
                brings you abundant joy, peace, and more family gatherings we
                can cherish forever. We love you unconditionally! ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
