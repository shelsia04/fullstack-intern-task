export default function TemplateCard({ t, isFavorited, onFavorite }) {
  return (
    <article className="h-full bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
      {/* Fixed image height across all cards */}
      <div className="h-44 w-full bg-slate-100">
        <img
          src={t.thumbnail_url}
          alt={t.name}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-extrabold text-slate-900 truncate">{t.name}</h3>
            <p className="text-xs text-slate-500 mt-1">Template • {t.category}</p>
          </div>

          <button
            onClick={() => onFavorite(t._id)}
            disabled={isFavorited}
            className={`shrink-0 px-3 py-2 rounded-xl text-sm font-bold transition ${
              isFavorited
                ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {isFavorited ? "Favorited" : "Favorite"}
          </button>
        </div>

        {/* Description with consistent height */}
        <p className="mt-3 text-sm text-slate-600 line-clamp-3">
          {t.description}
        </p>

        {/* Footer pinned to bottom */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700">
            {t.category}
          </span>
          <span className="text-xs text-slate-500">Ready</span>
        </div>
      </div>
    </article>
  );
}
