import { NavLink, Routes, Route } from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";
import CrearMascotaPage from "./pages/CrearMascotaPage";
import MascotaDetallePage from "./pages/MascotaDetallePage";

function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/"> Mascotas </NavLink>
            </li>

            <li>
              <NavLink to="/crear">Registrar Mascota</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<MascotasPage/>} />
          <Route path="/crear" element={<CrearMascotaPage/>} />
          <Route path="/mascotas/:id" element={<MascotaDetallePage/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
