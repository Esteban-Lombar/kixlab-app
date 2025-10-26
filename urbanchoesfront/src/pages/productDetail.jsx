import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/products.json")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((p) => p.id === id);
        setProduct(found);

        // 🔍 Agrupa variantes por modelo (últimas palabras)
        if (found) {
          const parts = found.name.trim().split(" ");
          const modelBase = parts.slice(-3).join(" ").toUpperCase();
          const variants = data.filter((p) => {
            const target = p.name.trim().toUpperCase();
            return (
              p.id !== found.id &&
              (target.endsWith(modelBase) || target.includes(modelBase))
            );
          });
          setRelated(variants);
        }
      })
      .catch((e) => {
        console.error(e);
        setError("Error cargando el producto.");
      });
  }, [id]);

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!product) return <div className="p-8 text-gray-500">Cargando...</div>;

  return (
    <div
      className="min-h-screen"
      style={{
        "--brand": "#0d0d0d",
        "--accent": "#e11d48",
        "--accent-2": "#f43f5e",
        background: "#f8fafc",
        color: "#111",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link
          to="/"
          className="text-[var(--accent)] text-sm font-medium hover:underline"
        >
          ← Volver
        </Link>

        <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
          {/* Imagen principal */}
          <div>
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto rounded-2xl border object-cover"
            />

            {/* Variantes / colores */}
            {related.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {related.map((v) => (
                  <Link key={v.id} to={`/producto/${v.id}`}>
                    <img
                      src={v.img}
                      alt={v.name}
                      className="h-20 w-20 object-cover rounded-lg border hover:ring-2 hover:ring-[var(--accent)] transition"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Detalles del producto */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h1 className="text-xl font-black">{product.name}</h1>
            <div className="text-sm text-neutral-500 mt-1">
              {(product.category || []).join(" • ")}
            </div>
            <div className="text-2xl font-extrabold text-[var(--accent)] mt-2">
              {formatCOP(product.price)}
            </div>

            {product.tag && (
              <span className="inline-block mt-2 text-[11px] px-2 py-0.5 rounded-md bg-[var(--accent-2)]/90 text-white font-semibold">
                {product.tag}
              </span>
            )}

            <p className="mt-4 text-sm text-neutral-700 leading-relaxed">
              Zapatillas {product.name}, calidad {product.tag || "1.1 Premium"},
              ideales para {(product.category || []).join(", ").toLowerCase()}.
            </p>

            <ul className="mt-4 text-sm text-neutral-600 list-disc list-inside space-y-1">
              <li>Garantía de satisfacción</li>
              <li>Pago contraentrega disponible</li>
              <li>Envíos a toda Colombia 🇨🇴</li>
            </ul>

            {/* Botón de WhatsApp funcional */}
            <a
              href={`https://wa.me/573180127867?text=${encodeURIComponent(
                `👟 ¡Hola! Estoy interesado en las ${product.name} que vi en KIXLAB.

💸 *Precio:* ${formatCOP(product.price)}
📦 *Categorías:* ${(product.category || []).join(" • ")}

🖼️ Mira la imagen: ${window.location.origin}${product.img}

¿Siguen disponibles?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full text-center px-4 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* util */
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
