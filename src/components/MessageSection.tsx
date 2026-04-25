import { motion } from "motion/react";
import { useRef } from "react";

const MESSAGES = [
  "You are not just my Mamaji, you are my inspiration.",
  "Your love and guidance mean everything to us.",
  "Wishing you happiness, health, and success always.",
  "Thank you for always being there for the family.",
];

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block text-2xl md:text-4xl text-center text-white/90 leading-tight py-8 font-serif italic">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.1, delay: delay + index * 0.05 }}
          className={char === " " ? "mr-2" : ""}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function MessageSection() {
  return (
    <section className="py-32 px-4 relative flex flex-col items-center justify-center overflow-hidden w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none"
      >
        {/* Abstract glowing heart shape or circle behind messages */}
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gold-base/20 to-purple-600/20 blur-[80px]" />
      </motion.div>

      <div className="z-10 w-full space-y-24">
        {MESSAGES.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-3xl p-8 max-w-3xl mx-auto relative group box-glow shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute -top-4 -left-4 text-gold-base text-6xl opacity-50 font-serif">
              "
            </div>
            <TypewriterText text={msg} delay={0.3} />
            <div className="absolute -bottom-10 -right-4 text-gold-base text-6xl opacity-50 font-serif transform rotate-180">
              "
            </div>

            {/* Floating particles around each card */}
            <motion.div
              className="absolute -top-6 -right-6 w-3 h-3 rounded-full bg-gold-light shadow-[0_0_10px_#ffea70]"
              animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
            />
            <motion.div
              className="absolute -bottom-4 -left-8 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"
              animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: idx * 0.7 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
