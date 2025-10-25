// src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "573180127867"; // 🔁 reemplaza por tu número real (sin el +)
  const message = encodeURIComponent("👋 ¡Hola! Quiero más información sobre KIXLAB.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
      style={{ width: "60px", height: "60px" }}
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
