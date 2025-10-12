import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@urbanshoes.com" && password === "123456") {
      setAuth({ token: "fake-token", user: { email, role: "admin" } });
      nav("/admin");
    } else setError("Credenciales incorrectas");
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm p-6 rounded-2xl bg-white shadow border">
        <h1 className="text-xl font-bold">Acceso administrador</h1>
        <input className="w-full border rounded-lg px-3 py-2 mt-4" placeholder="correo" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded-lg px-3 py-2 mt-3" placeholder="contraseña" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <button className="mt-4 w-full py-2 rounded-lg bg-[var(--accent)] text-white font-semibold">Entrar</button>
      </form>
    </div>
  );
}
