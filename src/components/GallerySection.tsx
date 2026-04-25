import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";

const PHOTOS = [
  {
    id: 1,
    src: "/images/photo1.jpg",
    caption: "A peaceful walk in nature 🌳",
  },
  {
    id: 2,
    src: "/images/photo2.jpg",
    caption: "Fun times and great memories 🎲",
  }
];

export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 relative z-10 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Golden Memories
        </h2>
        <p className="text-gray-400 text-lg">A lifetime of love and joy</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-${photo.id}`}
            onClick={() => setSelectedId(photo.id)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: -5,
              z: 50,
              transition: { duration: 0.2 },
            }}
            className="group relative cursor-pointer aspect-square rounded-2xl overflow-hidden glass-panel"
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-base/90 via-royal-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <p className="text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {photo.caption}
              </p>
            </div>

            {/* Glow border on hover */}
            <div className="absolute inset-0 border-2 border-gold-base/0 group-hover:border-gold-base/50 rounded-2xl transition-colors duration-300 box-glow opacity-0 group-hover:opacity-100 z-10 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedId(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(null);
              }}
            >
              <X className="w-8 h-8" />
            </button>

            {PHOTOS.filter((p) => p.id === selectedId).map((photo) => (
              <motion.div
                key={photo.id}
                layoutId={`photo-${photo.id}`}
                className="max-w-5xl w-full bg-royal-surface rounded-2xl overflow-hidden relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full max-h-[70vh] object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 md:p-8 bg-royal-surface border-t border-white/10">
                  <p className="text-xl md:text-2xl text-center text-gold-light italic">
                    "{photo.caption}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
