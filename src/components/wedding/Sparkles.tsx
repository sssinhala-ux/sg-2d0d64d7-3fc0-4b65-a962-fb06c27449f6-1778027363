import { motion } from "framer-motion";

export function Sparkles({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 4;
        const size = 4 + Math.random() * 6;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: -10,
              width: size,
              height: size,
              background:
                "radial-gradient(circle, var(--gold-soft), transparent 70%)",
              boxShadow: "0 0 8px var(--gold)",
              animation: `float-up ${8 + Math.random() * 8}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
