import { useState } from "react";
import { useConfirmarInvitado } from "../hooks/useConfirmarInvitado";
import Confeti from "./Confeti";
import { evento } from "../config/evento";

export default function Confirmacion() {
  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState(null); // true | false | null
  const [resultado, setResultado] = useState(null); // "si" | "no" | null
  const { confirmar, enviando, error, setError } = useConfirmarInvitado();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("Escribí tu nombre y apellido.");
      return;
    }
    if (asistencia === null) {
      setError("Elegí si vas a venir o no.");
      return;
    }

    const res = await confirmar(nombre, asistencia);
    if (res.ok) {
      setResultado(asistencia ? "si" : "no");
    }
  }

  if (resultado === "si") {
    return (
      <section id="confirmacion" className="seccion resultado entrada">
        <Confeti />
        <div className="resultado-emoji">🎉</div>
        <h2 className="titulo-seccion">¡Genial!</h2>
        <p className="info-detalle">¡Gracias, {nombre.trim()}!</p>
        <p>
          {evento.nombrePila} te espera para festejar sus {evento.edad} años.
          🎂🎈
        </p>
      </section>
    );
  }

  if (resultado === "no") {
    return (
      <section id="confirmacion" className="seccion resultado entrada">
        <div className="resultado-emoji">❤️</div>
        <h2 className="titulo-seccion">¡Gracias por avisar!</h2>
        <p>¡Esperamos poder festejar juntos otra vez!</p>
      </section>
    );
  }

  return (
    <section id="confirmacion" className="seccion entrada">
      <h2 className="titulo-seccion">🎉 ¿Venís a festejar con {evento.nombrePila}?</h2>
      <div className="tarjeta">
        <p style={{ textAlign: "center", fontWeight: 700 }}>
          Confirmá tu asistencia.
        </p>
        <form className="form-confirmacion" onSubmit={handleSubmit}>
          <div>
            <label className="campo-label" htmlFor="nombre">
              Tu nombre y apellido
            </label>
            <input
              id="nombre"
              className="campo-input"
              type="text"
              placeholder="Ej.: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <span className="campo-label">¿Vas a venir?</span>
            <div className="opciones-asistencia">
              <button
                type="button"
                className={`boton boton-si ${asistencia === true ? "boton-elegido" : ""}`}
                onClick={() => setAsistencia(true)}
              >
                ✅ ¡Sí, voy!
              </button>
              <button
                type="button"
                className={`boton boton-no ${asistencia === false ? "boton-elegido" : ""}`}
                onClick={() => setAsistencia(false)}
              >
                ❌ No puedo ir
              </button>
            </div>
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button
            type="submit"
            className="boton boton-principal boton-ancho"
            disabled={enviando}
          >
            {enviando ? "Enviando..." : "Confirmar"}
          </button>
        </form>
      </div>
    </section>
  );
}
