import { useState } from "react";
import ComentarioForm from "./ComentarioForm";

function MascotaDetalle({
    mascota,
    onCambiarEstado,
    onEliminar,
    onAgregarComentario,
    onEliminarComentario
}) {
    // Guardo el nuevo estado que seleccione el usuario
    const [nuevoEstado, setNuevoEstado] = useState(mascota.estado);

    // Envío el nuevo estado al componente padre
    const handleCambiarEstado = () => {
        onCambiarEstado(nuevoEstado);
    };

    return (
        <article>
            <h1>{mascota.nombre}</h1>

            {/* Muestro la imagen si existe */}
            {mascota.imagen && (
                <img
                    src={mascota.imagen}
                    alt={mascota.nombre}
                    width="300"
                />
            )}

            <p>
                Descripción: {mascota.descripcion}
            </p>

            <p>
                Estado: {mascota.estado === "en_adopcion"
                    ? "En adopción"
                    :   mascota.estado.charAt(0).toUpperCase() +
                        mascota.estado.slice(1)
                }
            </p>

            <p>
                Tipo animal: {mascota.tipo_animal}
            </p>

            <p>
                Edad: {
                    mascota.edad !== null
                        ? mascota.edad
                        : "No especificada"
                }
            </p>

            <p>
                Raza: {
                    mascota.raza ||
                    "No especificada"
                }
            </p>

            <p>
                Sexo: {
                    mascota.sexo ||
                    "No especificado"
                }
            </p>

            <p>
                Tamaño: {
                    mascota.tamano ||
                    "No especificado"
                }
            </p>

            {/* Selecciono el nuevo estado de la mascota */}
            <h3>Cambiar estado</h3>

            <select
                value={nuevoEstado}
                onChange={e => setNuevoEstado(e.target.value)}
            >
                <option value="perdida">
                    Perdida
                </option>

                <option value="encontrada">
                    Encontrada
                </option>

                <option value="en_adopcion">
                    En adopción
                </option>

                <option value="adoptada">
                    Adoptada
                </option>
            </select>

            {/* Envío el nuevo estado seleccionado */}
            <button onClick={handleCambiarEstado}>
                Actualizar estado
            </button>

            {/* Ejecuto la función para eliminar la mascota */}
            <button onClick={onEliminar}>
                Eliminar mascota
            </button>

            <h2>Comentarios</h2>

            {/* Formulario para agregar un comentario */}
            <ComentarioForm
                onAgregar={onAgregarComentario}
            />

            {/* El detalle de la mascota ya trae sus comentarios */}
            {mascota.comentarios &&
            mascota.comentarios.length > 0 ? (
                mascota.comentarios.map(comentario => (
                    <div key={comentario.id}>
                        <p>
                            <strong>Autor:</strong>{" "}
                            {comentario.autor}
                        </p>

                        <p>
                            <strong>Comentario:</strong>{" "}
                            {comentario.contenido}
                        </p>

                        {/* Envío el id del comentario que quiero eliminar */}
                        <button
                            onClick={() =>
                                onEliminarComentario(comentario.id)
                            }
                        >
                            Eliminar comentario
                        </button>

                        <hr />
                    </div>
                ))
            ) : (
                <p>
                    Esta mascota no tiene comentarios
                </p>
            )}
        </article>
    );
}

export default MascotaDetalle;