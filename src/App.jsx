import { NavLink, Routes, Route } from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";
import CrearMascotaPage from "./pages/CrearMascotaPage";
import MascotaDetallePage from "./pages/MascotaDetallePage";

function App() {
  return (
    <div className="app">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
          <div className="container">
            <NavLink className="navbar-brand fw-bold text-dark" to="/">
              🐾 MascotasApp
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menuPrincipal"
              aria-controls="menuPrincipal"
              aria-expanded="false"
              aria-label="Abrir menú"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="menuPrincipal"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link enlace-activo fw-bold"
                        : "nav-link text-dark"
                    }
                  >
                    Mascotas
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/crear"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link enlace-activo fw-bold"
                        : "nav-link text-dark"
                    }
                  >
                    Registrar Mascota
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="container py-4 contenido-principal">
        <Routes>
          <Route path="/" element={<MascotasPage />} />
          <Route path="/crear" element={<CrearMascotaPage />} />
          <Route
            path="/mascotas/:id"
            element={<MascotaDetallePage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;