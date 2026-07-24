import { useEffect, useState } from "react";
import MascotaList from "../components/MascotaList";
import api from "../api/api";

function MascotasPage() {
    // Acá guardo la lista de mascotas que viene de la API
    const [mascotas, setMascotas] = useState([]);

    // Acá guardo un mensaje si ocurre algún error
    const [error, setError] = useState("");

    // Se ejecuta una vez cuando se carga la página
    useEffect(() => {
        let activo = true;

        // Hago un GET para obtener todas las mascotas
        api.get("mascotas/")
            .then(response => {
                // Solo actualizo los datos si sigo dentro de la página
                if (activo && response.status === 200) {
                    setMascotas(response.data);
                }
            })
            .catch(error => {
                console.log(error.response?.status);
                console.log(error.response?.data);

                if (!activo) {
                    return;
                }

                if (error.response?.status === 404) {
                    setError("No se encontraron las mascotas");
                } else {
                    setError("Error al cargar las mascotas");
                }
            });

        // Evita actualizar el estado si salgo de la página
        return () => {
            activo = false;
        };
    }, []);

    return (
        <main>
            <h1>Listado de Mascotas</h1>

            {/* Si existe un error lo muestro, si no envío la lista por props */}
            {error ? (
                <p>{error}</p>
            ) : (
                <MascotaList lista={mascotas} />
            )}
        </main>
    );
}

export default MascotasPage;