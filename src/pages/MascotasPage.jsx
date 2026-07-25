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

        return () => {
            activo = false;
        };
    }, []);

    return (
        <main>
            <div className="text-center mb-4">
                <h1 className="mb-2">Mascotas registradas</h1>
            </div>

            {error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : (
                <MascotaList lista={mascotas} />
            )}
        </main>
    );
}

export default MascotasPage;