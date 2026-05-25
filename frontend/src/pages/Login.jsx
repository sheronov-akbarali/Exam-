import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api, { tokenStorage } from "../api/axios.js";

function Login({ isDark, onToggleTheme }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", form);
      tokenStorage.set(data.tokens);
      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Kirishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
      <button
        onClick={onToggleTheme}
        className="fixed right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
        type="button"
        title={isDark ? "Light mode" : "Dark mode"}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <section className="w-full max-w-md rounded-lg border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">Kirish</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Vazifalaringizni davom ettirish uchun akkauntingizga kiring.</p>
        </div>

        {error ? <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300">{error}</div> : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-teal-950"
              placeholder="sheronovakbarali@gmail.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Parol</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-teal-950"
              placeholder="Secret123 deb aytibsiz"
            />
          </label>

          <button
            disabled={loading}
            className="h-11 w-full rounded-lg bg-slate-950 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:bg-teal-600 dark:hover:bg-teal-500 dark:focus:ring-teal-950"
            type="submit"
          >
            {loading ? "Kirilmoqda..." : "Kirish"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Akkauntingiz yo'qmi?{" "}
          <Link className="font-bold text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200" to="/register">
            Ro'yxatdan o'ting
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
