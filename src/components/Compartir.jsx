import { useState } from "react";
import { mensajeWhatsapp, evento } from "../config/evento";

export default function Compartir() {
  const [copiado, setCopiado] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  function abrirWhatsapp() {
    const texto = encodeURIComponent(mensajeWhatsapp(url));
    window.open(`https://wa.me/?text=${texto}`, "_blank");
  }

  async function compartir() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "¡Estás invitado! 🎉",
          text: mensajeWhatsapp(url),
          url,
        });
      } catch {
        // el usuario canceló el share, no hacemos nada
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    }
  }

  return (
    <section className="seccion entrada">
      <h2 className="titulo-seccion">💬 Compartir por WhatsApp</h2>
      <div className="tarjeta compartir-acciones">
        <button className="boton boton-principal boton-ancho" onClick={abrirWhatsapp}>
          💬 Enviar por WhatsApp
        </button>
        <button className="boton boton-secundario boton-ancho" onClick={compartir}>
          📤 Compartir invitación
        </button>
        {copiado && <p className="aviso-copiado">¡Enlace copiado! 🎉</p>}
        <a
          className="boton boton-secundario boton-ancho"
          href={`https://wa.me/${evento.whatsappContacto}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 ¿Dudas? Escribinos
        </a>
      </div>
    </section>
  );
}
