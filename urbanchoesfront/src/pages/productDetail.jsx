import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === id);
        setProduct(found);

        // 🔍 Agrupa variantes por modelo (últimas palabras, no la marca)
if (found) {
  // Divide el nombre por espacios
  const parts = found.name.trim().split(" ");

  // Toma las últimas 2 o 3 palabras, que suelen ser el modelo base (ej. "ZOOM FLY 6")
  const modelBase = parts.slice(-3).join(" ").toUpperCase();

  // Busca en la lista los productos que terminan igual (ignorando marca)
  const variants = data.filter((p) => {
    const target = p.name.trim().toUpperCase();
    return (
      p.id !== found.id &&
      (target.endsWith(modelBase) || target.includes(modelBase))
    );
  });

  setRelated(variants);
}

      });
  }, [id]);

  if (!product)
    return (
      <div className="p-10 text-center text-gray-500">Cargando producto...</div>
    );

  return (
    <div
      className="min-h-screen bg-[#f8fafc] text-gray-900"
      style={{
        "--brand": "#0d0d0d",
        "--accent": "#e11d48",
        "--accent-2": "#f43f5e",
      }}
    >
      <header className="p-4 bg-white border-b sticky top-0 z-40 flex justify-between items-center">
        <Link to="/" className="text-[var(--accent)] font-bold text-lg">
          ← Volver
        </Link>
        <h1 className="font-black text-xl">{product.name}</h1>
      </header>

      {/* Imagen principal */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="relative rounded-2xl overflow-hidden bg-white border shadow">
          <img
            src={product.img}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>

        {/* Carrusel de variantes */}
        {related.length > 0 && (
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {related.map((r) => (
              <Link key={r.id} to={`/producto/${r.id}`}>
                <img
                  src={r.img}
                  alt={r.name}
                  className="h-24 w-24 rounded-xl border hover:ring-2 ring-[var(--accent)] transition"
                />
              </Link>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="mt-6 bg-white rounded-2xl p-5 border shadow-sm">
          <h2 className="text-2xl font-black mb-1">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-3">
            {(product.category || []).join(" • ")}
          </p>
          <div className="text-3xl font-black text-[var(--accent)] mb-4">
            {formatCOP(product.price)}
          </div>

          {product.tag && (
            <span className="inline-block mb-3 px-2 py-1 text-xs font-semibold bg-[var(--accent-2)]/90 text-white rounded-md">
              {product.tag}
            </span>
          )}

          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Zapatillas {product.name}, calidad {product.tag}, ideales para{" "}
            {(product.category || []).join(", ").toLowerCase()}.
          </p>

          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Garantía de satisfacción</li>
            <li>Pago contraentrega disponible</li>
            <li>Envíos a toda Colombia 🇨🇴</li>
          </ul>

          <button className="mt-5 w-full py-3 rounded-xl font-bold text-white bg-[var(--accent)] hover:opacity-90">
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

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
