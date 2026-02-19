import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import TemplateCard from "../components/TemplateCard";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[330px] bg-white border rounded-2xl animate-pulse">
          <div className="h-44 bg-slate-100 rounded-t-2xl" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-2/3 bg-slate-100 rounded" />
            <div className="h-3 w-full bg-slate-100 rounded" />
            <div className="h-3 w-5/6 bg-slate-100 rounded" />
            <div className="h-10 w-28 bg-slate-100 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Templates() {
  const { isAuthed } = useAuth();

  const [templates, setTemplates] = useState([]);
  const [favIds, setFavIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  async function load() {
    setLoading(true);
    try {
      const tRes = await api.get("/api/templates");
      setTemplates(tRes.data || []);

      if (isAuthed) {
        const fRes = await api.get("/api/favorites");
        setFavIds(new Set((fRes.data || []).map((x) => x._id)));
      } else {
        setFavIds(new Set());
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed]);

  async function addFavorite(templateId) {
    try {
      await api.post(`/api/favorites/${templateId}`);
      setFavIds((prev) => new Set([...prev, templateId]));
    } catch (e) {
      alert(e?.response?.data?.message || "Login required to favorite");
    }
  }

  const categories = useMemo(() => {
    const set = new Set(templates.map((t) => t.category));
    return ["All", ...Array.from(set)];
  }, [templates]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return templates.filter((t) => {
      const matchCat = cat === "All" ? true : t.category === cat;
      const matchQ =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query);
      return matchCat && matchQ;
    });
  }, [templates, q, cat]);

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-3xl p-5 sm:p-6 shadow-sm">
        <PageHeader
          title="Templates"
          subtitle="Browse templates and add your favorites"
          right={
            <div className="text-sm font-semibold text-slate-600">
              {isAuthed ? "Logged in ✅" : "Login to favorite 🔒"}
            </div>
          }
        />

        {/* Controls */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates..."
            className="sm:col-span-2 w-full border rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <GridSkeleton />
      ) : filtered.length === 0 ? (
        <div className="bg-white border rounded-3xl p-8 text-center shadow-sm">
          <div className="text-lg font-extrabold">No templates found</div>
          <p className="text-slate-600 mt-1">Try changing the search or category.</p>
          <button
            onClick={() => {
              setQ("");
              setCat("All");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {filtered.map((t) => (
            <TemplateCard
              key={t._id}
              t={t}
              isFavorited={favIds.has(t._id)}
              onFavorite={addFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
