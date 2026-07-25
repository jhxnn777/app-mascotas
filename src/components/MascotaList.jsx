import { Link } from "react-router-dom";

function MascotaList({ lista }) {
    // Cambio el texto interno de la API por uno más bonito
    const mostrarEstado = (estado) => {
        if (estado === "en_adopcion") {
            return "En adopción";
        }

        return estado.charAt(0).toUpperCase() + estado.slice(1);
    };

    // Entrego una clase de Bootstrap dependiendo del estado
    const colorEstado = (estado) => {
        if (estado === "perdida") {
            return "text-bg-danger";
        }

        if (estado === "encontrada") {
            return "text-bg-warning";
        }

        if (estado === "en_adopcion") {
            return "text-bg-primary";
        }

        if (estado === "adoptada") {
            return "text-bg-success";
        }

        return "text-bg-secondary";
    };

    if (lista.length === 0) {
        return (
            <div className="alert alert-info text-center">
                Todavía no hay mascotas registradas.
            </div>
        );
    }

    return (
        <section className="row g-4">
            {lista.map(mascota => (
                <div
                    className="col-12 col-md-6 col-lg-4"
                    key={mascota.id}
                >
                    <article className="card tarjeta-mascota h-100 shadow-sm border-0">
                        {mascota.imagen ? (
                            <img
                                src={mascota.imagen}
                                alt={mascota.nombre}
                                className="card-img-top imagen-mascota"
                            />
                        ) : (
                            <div className="sin-imagen">
                                🐾
                            </div>
                        )}

                        <div className="card-body d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                                <h2 className="card-title fs-4 mb-0">
                                    {mascota.nombre}
                                </h2>

                                <span
                                    className={`badge ${colorEstado(
                                        mascota.estado
                                    )}`}
                                >
                                    {mostrarEstado(mascota.estado)}
                                </span>
                            </div>

                            <p className="card-text text-secondary descripcion-mascota">
                                {mascota.descripcion}
                            </p>

                            <div className="mb-3">
                                <p className="mb-1">
                                    <strong>Tipo:</strong>{" "}
                                    {mascota.tipo_animal}
                                </p>

                                <p className="mb-0">
                                    <strong>Edad:</strong>{" "}
                                    {mascota.edad !== null
                                        ? `${mascota.edad} año(s)`
                                        : "No especificada"}
                                </p>
                            </div>

                            <Link
                                to={`/mascotas/${mascota.id}`}
                                className="btn btn-outline-primary mt-auto"
                            >
                                Ver detalle
                            </Link>
                        </div>
                    </article>
                </div>
            ))}
        </section>
    );
}

export default MascotaList;