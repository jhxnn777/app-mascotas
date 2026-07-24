import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MascotaDetalle from "../components/MascotaDetalle";
import api from "../api/api";

function MascotaDetallePage() {
    // Obtengo el id de la mascota desde la URL
    const { id } = useParams();
    // Acá guardo la mascota que viene de la API
    const [mascota, setMascota] = useState(null);
    // Acá guardo algún mensaje de error
    const [error, setError] = useState("");
    // Función para buscar una mascota específica por su id
    const fetchMascota = async () => {
        try {
            // Hago un GET usando el id que viene de la URL
            const response = await api.get(`mascotas/${id}/`);
            // Si sale bien guardo la mascota
            if (response.status === 200) {
                setMascota(response.data);
            }

        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            // Si no existe la mascota muestro un mensaje
            if (error.response?.status === 404) {
                setError("Mascota no encontrada");
            } else {
                setError("Error al cargar la mascota");
            }
        }
    };

    // Se ejecuta cuando entra a la página del detalle
    useEffect(() => {fetchMascota();}, [id]);
    return (
        <main>
            {error ? (
                <p>{error}</p>
            ) : mascota ? (
                // Envío la mascota al componente por props
                <MascotaDetalle mascota={mascota} />
            ) : (
                <p>Cargando mascota...</p>
            )}
        </main>
    );
}

export default MascotaDetallePage;