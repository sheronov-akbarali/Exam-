import { CalendarDays, Check } from "lucide-react";

const priorityStyles = {
  HIGH: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300",
  MEDIUM: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300",
  LOW: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
};

const nextStatus = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "DONE",
  DONE: "TODO"
};

const nextStatusLabel = {
  TODO: "Boshlash",
  IN_PROGRESS: "Tugatish",
  DONE: "Qaytarish"
};

function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const dueDate = formatDate(task.dueDate);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-700/70 dark:bg-[#0b1d3a] dark:shadow-none">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-base font-bold leading-6 text-slate-950 dark:text-white">{task.title}</h3>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{task.description}</p> : null}

      {dueDate ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <CalendarDays size={15} />
          {dueDate}
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-2">
        <button
          onClick={() => onStatusChange(task, nextStatus[task.status])}
          className="inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:bg-teal-600 dark:hover:bg-teal-500 dark:focus:ring-teal-950"
          type="button"
          title="Statusni o'zgartirish"
        >
          <Check size={16} />
          <span className="truncate">{nextStatusLabel[task.status]}</span>
        </button>
        <button
          onClick={() => onEdit(task)}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 dark:focus:ring-blue-950"
          type="button"
          title="Tahrirlash"
        >
          Tahrir
        </button>
        <button
          onClick={() => onDelete(task)}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-300 dark:focus:ring-red-950"
          type="button"
          title="O'chirish"
        >
          O'chirish
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
