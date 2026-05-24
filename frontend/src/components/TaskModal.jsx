import { X } from "lucide-react";
import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  priority: "MEDIUM",
  dueDate: ""
};

function toDateInputValue(date) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

function TaskModal({ open, task, loading, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;
    setForm(
      task
        ? {
            title: task.title || "",
            description: task.description || "",
            priority: task.priority || "MEDIUM",
            dueDate: toDateInputValue(task.dueDate)
          }
        : initialForm
    );
  }, [open, task]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      dueDate: form.dueDate || undefined
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-950">{task ? "Vazifani tahrirlash" : "Yangi vazifa"}</h2>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            type="button"
            title="Yopish"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Sarlavha</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Masalan: React hooks o'rganish"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Tavsif</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Qo'shimcha ma'lumot..."
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Muhimlik</span>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              >
                <option value="LOW">Unchalik emas</option>
                <option value="MEDIUM">Muhim</option>
                <option value="HIGH">O'ta Muhim</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Muddat</span>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              type="button"
            >
              Bekor qilish
            </button>
            <button
              disabled={loading}
              className="h-10 rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
              type="submit"
            >
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
