import { useEffect, useState } from "react";
import api from "../api/axios";
import TemplateCard from "../components/TemplateCard";
import PageHeader from "../components/PageHeader";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/api/favorites");
      setFavorites(res.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-3xl p-5 sm:p-6 shadow-sm">
        <PageHeader
          title="My Favorites"
          subtitle="All templates you favorited are listed here."
          right={
            <button
              onClick={load}
              className="px-4 py-2 rounded-xl border bg-white font-bold text-slate-800 hover:bg-slate-50"
            >
              Refresh
            </button>
          }
        />
      </div>

      {loading ? (
        <div className="text-slate-600">Loading...</div>
      ) : favorites.length === 0 ? (
        <div className="bg-white border rounded-3xl p-8 text-center shadow-sm">
          <div className="text-lg font-extrabold">No favorites yet</div>
          <p className="text-slate-600 mt-1">
            Go to Templates and click <b>Favorite</b>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {favorites.map((t) => (
            <TemplateCard key={t._id} t={t} isFavorited={true} onFavorite={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
