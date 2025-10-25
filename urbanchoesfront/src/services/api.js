// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  async ping() {
    try {
      const res = await fetch(`${API_URL}/ping`);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("❌ Error al conectar con el backend:", err);
      throw err;
    }
  }
};
