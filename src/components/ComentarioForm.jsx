import { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <h3>Agregar comentario</h3>

            <div>
                <label>Autor:</label>
                <input
                    type="text"
                    value={autor}
                    onChange={e => setAutor(e.target.value)}
                />
            </div>

            <div>
                <label>Comentario:</label>
                <textarea
                    value={contenido}
                    onChange={e => setContenido(e.target.value)}
                />
            </div>
            
            {error && <p>{error}</p>}
            <button type="submit">
                Comentar
            </button>
        </form>
    );
}

export default ComentarioForm;