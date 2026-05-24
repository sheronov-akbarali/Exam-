import { LogOut, Plus, Search } from "lucide-react";

function Navbar({ user, onLogout, onCreate, search, setSearch }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Task Manager</p>
            <h1 className="text-2xl font-bold tracking-normal text-slate-950">Salom, {user?.fullName || "foydalanuvchi"}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onCreate}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-teal-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
              type="button"
            >
              <Plus size={18} />
              Yangi vazifa
            </button>
            <button
              onClick={onLogout}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
              type="button"
            >
              <LogOut size={18} />
              Chiqish
            </button>
          </div>
        </div>

        <label className="relative block max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            placeholder="Vazifa qidirish..."
          />
        </label>
      </div>
    </header>
  );
}

export default Navbar;
