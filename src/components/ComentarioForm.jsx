import { useState } from "react";
import { Send } from "lucide-react";

function ComentarioForm({ onAgregar }) {
    // Guardo los datos ingresados en el formulario
    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");
    const [error, setError] = useState("");

    // Función que se ejecuta al enviar el comentario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        // Valido que el autor no esté vacío
        if (autor.trim() === "") {
            setError("El autor es obligatorio");
            return;
        }
        // Valido que el comentario no esté vacío
        if (contenido.trim() === "") {
            setError("El comentario no puede estar vacío");
            return;
        }
        // Creo el objeto que voy a enviar a la API
        const comentario = {
            autor: autor,
            contenido: contenido
        };
        // Envío el comentario al componente padre
        const creado = await onAgregar(comentario);
        // Si se creó correctamente limpio el formulario
        if (creado) {
            setAutor("");
            setContenido("");
        }
    };

    return (
        <form
            className="formulario-comentario"
            onSubmit={handleSubmit}
        >
            <h3 className="fs-5 mb-3">
                Agregar comentario
            </h3>

            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">
                        Autor
                    </label>

                    <input
                        className="form-control"
                        type="text"
                        placeholder="Ingresa tu nombre"
                        value={autor}
                        onChange={e => setAutor(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-8">
                    <label className="form-label fw-semibold">
                        Comentario
                    </label>

                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Escribe un comentario"
                        value={contenido}
                        onChange={e => setContenido(e.target.value)}
                    />
                </div>
            </div>

            {error && (
                <div
                    className="alert alert-danger mt-3 mb-0"
                    role="alert"
                >
                    {error}
                </div>
            )}

            <div className="d-flex justify-content-end mt-3">
                <button
                    className="btn btn-primary px-4 d-flex align-items-center gap-2"
                    type="submit"
                >
                    <Send size={17} />
                    Comentar
                </button>
            </div>
        </form>
    );
}

export default ComentarioForm;