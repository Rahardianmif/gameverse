export default function Badge({ icon, label, variant = "default" }) {
  if (!label) return null;

  const variants = {
    default: "border-white/10 bg-white/[0.06] text-slate-300",
    violet: "border-violet-400/30 bg-violet-500/15 text-violet-200",
    cyan: "border-sky-400/30 bg-sky-500/15 text-sky-200",
    pink: "border-pink-400/30 bg-pink-500/15 text-pink-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${variants[variant]}`}
    >
      {icon}
      {label}
    </span>
  );
}