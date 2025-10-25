const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  async ping() {
    const res = await fetch(`${API_URL}/ping`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  },

  async getCourses() {
    const res = await fetch(`${API_URL}/courses`);
    return res.json();
  },

  async login(data) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};
