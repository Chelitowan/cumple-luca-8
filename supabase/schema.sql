-- ============================================================
-- Esquema para la invitación de cumpleaños de Luca
-- Copiá y pegá todo este archivo en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- 1) Tabla de invitados
create table if not exists public.invitados (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  asistencia boolean not null,
  fecha_confirmacion timestamptz not null default now()
);

-- Índice único case-insensitive: evita que "Juan Pérez", "juan pérez"
-- y "JUAN PÉREZ" se guarden como invitados distintos.
create unique index if not exists invitados_nombre_unico
  on public.invitados (lower(nombre));

-- 2) Activar seguridad a nivel de fila (RLS)
alter table public.invitados enable row level security;

-- Importante: NO creamos una política de "select" para el público.
-- Así, aunque alguien tenga la clave anon (que es pública por diseño),
-- no puede leer la tabla completa de invitados desde el navegador.

-- Solo usuarios autenticados (el admin) pueden leer la lista completa.
create policy "admin_puede_leer"
  on public.invitados for select
  to authenticated
  using (true);

-- Solo usuarios autenticados (el admin) pueden borrar registros.
create policy "admin_puede_borrar"
  on public.invitados for delete
  to authenticated
  using (true);

-- Nota: no hace falta una política de "insert" para el público, porque
-- los invitados no insertan directo en la tabla: usan la función de
-- abajo, que corre con permisos elevados (security definer) y por eso
-- puede insertar sin que la tabla quede abierta a cualquiera.

-- 3) Función para registrar un invitado evitando duplicados
-- Corre con los permisos de quien la creó (normalmente el dueño del
-- proyecto), por eso puede saltear el RLS de forma controlada: es la
-- única puerta de entrada para escribir datos desde la invitación.
create or replace function public.registrar_invitado(
  nombre_input text,
  asistencia_input boolean
)
returns public.invitados
language plpgsql
security definer
set search_path = public
as $$
declare
  nuevo_invitado public.invitados;
begin
  if nombre_input is null or trim(nombre_input) = '' then
    raise exception 'NOMBRE_VACIO';
  end if;

  if exists (
    select 1 from public.invitados
    where lower(nombre) = lower(trim(nombre_input))
  ) then
    raise exception 'DUPLICADO: Ya tenemos registrada una respuesta con ese nombre.';
  end if;

  insert into public.invitados (nombre, asistencia)
  values (trim(nombre_input), asistencia_input)
  returning * into nuevo_invitado;

  return nuevo_invitado;
end;
$$;

-- Cualquier visitante (rol "anon") puede ejecutar la función para
-- registrar su propia respuesta, pero sigue sin poder leer ni listar
-- la tabla completa.
grant execute on function public.registrar_invitado(text, boolean) to anon;
grant execute on function public.registrar_invitado(text, boolean) to authenticated;
