import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import { useAuthStore } from "./store/auth.store.js";

function PrivateRoute() {
  const token = useAuthStore((s) => s.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Enlace principal al inicio (más grande) */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-[var(--brand)] hover:text-[var(--accent)] transition-colors"
          >
            inicio
          </Link>

          {/* lado derecho vacío (sin panel/salir/login) */}
          <div className="ml-auto" />
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}
