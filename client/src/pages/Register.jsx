import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await api.post("/api/auth/register", form);
      nav("/login");
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white border rounded-3xl p-6 sm:p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold tracking-tight">Register</h1>
      <p className="text-slate-600 mt-1">Create an account to save favorites.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-700">Name</label>
          <input
            className="mt-1 w-full border rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

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
            placeholder="Min 6 characters"
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
          {loading ? "Creating..." : "Create account"}
        </button>

        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-slate-900 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
