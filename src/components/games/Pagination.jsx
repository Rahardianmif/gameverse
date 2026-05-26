import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={page <= 1}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-black text-slate-200 transition hover:border-violet-400/50 hover:bg-violet-500/10 disabled:opacity-40"
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      <span className="rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-black text-white">
        Page {page} / {totalPages || 1}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={page >= totalPages}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-black text-slate-200 transition hover:border-violet-400/50 hover:bg-violet-500/10 disabled:opacity-40"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}