import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLink =
  "px-3 py-2 rounded-xl text-sm font-semibold transition hover:bg-slate-100";
const activeLink = "bg-slate-900 text-white hover:bg-slate-900";

export default function Navbar() {
  const { isAuthed, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/templates" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-black">
            TS
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight">Template Store</div>
            <div className="text-xs text-slate-500 -mt-0.5">Mini SaaS</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/templates"
            className={({ isActive }) => `${navLink} ${isActive ? activeLink : "text-slate-700"}`}
          >
            Templates
          </NavLink>

          {isAuthed && (
            <NavLink
              to="/favorites"
              className={({ isActive }) => `${navLink} ${isActive ? activeLink : "text-slate-700"}`}
            >
              My Favorites
            </NavLink>
          )}

          {!isAuthed ? (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) => `${navLink} ${isActive ? activeLink : "text-slate-700"}`}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-semibold transition border ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-800 hover:bg-slate-50"
                  }`
                }
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border">
                <div className="h-7 w-7 rounded-full bg-slate-900 text-white grid place-items-center text-xs font-bold">
                  {(user?.name || "U").slice(0, 1).toUpperCase()}
                </div>
                <span className="text-sm text-slate-700">
                  <b>{user?.name || "User"}</b>
                </span>
              </div>

              <button
                onClick={logout}
                className="px-3 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
