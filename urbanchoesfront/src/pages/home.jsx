// src/pages/home.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 12;

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  // Carga remota desde JSON
  const [allProducts, setAllProducts] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [page, setPage] = useState(1);

  // Tus categorías (puedes sumar más si las usas en el JSON)
  const categories = [
    "Todos",
    "Urbanas",
    "Deportivas",
    "Running",
    "Casual",
    "New Balance 9060",
    "New Balance 1906R",
  ];

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingList(true);
        const res = await fetch("/src/data/products.json");
        const data = await res.json();
        if (!alive) return;
        setAllProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error cargando products.json", e);
        setAllProducts([]);
      } finally {
        if (alive) setLoadingList(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Filtros
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts.filter((p) => {
      const matchCat = category === "Todos" || p.category?.includes(category);
      const matchQ = !q || p.name.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [allProducts, category, query]);

  // Paginación
  const visible = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const canLoadMore = visible.length < filtered.length;

  // ====== UI ======
  return (
    <div
      className="min-h-screen"
      style={{
        "--brand": "#0d0d0d",
        "--accent": "#e11d48",
        "--accent-2": "#f43f5e",
        color: "#111111",
        background: "#f8fafc",
      }}
    >
      {/* TOPBAR */}
      <div className="w-full bg-[var(--brand)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex flex-col items-center justify-center gap-2 text-[11px] sm:flex-row sm:gap-4 sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">🚚</span>
              <span className="tracking-wide"><b>Envíos</b> a <b>toda Colombia</b></span>
              <span className="hidden sm:inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">🇨🇴</span>
            </div>
            <span className="hidden sm:inline text-white/40">•</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">⚡</span>
              <span className="tracking-wide"><b>Plataforma verificada</b></span>
              <span className="hidden sm:inline text-white/40">—</span>
              <span className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">💳</span>
                <span className="tracking-wide"><b>Pago contraentrega</b></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[var(--brand)] grid place-items-center overflow-hidden">
              <img src="/LOGO MARCA INSTAGRAM.png" alt="URBANSHOES" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-black tracking-tight">URBANSHOES</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">CALI — COLOMBIA</div>
            </div>
          </div>

          <div className="ml-auto flex-1 max-w-md">
            <label className="relative block">
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Buscar zapatillas..."
                className="w-full rounded-2xl border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">🔎</span>
            </label>
          </div>

          <button className="hidden sm:inline-flex ml-4 px-4 py-2 rounded-2xl font-medium text-white bg-[var(--accent)] hover:opacity-90">
            Ver catálogo
          </button>
        </div>
      </header>

      {/* ====== HERO (tu promo/carrusel lo dejo SIN CAMBIOS) ====== */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Texto izquierda */}
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[var(--accent)] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
              Nueva temporada
            </div>

            <h1 className="mt-3 text-4xl md:text-5xl font-black leading-tight">
              PROMOS SEMANALES <span className="text-[var(--accent)]">AL MEJOR ESTILO</span>
            </h1>

            <p className="mt-4 text-neutral-800 max-w-prose">
              <span className="mr-1">🔥</span>
              <b>OFERTA SEMANAL:</b> AF1 Urban Red a $100.000 (antes $120.000) ·
              <b> contraentrega y envío nacional.</b> Stock limitado.
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              (Agrega los modelos en promo en el arreglo de promos)
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="px-5 py-3 rounded-2xl font-semibold text-white bg-[var(--brand)] hover:opacity-90">
                Comprar ahora
              </button>
              <button className="px-5 py-3 rounded-2xl font-semibold border border-neutral-300 hover:border-[var(--brand)]">
                Ver novedades
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-800">
              <span>✔️ Garantía</span>
              <span>✔️ Pago seguro</span>
              <span>✔️ Soporte por WhatsApp</span>
            </div>
          </div>

          {/* Carrusel/Imagen PROMO (tu bloque actual) */}
          <div className="relative">
            <div className="w-full mx-auto max-w-md sm:max-w-lg lg:max-w-xl rounded-3xl overflow-hidden bg-white p-0.5 sm:p-1 shadow-[0_6px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5 border border-neutral-200">
              <div className="w-full h-72 sm:h-80 md:h-96 lg:h-[420px]">
                <img
                  src="/products/promo-semanal-1.png"
                  alt="Oferta semanal URBANSHOES"
                  className="w-full h-full object-contain block"
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width:640px) 85vw, (max-width:1024px) 50vw, 640px"
                />
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 bg-white px-3 py-2 rounded-xl shadow border border-neutral-200 text-xs sm:text-sm">
              <strong>URBANSHOES</strong> — edición limitada
            </div>
          </div>
        </div>
      </section>

      {/* Filtros rápidos */}
      <section className="border-y bg-white/70">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(1); }}
              className={`whitespace-nowrap px-4 py-2 rounded-2xl border text-sm transition ${
                category === c
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "hover:border-neutral-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* GRID de productos */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-black">Productos</h2>
          <div className="text-sm text-neutral-500">
            {loadingList ? "Cargando..." : `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""}`}
          </div>
        </div>

        {/* Skeletons mientras carga */}
        {loadingList ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border bg-white">
                <div className="aspect-square bg-neutral-200" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="h-3 bg-neutral-200 rounded w-1/2" />
                  <div className="h-6 bg-neutral-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visible.map((p) => {
                const src = p.img?.startsWith("http")
                  ? p.img
                  : `/products/${p.img}`;
                return (
                  <article
                    key={p.id}
                    className="group rounded-2xl overflow-hidden border bg-white hover:shadow-lg transition"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={src}
                        alt={p.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition"
                        loading="lazy"
                        sizes="(max-width:768px) 50vw, (max-width:1024px) 25vw, 20vw"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
                          {p.name}
                        </h3>
                        {p.tag && (
                          <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--accent-2)]/10 text-[var(--accent-2)] font-bold uppercase">
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap">
                        {Array.isArray(p.category) ? p.category.join(" • ") : ""}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-lg font-black">{formatCOP(p.price)}</div>
                        <button className="px-3 py-2 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90">
                          Agregar
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Paginar / Cargar más */}
            {canLoadMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setPage((n) => n + 1)}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:border-[var(--brand)]"
                >
                  Cargar más
                </button>
              </div>
            )}

            {/* Sin resultados */}
            {!loadingList && filtered.length === 0 && (
              <div className="text-center text-neutral-500 mt-10">
                No encontramos productos que coincidan con tu búsqueda.
              </div>
            )}
          </>
        )}

        {/* Callouts (igual que antes) */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[var(--brand)] to-[#1f1f1f] text-white">
            <h3 className="text-2xl font-black">Colección 9060</h3>
            <p className="mt-2 text-sm opacity-90 max-w-prose">
              Silueta icónica con acabados premium. Descubre colores limitados y stock fresco.
            </p>
            <button className="mt-4 px-4 py-2 rounded-xl bg-white text-[var(--brand)] font-semibold hover:opacity-90">
              Ver colección
            </button>
          </div>
          <div className="rounded-3xl p-6 border">
            <h3 className="text-2xl font-black">Pagos y envíos</h3>
            <ul className="mt-2 text-sm text-neutral-600 space-y-1 list-disc list-inside">
              <li>Pago contraentrega y PSE</li>
              <li>Envío nacional 24–72h</li>
              <li>Cambios flexibles dentro de 30 días</li>
            </ul>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[var(--brand)] grid place-items-center overflow-hidden">
                <img src="/LOGO MARCA INSTAGRAM.png" alt="URBANSHOES" className="h-full w-full object-cover" />
              </div>
              <span className="font-black">URBANSHOES</span>
            </div>
            <p className="mt-3 text-neutral-500">Zapatillas urbanas y deportivas — Colombia.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Categorías</h4>
            <div className="space-y-1 text-neutral-600">
              {categories.slice(1).map((c) => (
                <button key={c} onClick={() => { setCategory(c); setPage(1); }} className="block hover:text-[var(--brand)]">
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2">Soporte</h4>
            <ul className="space-y-1 text-neutral-600">
              <li>Preguntas frecuentes</li>
              <li>Cambios y devoluciones</li>
              <li>Envíos y pagos</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Contáctanos</h4>
            <p className="text-neutral-600">
              WhatsApp: +57 300 000 0000 <br />
              Instagram: @urbanshoes.co
            </p>
            <button className="mt-3 px-4 py-2 rounded-xl bg-[var(--brand)] text-white font-semibold">
              Escríbenos
            </button>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} URBANSHOES — Todos los derechos reservados.
        </div>
      </footer>

      {/* admin */}
      <Link
        to="/login"
        aria-label="acceso administrador"
        className="fixed bottom-4 right-4 px-3 py-2 rounded-full text-xs bg-black/60 text-white hover:bg-black/80 backdrop-blur shadow"
      >
        admin
      </Link>
    </div>
  );
}

// Util
function formatCOP(n) {
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${Number(n).toLocaleString("es-CO")}`;
  }
}
