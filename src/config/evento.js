// Archivo central de configuración del cumpleaños.
// Cambiá acá los datos y se actualizan en toda la invitación automáticamente.

export const evento = {
  nombre: "Luca G. Ferreyra",
  nombrePila: "Luca",
  edad: 8,
  tematica: "Pokémon",
  fecha: "20 de septiembre de 2026",
  hora: "16:00 a 18:30 hs",
  lugar: "Av. Entre Ríos 1260, CABA",
  direccion: "Av. Entre Ríos 1260, Ciudad Autónoma de Buenos Aires",
  // Número para que los invitados puedan escribir directamente por WhatsApp
  // ante cualquier duda. Formato: código de país + número, sin espacios ni signos.
  whatsappContacto: "5491158569290",
  // Si en algún momento tenés latitud/longitud reales, podés cargarlas acá
  // y usarlas en vez de la búsqueda por texto. Por ahora se arma el link
  // de Google Maps buscando la dirección de texto (no se inventan coordenadas).
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Av. Entre Ríos 1260, Ciudad Autónoma de Buenos Aires"),
};

export const mensajeWhatsapp = (urlInvitacion) => `🎉 ¡Estás invitado al cumple de ${evento.nombrePila}! 🎂

${evento.nombre} cumple ${evento.edad} años y queremos festejarlo con vos.

🎈 Temática: ${evento.tematica}

📅 ${evento.fecha}
🕑 De ${evento.hora}
📍 ${evento.direccion}

Confirmá tu asistencia acá:

${urlInvitacion}

¡Te esperamos! 🎉`;
