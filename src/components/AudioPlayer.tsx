import { Volume2, VolumeX, Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface AudioPlayerProps {
  src: string;
  autoStart?: boolean;
}

export function AudioPlayer({ src, autoStart }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (autoStart && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  }, [autoStart]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log("Autoplay prevented:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Listen for audio tags globally playing/pausing and sync state if needed
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.addEventListener("play", handlePlay);
      audioRef.current.addEventListener("pause", handlePause);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", handlePlay);
        audioRef.current.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed top-6 right-6 z-50 flex items-center gap-3 glass-panel px-4 py-2 rounded-full"
    >
      <audio ref={audioRef} src={src} loop />

      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gold-base"
      >
        <Music className={`w-5 h-5 ${isPlaying ? "animate-pulse-slow" : ""}`} />
      </button>

      <div className="w-px h-6 bg-white/20" />

      <button
        onClick={toggleMute}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-300"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    </motion.div>
  );
}
