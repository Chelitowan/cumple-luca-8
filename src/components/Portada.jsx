import Globos from "./Globos";
import { evento } from "../config/evento";

export default function Portada() {
  function irAlFormulario() {
    document
      .getElementById("confirmacion")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="portada">
      <Globos />
      <p className="portada-eyebrow">🎉 ¡{evento.nombrePila} cumple {evento.edad} años! 🎉</p>
      <img
        src="/images/luca.jpg"
        alt={evento.nombrePila}
        className="foto-luca"
        onError={(e) => {
          e.target.style.display = "none";
          document.getElementById("ilustracion-fallback").style.display = "block";
        }}
      />
      <div id="ilustracion-fallback" className="ilustracion-principal" style={{ display: "none" }}>
        ⚡🎮⚡
      </div>
      <span className="portada-nombre">{evento.nombre}</span>
      <button className="boton boton-principal" onClick={irAlFormulario}>
        🎉 ¡QUIERO IR!
      </button>
    </section>
  );
}
