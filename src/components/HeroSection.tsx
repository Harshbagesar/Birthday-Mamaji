import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onEnter: () => void;
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center px-4"
      >
        <motion.p
          className="text-gold-light tracking-widest uppercase text-sm md:text-base mb-4 font-sans font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A Premium Family Celebration
        </motion.p>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gold-light via-gold-base to-gold-dark mb-6 text-glow leading-tight">
          Happy Birthday
          <br />
          <span className="text-white">Mamaji</span> 🎉
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12"
        >
          <button
            onClick={onEnter}
            className="glass-button px-8 py-4 rounded-full text-lg font-semibold tracking-wider flex items-center gap-2 mx-auto"
          >
            Enter Celebration
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative blurred background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-light rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-900/50 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </div>
  );
}
