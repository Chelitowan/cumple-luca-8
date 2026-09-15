import Portada from "../components/Portada";
import Informacion from "../components/Informacion";
import Ubicacion from "../components/Ubicacion";
import Confirmacion from "../components/Confirmacion";
import Compartir from "../components/Compartir";
import { evento } from "../config/evento";

export default function Home() {
  return (
    <>
      <Portada />
      <Informacion />
      <Ubicacion />
      <Confirmacion />
      <Compartir />
      <footer className="footer">
        Invitación de {evento.nombrePila} 🎈 {evento.tematica}
      </footer>
    </>
  );
}
