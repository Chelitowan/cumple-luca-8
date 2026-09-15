import { useMemo } from "react";

const COLORES = ["#FF5C8A", "#FFC93C", "#1FB6D6", "#7C5CFF", "#B7E23A"];

// Genera piezas de confeti que caen desde arriba de la pantalla.
// Se usa solo un momento puntual (al confirmar asistencia), no de forma
// permanente, y respeta prefers-reduced-motion vía CSS.
export default function Confeti({ cantidad = 40 }) {
  const piezas = useMemo(() => {
    return Array.from({ length: cantidad }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORES[i % COLORES.length],
      duracion: 2.5 + Math.random() * 1.5,
      demora: Math.random() * 0.6,
      ancho: 6 + Math.random() * 6,
      alto: 10 + Math.random() * 8,
    }));
  }, [cantidad]);

  return (
    <div aria-hidden="true">
      {piezas.map((p) => (
        <span
          key={p.id}
          className="confeti-pieza"
          style={{
            left: `${p.left}%`,
            width: p.ancho,
            height: p.alto,
            background: p.color,
            animationDuration: `${p.duracion}s`,
            animationDelay: `${p.demora}s`,
          }}
        />
      ))}
    </div>
  );
}
