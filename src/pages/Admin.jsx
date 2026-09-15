import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AdminLogin from "./AdminLogin";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);
  const [invitados, setInvitados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos"); // todos | si | no

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCargandoSesion(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) cargarInvitados();
  }, [session]);

  async function cargarInvitados() {
    const { data, error } = await supabase
      .from("invitados")
      .select("*")
      .order("fecha_confirmacion", { ascending: false });

    if (!error) setInvitados(data);
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar este registro?")) return;
    await supabase.from("invitados").delete().eq("id", id);
    cargarInvitados();
  }

  async function cerrarSesion() {
    await supabase.auth.signOut();
  }

  if (cargandoSesion) return null;
  if (!session) return <AdminLogin onLogin={setSession} />;

  const confirmados = invitados.filter((i) => i.asistencia).length;
  const noAsisten = invitados.filter((i) => !i.asistencia).length;

  const visibles = invitados
    .filter((i) => {
      if (filtro === "si") return i.asistencia;
      if (filtro === "no") return !i.asistencia;
      return true;
    })
    .filter((i) => i.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="admin-contenedor">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="titulo-seccion" style={{ textAlign: "left" }}>🎉 Invitados</h1>
        <button className="boton boton-secundario" onClick={cerrarSesion}>
          Salir
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat-numero">{confirmados}</div>
          <div>✅ Confirmados</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-numero">{noAsisten}</div>
          <div>❌ No asisten</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-numero">{invitados.length}</div>
          <div>👥 Total</div>
        </div>
      </div>

      <input
        className="campo-input"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <div className="admin-filtros">
        {[
          { valor: "todos", etiqueta: "Todos" },
          { valor: "si", etiqueta: "Confirmados" },
          { valor: "no", etiqueta: "No asisten" },
        ].map((f) => (
          <button
            key={f.valor}
            className={`admin-filtro ${filtro === f.valor ? "activo" : ""}`}
            onClick={() => setFiltro(f.valor)}
          >
            {f.etiqueta}
          </button>
        ))}
      </div>

      <table className="admin-tabla">
        <thead>
          <tr>
            <th>Niño</th>
            <th>Asistencia</th>
            <th>Fecha</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {visibles.map((i) => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.asistencia ? "✅ Sí" : "❌ No"}</td>
              <td>{new Date(i.fecha_confirmacion).toLocaleString("es-AR")}</td>
              <td>
                <button className="admin-filtro" onClick={() => eliminar(i.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
