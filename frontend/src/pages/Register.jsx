import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api, { tokenStorage } from "../api/axios.js";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
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
      const { data } = await api.post("/auth/register", form);
      tokenStorage.set(data.tokens);
      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-950">Ro'yxatdan o'tish</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Shaxsiy vazifalaringiz uchun yangi akkaunt yarating.</p>
        </div>

        {error ? <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div> : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">To'liq ism</span>
            <input
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Akbarali Sheronov"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="sheronovakbarali@gmail.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Parol</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              minLength="6"
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Secret123 deb yozibsiz"
            />
          </label>

          <button
            disabled={loading}
            className="h-11 w-full rounded-lg bg-slate-950 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            type="submit"
          >
            {loading ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Akkauntingiz bormi?{" "}
          <Link className="font-bold text-teal-700 hover:text-teal-800" to="/login">
            Kirish
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
