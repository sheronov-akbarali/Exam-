import { LogOut, Moon, Plus, Search, Sun } from "lucide-react";

function Navbar({ user, onLogout, onCreate, search, setSearch, isDark, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Task Manager</p>
            <h1 className="text-2xl font-bold tracking-normal text-slate-950 dark:text-white">Salom, {user?.fullName || "foydalanuvchi"}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
              type="button"
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
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
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-300 dark:focus:ring-red-950"
              type="button"
            >
              <LogOut size={18} />
              Chiqish
            </button>
          </div>
        </div>

        <label className="relative block max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-teal-500 dark:focus:bg-slate-950 dark:focus:ring-teal-950"
            placeholder="Vazifa qidirish..."
          />
        </label>
      </div>
    </header>
  );
}

export default Navbar;
