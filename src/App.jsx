import Home from "./pages/Home";
import Admin from "./pages/Admin";

// Enrutado bien simple: no usamos una librería de rutas porque solo hay
// dos páginas (la invitación y el panel admin). Si el proyecto creciera,
// ahí sí conviene sumar react-router.
export default function App() {
  const esAdmin = window.location.pathname.startsWith("/admin");
  return esAdmin ? <Admin /> : <Home />;
}
