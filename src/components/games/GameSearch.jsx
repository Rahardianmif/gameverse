import { Search } from "lucide-react";

export default function GameSearch({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
        size={19}
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search free-to-play games..."
        className="gv-input w-full rounded-3xl py-4 pl-13 pr-5 text-sm placeholder:text-slate-500"
      />
    </div>
  );
}