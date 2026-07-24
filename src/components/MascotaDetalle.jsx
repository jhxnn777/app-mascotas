function MascotaDetalle({ mascota }) {
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