import { Moon, Sun } from "lucide-react";

const baseClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-slate-700";

function ThemeToggle({ isDark, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${className}`.trim()}
      type="button"
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default ThemeToggle;
