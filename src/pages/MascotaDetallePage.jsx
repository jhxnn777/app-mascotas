import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MascotaDetalle from "../components/MascotaDetalle";
import api from "../api/api";

function MascotaDetallePage() {
    // Obtengo el id de la mascota desde la URL
    const { id } = useParams();

    // Lo uso para volver al listado despues de eliminar
    const navigate = useNavigate();

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

    // Función para cambiar solo el estado de la mascota
    const cambiarEstado = async (nuevoEstado) => {
        try {
            // Uso PATCH porque solo quiero modificar el estado
            const response = await api.patch(
                `mascotas/${id}/`,
                { estado: nuevoEstado }
            );

            // Si se actualiza correctamente vuelvo a cargar la mascota
            if (response.status === 200) {
                alert("Estado actualizado correctamente");
                await fetchMascota();
            }

        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);

            // Manejo los posibles errores al actualizar
            if (error.response?.status === 400) {
                setError("El estado seleccionado no es válido");
            } else if (error.response?.status === 404) {
                setError("Mascota no encontrada");
            } else {
                setError("No se pudo actualizar el estado");
            }
        }
    };

    // Función para eliminar una mascota
    const eliminarMascota = async () => {
        try {
            // Hago una petición DELETE usando el id de la mascota
            const response = await api.delete(`mascotas/${id}/`);

            // Si se elimina correctamente vuelvo al listado
            if (response.status === 204) {
                alert("Mascota eliminada correctamente");
                navigate("/");
            }

        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);

            // Manejo los posibles errores al eliminar
            if (error.response?.status === 404) {
                setError("Mascota no encontrada");
            } else {
                setError("No se pudo eliminar la mascota");
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
                // Envío las funciones al componente por props
                <MascotaDetalle
                    mascota={mascota}
                    onCambiarEstado={cambiarEstado}
                    onEliminar={eliminarMascota}
                />
            ) : (
                <p>Cargando mascota...</p>
            )}
        </main>
    );
}

export default MascotaDetallePage;