import { Gamepad2 } from "lucide-react";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-6 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-500 text-white">
              <Gamepad2 size={20} />
            </span>
            <div>
              <p className="font-black text-white">GameVerse</p>
              <p className="text-sm text-slate-500">Discover free-to-play games.</p>
            </div>
          </div>

          <p className="text-sm text-slate-500">
            Data source: FreeToGame API
          </p>
        </div>
      </Container>
    </footer>
  );
}