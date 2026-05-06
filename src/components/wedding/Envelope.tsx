import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import envelopeBg from "@/assets/envelope.jpg";
import { Sparkles } from "./Sparkles";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handle = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center maroon-bg overflow-hidden"
      initial={{ opacity: 1 }}
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, delay: opening ? 1.4 : 0 }}
    >
      <Sparkles count={30} />
      <div
        className="relative w-[90vw] max-w-md aspect-[3/4]"
        style={{ perspective: 1400 }}
      >
        <AnimatePresence>
          {!opening && (
            <motion.div
              key="hint"
              className="absolute -top-12 left-0 right-0 text-center text-[var(--gold-soft)] font-[var(--font-display)] tracking-[0.4em] text-xs sm:text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              ✦ TAP TO OPEN ✦
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inner card revealed */}
        <motion.div
          className="absolute inset-4 rounded-lg bg-[var(--ivory)] flex flex-col items-center justify-center px-6 text-center shadow-elegant"
          initial={{ scale: 0.85 }}
          animate={opening ? { scale: 1 } : { scale: 0.85 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xs tracking-[0.5em] text-[var(--gold-deep)] mb-2">
            WEDDING OF
          </p>
          <h2 className="gold-text text-3xl sm:text-4xl font-bold">
            Dilki & Kasun
          </h2>
          <p className="mt-3 text-[var(--maroon)] text-sm">04 . 06 . 2026</p>
        </motion.div>

        {/* Envelope cover (front flap) */}
        <motion.button
          onClick={handle}
          className="absolute inset-0 origin-bottom rounded-lg overflow-hidden cursor-pointer focus:outline-none"
          style={{
            backgroundImage: `url(${envelopeBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformStyle: "preserve-3d",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
          }}
          initial={{ rotateX: 0 }}
          animate={opening ? { rotateX: -170, y: -20 } : { rotateX: 0 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          whileHover={!opening ? { scale: 1.02 } : {}}
          aria-label="Open invitation"
        >
          <div className="absolute inset-0 flex items-end justify-center pb-8">
            <div className="text-[var(--gold-soft)] tracking-[0.4em] text-xs">
              ෴ ශුභ විවාහ මංගල්‍යය ෴
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
