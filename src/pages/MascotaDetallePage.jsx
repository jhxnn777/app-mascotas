import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MascotaDetalle from "../components/MascotaDetalle";
import api from "../api/api";

function MascotaDetallePage() {
    // Obtengo el id de la mascota desde la URL
    const { id } = useParams();
    // Lo uso para volver al listado después de eliminar
    const navigate = useNavigate();
    // Acá guardo la mascota que viene de la API
    const [mascota, setMascota] = useState(null);
    // Acá guardo algún mensaje de error
    const [error, setError] = useState("");
    // Función para volver a buscar la mascota
    const fetchMascota = async () => {
        try {
            const response = await api.get(`mascotas/${id}/`);
            if (response.status === 200) {
                setMascota(response.data);
            }
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
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
            // Uso PATCH porque solo modifico el estado
            const response = await api.patch(
                `mascotas/${id}/`,
                { estado: nuevoEstado }
            );
            if (response.status === 200) {
                alert("Estado actualizado correctamente");
                await fetchMascota();
            }
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
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
            const response = await api.delete(
                `mascotas/${id}/`
            );
            if (response.status === 204) {
                alert("Mascota eliminada correctamente");
                navigate("/");
            }
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            if (error.response?.status === 404) {
                setError("Mascota no encontrada");
            } else {
                setError("No se pudo eliminar la mascota");
            }
        }
    };

    // Función para agregar un comentario a la mascota
    const agregarComentario = async (comentario) => {
        try {
            const response = await api.post(
                `mascotas/${id}/comentar/`,
                comentario
            );
            if (response.status === 201) {
                alert("Comentario agregado correctamente");
                await fetchMascota();
                return true;
            }
            return false;
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            if (error.response?.status === 400) {
                setError("Revisa los datos del comentario");
            } else if (error.response?.status === 404) {
                setError("Mascota no encontrada");
            } else {
                setError("No se pudo agregar el comentario");
            }
            return false;
        }
    };

    // Función para eliminar un comentario
    const eliminarComentario = async (comentarioId) => {
        try {
            const response = await api.delete(
                `comentarios/${comentarioId}/`
            );
            if (response.status === 204) {
                alert("Comentario eliminado correctamente");
                await fetchMascota();
            }
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            if (error.response?.status === 404) {
                alert("Comentario no encontrado");
            } else if (error.response?.status === 500) {
                alert(
                    "La API tuvo un error interno al eliminar el comentario"
                );
            } else {
                alert("No se pudo eliminar el comentario");
            }
        }
    };

    // Se ejecuta cuando entro a la página del detalle
    useEffect(() => {
        let activo = true;

        // Hago el GET directamente dentro del efecto
        api.get(`mascotas/${id}/`)
            .then(response => {
                if (activo && response.status === 200) {
                    setMascota(response.data);
                }
            })
            .catch(error => {
                console.log(error.response?.status);
                console.log(error.response?.data);
                if (!activo) {
                    return;
                }
                if (error.response?.status === 404) {
                    setError("Mascota no encontrada");
                } else {
                    setError("Error al cargar la mascota");
                }
            });

        // Evita actualizar el estado si salgo de la página
        return () => {
            activo = false;
        };
    }, [id]);

    return (
        <main>
            {error ? (
                <p>{error}</p>
            ) : mascota ? (
                <MascotaDetalle
                    mascota={mascota}
                    onCambiarEstado={cambiarEstado}
                    onEliminar={eliminarMascota}
                    onAgregarComentario={agregarComentario}
                    onEliminarComentario={eliminarComentario}
                />
            ) : (
                <p>Cargando mascota...</p>
            )}
        </main>
    );
}

export default MascotaDetallePage;