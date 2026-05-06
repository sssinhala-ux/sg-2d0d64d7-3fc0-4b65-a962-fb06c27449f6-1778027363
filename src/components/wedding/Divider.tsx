export function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-10">
      <span className="h-px w-16 sm:w-32 bg-gradient-to-r from-transparent to-[var(--gold)]" />
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        className="text-[var(--gold-deep)]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="21" cy="21" r="3" fill="currentColor" />
          <circle cx="21" cy="21" r="9" />
          <circle cx="21" cy="21" r="16" strokeDasharray="2 3" />
          <path d="M21 5 L23 12 L21 16 L19 12 Z" fill="currentColor" />
          <path d="M21 37 L23 30 L21 26 L19 30 Z" fill="currentColor" />
          <path d="M5 21 L12 23 L16 21 L12 19 Z" fill="currentColor" />
          <path d="M37 21 L30 23 L26 21 L30 19 Z" fill="currentColor" />
        </g>
      </svg>
      <span className="h-px w-16 sm:w-32 bg-gradient-to-l from-transparent to-[var(--gold)]" />
    </div>
  );
}
