import mandala from "@/assets/mandala.png";

export function MandalaBg({
  className = "",
  reverse = false,
}: {
  className?: string;
  reverse?: boolean;
}) {
  return (
    <img
      src={mandala}
      alt=""
      aria-hidden
      loading="lazy"
      className={`pointer-events-none select-none opacity-20 ${reverse ? "animate-spin-slower" : "animate-spin-slow"} ${className}`}
    />
  );
}
