import { evento } from "../config/evento";

export default function Informacion() {
  return (
    <section className="seccion entrada">
      <h2 className="titulo-seccion">🎂 ¡Te esperamos!</h2>
      <div className="tarjeta info-grid">
        <div className="info-item">
          <span className="info-icono">📅</span>
          <div>
            <div className="info-titulo">Fecha</div>
            <div className="info-detalle">{evento.fecha}</div>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icono">🕑</span>
          <div>
            <div className="info-titulo">Horario</div>
            <div className="info-detalle">De {evento.hora}</div>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icono">📍</span>
          <div>
            <div className="info-titulo">Lugar</div>
            <div className="info-detalle">{evento.lugar}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
