import { createClient } from "@supabase/supabase-js";

// Estas variables se cargan desde el archivo .env (nunca se escriben acá
// directamente los valores reales, así no quedan credenciales expuestas
// en el código fuente).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Faltan las variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Revisá tu archivo .env"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
