import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Templates from "./pages/Templates";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/templates" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/templates" element={<Templates />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/templates" replace />} />
        </Routes>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mini SaaS Template Store</span>
          <span className="text-slate-400">Built with React + Node + JWT</span>
        </div>
      </footer>
    </div>
  );
}
