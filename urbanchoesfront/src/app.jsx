import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import { useAuthStore } from "./store/auth.store.js";
import WhatsAppButton from "./components/WhatsAppButton";
import ProductDetail from "./pages/productDetail.jsx";



// 🔹 importación para probar la conexión al backend
import { useEffect } from "react";
import { api } from "./services/api.js";

function PrivateRoute() {
  const token = useAuthStore((s) => s.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  // 🔹 Probar conexión con el backend (opcional)
  useEffect(() => {
    api
      .ping()
      .then((data) => console.log("✅ Backend conectado:", data.message))
      .catch((err) => console.error("❌ Error al conectar con backend:", err));
  }, []);

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
        <Route path="/producto/:id" element={<ProductDetail />} />

      </Routes>

      <WhatsAppButton />

    </div>
  );
}
