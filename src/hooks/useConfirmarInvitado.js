import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Este hook llama a una función (RPC) de Supabase en vez de insertar
// directamente en la tabla. ¿Por qué? Porque así podemos revisar si el
// nombre ya está registrado (sin distinguir mayúsculas/minúsculas) sin
// tener que darle permiso al público para leer toda la tabla de invitados.
// La función vive en la base de datos (ver supabase/schema.sql).
export function useConfirmarInvitado() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  async function confirmar(nombre, asistencia) {
    setEnviando(true);
    setError(null);

    const nombreLimpio = nombre.trim().replace(/\s+/g, " ");

    const { data, error: rpcError } = await supabase.rpc(
      "registrar_invitado",
      {
        nombre_input: nombreLimpio,
        asistencia_input: asistencia,
      }
    );

    setEnviando(false);

    if (rpcError) {
      if (rpcError.message?.includes("DUPLICADO")) {
        setError("Ya tenemos registrada una respuesta con ese nombre.");
      } else {
        setError("Hubo un problema al guardar tu respuesta. Probá de nuevo.");
      }
      return { ok: false };
    }

    return { ok: true, data };
  }

  return { confirmar, enviando, error, setError };
}
