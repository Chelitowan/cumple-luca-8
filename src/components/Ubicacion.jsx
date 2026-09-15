import { evento } from "../config/evento";

export default function Ubicacion() {
  const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    evento.direccion
  )}&output=embed`;

  return (
    <section className="seccion entrada">
      <h2 className="titulo-seccion">📍 ¿Dónde es?</h2>
      <div className="tarjeta" style={{ textAlign: "center" }}>
        <p className="info-detalle">{evento.lugar}</p>
        <a
          className="boton boton-secundario boton-ancho"
          href={evento.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          📍 Ver ubicación
        </a>
        <iframe
          className="mapa-embed"
          title="Mapa del lugar del evento"
          src={mapaSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
