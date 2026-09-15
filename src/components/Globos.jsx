// Globos decorativos que flotan suavemente. Son puramente visuales
// (no interactúan con nada), por eso van con aria-hidden.
const POSICIONES = [
  { emoji: "🎈", top: "8%", left: "10%", delay: "0s" },
  { emoji: "🎈", top: "18%", left: "78%", delay: "1.2s" },
  { emoji: "⭐", top: "30%", left: "20%", delay: "2s" },
  { emoji: "🎈", top: "60%", left: "85%", delay: "0.6s" },
  { emoji: "⭐", top: "70%", left: "8%", delay: "1.6s" },
];

export default function Globos() {
  return (
    <div className="globos-decorativos" aria-hidden="true">
      {POSICIONES.map((g, i) => (
        <span
          key={i}
          className="globo"
          style={{ top: g.top, left: g.left, animationDelay: g.delay }}
        >
          {g.emoji}
        </span>
      ))}
    </div>
  );
}
