import { SearchX, Sparkles } from "lucide-react";

export default function EmptyState({
  title = "Data tidak ditemukan",
  message = "Coba gunakan kata kunci atau filter lain.",
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center shadow-2xl shadow-black/20 backdrop-blur">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-violet-500/15 text-violet-300">
        <SearchX size={34} />
      </div>

      <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-400">
        <Sparkles size={13} />
        Empty Result
      </p>

      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {message}
      </p>
    </div>
  );
}