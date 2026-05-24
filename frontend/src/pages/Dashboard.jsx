import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api, { tokenStorage } from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskModal from "../components/TaskModal.jsx";

const columns = [
  {
    key: "TODO",
    title: "TODO",
    headerClass: "border-slate-300 bg-slate-100 text-slate-700"
  },
  {
    key: "IN_PROGRESS",
    title: "IN PROGRESS",
    headerClass: "border-blue-200 bg-blue-50 text-blue-700"
  },
  {
    key: "DONE",
    title: "DONE",
    headerClass: "border-emerald-200 bg-emerald-50 text-emerald-700"
  }
];

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Vazifalarni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tasks;
    return tasks.filter((task) => `${task.title} ${task.description}`.toLowerCase().includes(query));
  }, [tasks, search]);

  const groupedTasks = useMemo(
    () =>
      columns.reduce((acc, column) => {
        acc[column.key] = filteredTasks.filter((task) => task.status === column.key);
        return acc;
      }, {}),
    [filteredTasks]
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      active: tasks.filter((task) => task.status !== "DONE").length,
      done: tasks.filter((task) => task.status === "DONE").length,
      high: tasks.filter((task) => task.priority === "HIGH").length
    }),
    [tasks]
  );

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    setSaving(true);
    setError("");

    try {
      if (editingTask) {
        const { data } = await api.put(`/tasks/${editingTask._id}`, payload);
        setTasks((current) => current.map((task) => (task._id === editingTask._id ? data.data : task)));
      } else {
        const { data } = await api.post("/tasks", payload);
        setTasks((current) => [data.data, ...current]);
      }
      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.response?.data?.message || "Vazifani saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (task) => {
    const confirmed = window.confirm(`"${task.title}" vazifasini o'chirishni tasdiqlaysizmi?`);
    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${task._id}`);
      setTasks((current) => current.filter((item) => item._id !== task._id));
    } catch (err) {
      setError(err.response?.data?.message || "Vazifani o'chirishda xatolik yuz berdi");
    }
  };

  const handleStatusChange = async (task, status) => {
    try {
      const { data } = await api.patch(`/tasks/${task._id}/status`, { status });
      setTasks((current) => current.map((item) => (item._id === task._id ? data.data : item)));
    } catch (err) {
      setError(err.response?.data?.message || "Statusni o'zgartirishda xatolik yuz berdi");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
    } finally {
      tokenStorage.clear();
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <div className="app-shell min-h-screen">
      <Navbar user={user} onLogout={handleLogout} onCreate={openCreate} search={search} setSearch={setSearch} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Jami" value={stats.total} />
          <Stat label="Jarayonda" value={stats.active} />
          <Stat label="Bajarilgan" value={stats.done} />
          <Stat label="O'ta muhim" value={stats.high} />
        </section>

        {error ? (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>
        ) : null}

        {loading ? (
          <div className="mt-12 flex items-center justify-center gap-3 text-slate-600">
            <Loader2 className="animate-spin" size={22} />
            Vazifalar yuklanmoqda...
          </div>
        ) : (
          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            {columns.map((column) => {
              const columnTasks = groupedTasks[column.key] || [];

              return (
                <div key={column.key} className="min-h-[420px] rounded-lg border border-slate-200/80 bg-white/55 p-3">
                  <div className={`mb-3 flex items-center justify-between rounded-lg border px-3 py-2 ${column.headerClass}`}>
                    <div className="flex min-w-0 items-center">
                      <h2 className="truncate text-sm font-extrabold">{column.title}</h2>
                    </div>
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-bold">{columnTasks.length}</span>
                  </div>

                  <div className="space-y-3">
                    {columnTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    ))}

                    {!columnTasks.length ? (
                      <div className="rounded-lg border border-dashed border-slate-300 bg-white/60 px-4 py-10 text-center text-sm font-medium text-slate-500">
                        Bu ustunda vazifa yo'q
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>

      <TaskModal
        open={modalOpen}
        task={editingTask}
        loading={saving}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-white/80 bg-white/80 px-4 py-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-slate-950">{value}</p>
    </div>
  );
}

export default Dashboard;
