import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import Container from "../components/common/Container";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center overflow-hidden py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur md:p-12">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-[2rem] bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-950/40">
            <Gamepad2 size={38} />
          </div>

          <p className="text-7xl font-black tracking-tight text-violet-300 md:text-8xl">
            404
          </p>

          <h1 className="mt-5 text-3xl font-black text-white">
            Page not found
          </h1>

          <p className="mx-auto mt-3 max-w-md leading-7 text-slate-400">
            Halaman yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.
          </p>

          <Link
            to="/"
            className="gv-shine mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-slate-950 transition hover:bg-violet-100"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}