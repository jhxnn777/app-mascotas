import { Link } from "react-router-dom";

function MascotaList({ lista }) {
    return (
        <section>
            {/* Recorro la lista de mascotas que recibo por props */}
            {lista.map(mascota => (
                // Muestro una mascota por cada vuelta del map
                <article key={mascota.id}>
                    <h2>
                        {mascota.nombre}
                    </h2>
                    {/* Solo muestro la imagen si la mascota tiene una */}
                    {mascota.imagen && (
                        <img
                            src={mascota.imagen}
                            alt={mascota.nombre}
                            width="200"
                        />
                    )}

                    <p>
                        Descripción: {mascota.descripcion}
                    </p>

                    <p>
                        Estado: {mascota.estado === "en_adopcion" ? "En adopcion" : mascota.estado.charAt(0).toUpperCase() + mascota.estado.slice(1)}
                    </p>

                    <p>
                        Tipo: {mascota.tipo_animal}
                    </p>

                    <p>
                        Edad: {
                            mascota.edad !== null
                                ? mascota.edad
                                : "No especificada"
                        }
                    </p>

                    {/* Este link me lleva al detalle de la mascota usando su ID */}
                    <Link to={`/mascotas/${mascota.id}`}>
                        Ver detalle
                    </Link>
                    <hr />
                </article>
            ))}
        </section>
    );
}

export default MascotaList;