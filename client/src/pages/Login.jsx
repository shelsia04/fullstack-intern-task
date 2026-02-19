import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", form);
      login(res.data.token, res.data.user);
      nav("/templates");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white border rounded-3xl p-6 sm:p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold tracking-tight">Login</h1>
      <p className="text-slate-600 mt-1">Access templates and favorites.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-700">Email</label>
          <input
            className="mt-1 w-full border rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-bold text-slate-700">Password</label>
          <input
            className="mt-1 w-full border rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {err && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 font-semibold">
            {err}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white rounded-2xl px-4 py-3 font-extrabold hover:bg-slate-800 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-slate-600">
          New user?{" "}
          <Link to="/register" className="font-bold text-slate-900 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
