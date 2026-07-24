import { useState } from "react";

function MascotaDetalle({ mascota, onCambiarEstado }) {
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
                Estado: {mascota.estado}
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
                <option value="perdida">Perdida</option>
                <option value="encontrada">Encontrada</option>
                <option value="en_adopcion">En adopción</option>
                <option value="adoptada">Adoptada</option>
            </select>

            <button onClick={handleCambiarEstado}>
                Actualizar estado
            </button>

            <h2>Comentarios</h2>
            {/* El detalle de la mascota ya trae sus comentarios */}
            {mascota.comentarios &&
            mascota.comentarios.length > 0 ? (
                mascota.comentarios.map(comentario => (
                    <div key={comentario.id}>
                        <strong>
                            {comentario.autor}
                        </strong>

                        <p>
                            {comentario.contenido}
                        </p>
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