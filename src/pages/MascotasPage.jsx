import { useEffect, useState } from "react";
import MascotaList from "../components/MascotaList";
import api from "../api/api";

function MascotasPage() {

    // aca voy a guardar la lista de mascotas que viene de la API
    const [mascotas, setMascotas] = useState([]);
    // aca guardo un mensaje si ocurre algún error
    const [error, setError] = useState("");
    // funcion para traer las mascotas desde la API
    const fetchMascotas = async () => {
        try {
            // hago una petición GET para obtener todas las mascotas
            const response = await api.get("mascotas/");
            // si la petición salió bien guardo los datos
            if (response.status === 200) {
                setMascotas(response.data);
            }
        } catch (error) {
            // muestro en consola el codigo y los datos del error
            console.log(error.response?.status);
            console.log(error.response?.data);
            // si es error 404 muestra un mensaje 
            if (error.response?.status === 404) {
                setError("No se encontraron las mascotas");
            } else {
                setError("Error al cargar las mascotas");
            }
        }
    };

    // se ejecuta una vez cuando se carga la página
    useEffect(() => {fetchMascotas();}, []);

    return (
        <main>
            <h1>Listado de Mascotas</h1>
            {/* si hay error lo muestro si no envio la lista al componente */}
            {error ? (
                <p>{error}</p>
            ) : (
                <MascotaList lista={mascotas} />
            )}
        </main>
    );
}

export default MascotasPage;