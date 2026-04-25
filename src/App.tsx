/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "motion/react";
import { HeroSection } from "./components/HeroSection";
import { GallerySection } from "./components/GallerySection";
import { MessageSection } from "./components/MessageSection";
import { CakeSection } from "./components/CakeSection";
import { AudioPlayer } from "./components/AudioPlayer";
import { Particles } from "./components/Particles";

export default function App() {
  const [entered, setEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      className="relative bg-royal-base min-h-screen text-gray-100 overflow-x-hidden font-sans"
      ref={containerRef}
    >
      <AudioPlayer
        src="https://assets.mixkit.co/active_storage/sfx/135/135-preview.mp3"
        autoStart={entered}
      />

      {/* 3D Particles Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
          <Particles count={600} />
        </Canvas>
      </div>

      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-royal-light/50 via-royal-base to-black opacity-80"
      />

      <main className="relative z-10 w-full flex flex-col items-center overflow-x-hidden">
        {!entered ? (
          <HeroSection onEnter={() => setEntered(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full"
          >
            <HeroSection
              onEnter={() => {
                document
                  .getElementById("countdown")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <GallerySection />
            <MessageSection />
            <CakeSection />

            <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/10 mt-20 glass-panel border-b-0 border-x-0 rounded-none w-full relative z-20">
              <p>Made with ❤️ for Mamaji</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-4 hover:text-gold-light transition-colors relative z-30"
              >
                Replay Experience
              </button>
            </footer>
          </motion.div>
        )}
      </main>
    </div>
  );
}
