import { useState } from "react";
import {
    RefreshCw,
    Trash2,
    MessageCircle,
    TriangleAlert
} from "lucide-react";
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
    // Guardo la información para mostrar la confirmación
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [tipoEliminar, setTipoEliminar] = useState("");
    const [comentarioId, setComentarioId] = useState(null);
    // Envío el nuevo estado al componente padre
    const handleCambiarEstado = () => {
        onCambiarEstado(nuevoEstado);
    }
    // Abro la confirmación para eliminar la mascota
    const handleEliminarMascota = () => {
        setTipoEliminar("mascota");
        setMostrarConfirmacion(true);
    };
    // Abro la confirmación para eliminar un comentario
    const handleEliminarComentario = (id) => {
        setTipoEliminar("comentario");
        setComentarioId(id);
        setMostrarConfirmacion(true);
    };
    // Cierro la confirmación sin eliminar
    const cerrarConfirmacion = () => {
        setMostrarConfirmacion(false);
        setTipoEliminar("");
        setComentarioId(null);
    };
    // Ejecuto la eliminación después de confirmar
    const confirmarEliminacion = () => {
        if (tipoEliminar === "mascota") {
            onEliminar();
        }
        if (tipoEliminar === "comentario") {
            onEliminarComentario(comentarioId);
        }
        cerrarConfirmacion();
    };
    // Muestro el estado sin guion bajo
    const mostrarEstado = (estado) => {
        if (estado === "en_adopcion") {
            return "En adopción";
        }
        return estado.charAt(0).toUpperCase() + estado.slice(1);
    };
    // Cambio el color de la etiqueta según el estado
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
    return (
        <article className="detalle-mascota">
            <div className="card border-0 shadow detalle-card">
                <div className="row g-0">
                    <div className="col-12 col-lg-5">
                        {mascota.imagen ? (
                            <img
                                src={mascota.imagen}
                                alt={mascota.nombre}
                                className="imagen-detalle"
                            />
                        ) : (
                            <div className="sin-imagen detalle-sin-imagen">
                                🐾
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-7">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                                <h1 className="mb-0">
                                    {mascota.nombre}
                                </h1>

                                <span
                                    className={`badge ${colorEstado(
                                        mascota.estado
                                    )}`}
                                >
                                    {mostrarEstado(mascota.estado)}
                                </span>
                            </div>

                            <p className="text-secondary">
                                {mascota.descripcion}
                            </p>

                            <div className="row g-3 informacion-mascota">
                                <div className="col-6">
                                    <div className="dato-mascota">
                                        <span>Tipo</span>
                                        <strong>
                                            {mascota.tipo_animal}
                                        </strong>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="dato-mascota">
                                        <span>Edad</span>
                                        <strong>
                                            {mascota.edad !== null
                                                ? `${mascota.edad} año(s)`
                                                : "No especificada"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="dato-mascota">
                                        <span>Raza</span>
                                        <strong>
                                            {mascota.raza ||
                                                "No especificada"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="dato-mascota">
                                        <span>Sexo</span>
                                        <strong>
                                            {mascota.sexo ||
                                                "No especificado"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="dato-mascota">
                                        <span>Tamaño</span>
                                        <strong>
                                            {mascota.tamano ||
                                                "No especificado"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="dato-mascota">
                                        <span>Estado actual</span>
                                        <strong>
                                            {mostrarEstado(
                                                mascota.estado
                                            )}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h2 className="fs-5 mb-3">
                                Cambiar estado
                            </h2>

                            <div className="d-flex flex-column flex-md-row gap-2">
                                <select
                                    className="form-select"
                                    value={nuevoEstado}
                                    onChange={e =>
                                        setNuevoEstado(
                                            e.target.value
                                        )
                                    }
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

                                <button
                                    className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                                    onClick={handleCambiarEstado}
                                >
                                    <RefreshCw size={18} />
                                    Actualizar estado
                                </button>
                            </div>

                            <button
                                className="btn btn-outline-danger mt-3 d-flex align-items-center gap-2"
                                onClick={handleEliminarMascota}
                            >
                                <Trash2 size={18} />
                                Eliminar mascota
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="comentarios-seccion mt-4">
                <div className="card border-0 shadow-sm p-4">
                    <h2 className="mb-4 d-flex align-items-center gap-2">
                        <MessageCircle size={26} />
                        Comentarios
                    </h2>

                    <ComentarioForm
                        onAgregar={onAgregarComentario}
                    />

                    <hr className="my-4" />

                    {mascota.comentarios &&
                    mascota.comentarios.length > 0 ? (
                        <div className="lista-comentarios">
                            {mascota.comentarios.map(
                                comentario => (
                                    <div
                                        className="comentario-card"
                                        key={comentario.id}
                                    >
                                        <div className="d-flex justify-content-between align-items-start gap-3">
                                            <div>
                                                <p className="mb-1">
                                                    <strong>
                                                        {
                                                            comentario.autor
                                                        }
                                                    </strong>
                                                </p>

                                                <p className="mb-0 text-secondary">
                                                    {
                                                        comentario.contenido
                                                    }
                                                </p>
                                            </div>

                                            <button
                                                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2"
                                                onClick={() =>
                                                    handleEliminarComentario(
                                                        comentario.id
                                                    )
                                                }
                                            >
                                                <Trash2 size={15} />
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="alert alert-info mb-0">
                            Esta mascota todavía no tiene comentarios.
                        </div>
                    )}
                </div>
            </section>

            {mostrarConfirmacion && (
                <>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header">
                                    <h2 className="modal-title fs-5 d-flex align-items-center gap-2">
                                        <TriangleAlert size={21} />
                                        Confirmar eliminación
                                    </h2>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={cerrarConfirmacion}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p className="mb-0">
                                        {tipoEliminar === "mascota"
                                            ? "¿Estás seguro de eliminar esta mascota?"
                                            : "¿Estás seguro de eliminar este comentario?"}
                                    </p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={cerrarConfirmacion}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger d-flex align-items-center gap-2"
                                        onClick={confirmarEliminacion}
                                    >
                                        <Trash2 size={17} />
                                        Sí, eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </article>
    );
}

export default MascotaDetalle;