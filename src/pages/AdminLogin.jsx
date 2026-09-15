import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setCargando(false);

    if (loginError) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    onLogin(data.session);
  }

  return (
    <div className="admin-login">
      <div className="tarjeta">
        <h2 className="titulo-seccion">🔒 Ingreso admin</h2>
        <form className="form-confirmacion" onSubmit={handleSubmit}>
          <div>
            <label className="campo-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="campo-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="campo-label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="campo-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="mensaje-error">{error}</p>}
          <button className="boton boton-principal boton-ancho" disabled={cargando}>
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
