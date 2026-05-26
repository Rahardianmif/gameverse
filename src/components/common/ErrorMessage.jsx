import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({
  title = "Terjadi kesalahan",
  message = "Data gagal dimuat.",
}) {
  return (
    <div className="rounded-[2rem] border border-red-500/20 bg-red-950/40 p-6 text-red-100 shadow-xl shadow-red-950/20 backdrop-blur">
      <div className="mb-2 flex items-center gap-3 font-black">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-red-500/15">
          <AlertTriangle size={20} />
        </span>
        <span>{title}</span>
      </div>

      <p className="text-sm leading-6 text-red-200">{message}</p>
    </div>
  );
}