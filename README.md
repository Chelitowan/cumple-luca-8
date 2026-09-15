# 🎉 Invitación digital — Cumpleaños de Luca (8 años, temática Los Compa)

Invitación web para compartir por WhatsApp. Un solo enlace para todos los
invitados, con formulario simple (nombre + asistencia), guardado en
Supabase, y un panel privado en `/admin` para ver quién confirmó.

## ¿Qué hay en este proyecto?

```
luca-cumple8/
├── src/
│   ├── config/evento.js       ← Acá cambiás fecha, hora, lugar, nombre
│   ├── lib/supabaseClient.js  ← Conexión con Supabase
│   ├── hooks/useConfirmarInvitado.js
│   ├── components/            ← Portada, Información, Ubicación, Confirmación, Compartir
│   ├── pages/                 ← Home.jsx (invitación) y Admin.jsx (panel privado)
│   └── styles/                ← CSS
├── supabase/schema.sql        ← Todo el SQL para crear la base de datos
├── .env.example                ← Plantilla de variables de entorno
└── vercel.json
```

## Antes de empezar

Necesitás:
- Node.js instalado (versión 18 o más nueva).
- Una cuenta gratuita en [supabase.com](https://supabase.com).
- Una cuenta gratuita en [vercel.com](https://vercel.com) (para publicarlo).

---

## Paso 1 — Crear la cuenta y el proyecto de Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta (podés usar tu cuenta de GitHub o Google).
2. Hacé clic en **"New project"**.
3. Elegí un nombre, por ejemplo `cumple-luca`, y una contraseña para la base de datos (guardala, no hace falta recordarla de memoria porque no la vas a volver a usar a mano).
4. Elegí la región más cercana (por ejemplo, `South America (São Paulo)`).
5. Esperá 1-2 minutos a que el proyecto se termine de crear.

## Paso 2 — Crear la tabla `invitados`

1. En el menú izquierdo, andá a **SQL Editor**.
2. Hacé clic en **"New query"**.
3. Abrí el archivo `supabase/schema.sql` de este proyecto, copiá **todo** su contenido y pegalo en el editor.
4. Hacé clic en **"Run"**.

Esto crea:
- La tabla `invitados` (id, nombre, asistencia, fecha_confirmacion).
- Un índice que evita nombres duplicados sin importar mayúsculas/minúsculas.
- Las políticas de seguridad (RLS).
- Una función `registrar_invitado` que es la única forma en que la invitación puede guardar una respuesta.

## Paso 3 — Las políticas de seguridad ya quedaron configuradas

El script del Paso 2 ya deja todo configurado para que:
- ✅ Cualquier visitante pueda **registrar su propia respuesta** (a través de la función, no escribiendo directo en la tabla).
- ❌ Nadie pueda **leer la lista completa de invitados** sin haber iniciado sesión como admin.
- ✅ Solo el admin (una vez logueado) pueda ver la tabla completa y borrar registros.

No tenés que tocar nada más acá.

## Paso 4 — Crear el usuario administrador

1. En Supabase, andá a **Authentication → Users**.
2. Hacé clic en **"Add user" → "Create new user"**.
3. Cargá tu email y una contraseña. Marcá la opción de "Auto Confirm User" si aparece (así no hace falta confirmar por mail).
4. Guardá ese email y contraseña: son los que vas a usar para entrar a `/admin`.

## Paso 5 — Obtener las claves del proyecto

1. En Supabase, andá a **Settings → API**.
2. Copiá dos valores:
   - **Project URL**
   - **anon public key**

Estas dos claves son **públicas por diseño** (van a viajar al navegador de cada visitante), por eso la seguridad real no depende de esconderlas, sino de las políticas RLS que ya configuraste en el Paso 2.

## Paso 6 — Configurar las variables de entorno

1. En la carpeta del proyecto, copiá el archivo `.env.example` y renombralo a `.env`.
2. Completalo con los valores del Paso 5:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
```

El archivo `.env` nunca se sube a GitHub (ya está en `.gitignore`).

## Paso 7 — Instalar las dependencias

En una terminal, parado dentro de la carpeta del proyecto:

```bash
npm install
```

## Paso 8 — Personalizar los datos del cumpleaños

Abrí `src/config/evento.js` y revisá que los datos sean correctos (nombre, fecha, hora, lugar). Si algo cambia, solo modificás este archivo y se actualiza en toda la invitación.

## Paso 9 — Probar el proyecto en tu computadora

```bash
npm run dev
```

Se va a abrir una dirección como `http://localhost:5173`. Ahí ves la invitación. Para ver el panel admin, entrá a `http://localhost:5173/admin` y logueate con el usuario del Paso 4.

Probá:
- Confirmar una asistencia con un nombre de prueba.
- Confirmar el mismo nombre otra vez (en mayúsculas, por ejemplo) → debería avisar que ya está registrado.
- Entrar a `/admin` y ver el registro, buscarlo, filtrarlo y borrarlo.

## Paso 10 — Publicar en Vercel (gratis)

1. Subí el proyecto a un repositorio de GitHub (podés usar GitHub Desktop si no manejás git por terminal).
2. Entrá a [vercel.com](https://vercel.com) y hacé clic en **"Add New... → Project"**.
3. Elegí tu repositorio.
4. En **"Environment Variables"**, cargá las mismas dos variables del Paso 6 (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`).
5. Hacé clic en **"Deploy"**.
6. En un par de minutos vas a tener una URL pública, por ejemplo `https://cumple-luca.vercel.app`.

## Paso 11 — Compartir por WhatsApp

Abrí la URL pública desde el celular, tocá **"💬 Compartir por WhatsApp"** al final de la invitación: se abre WhatsApp con el mensaje y el link ya armados, listo para reenviar al grupo del curso o a cada familia.

---

## Preguntas frecuentes

**¿Puedo cambiar los colores o el texto?**
Sí. Los textos principales están en los componentes dentro de `src/components/` y `src/pages/`, y los colores en `src/styles/variables.css`.

**¿Qué pasa si alguien intenta confirmar dos veces?**
La función `registrar_invitado` en Supabase revisa (sin importar mayúsculas/minúsculas) si ese nombre ya está guardado, y si es así devuelve un error que la invitación muestra como: *"Ya tenemos registrada una respuesta con ese nombre."*

**¿La lista de invitados es pública?**
No. Nadie puede leer la tabla `invitados` sin haber iniciado sesión como admin (Paso 4). Los visitantes solo pueden registrar su propia respuesta.

**¿Cómo agrego más administradores?**
Repetí el Paso 4 con otro email. Cualquier usuario logueado puede ver y borrar invitados.
