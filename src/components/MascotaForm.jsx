import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function MascotaForm() {
    const navigate = useNavigate();

    // Estados para guardar los datos ingresados en el formulario
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [estado, setEstado] = useState("");
    const [tipoAnimal, setTipoAnimal] = useState("");
    const [edad, setEdad] = useState("");
    const [raza, setRaza] = useState("");
    const [sexo, setSexo] = useState("");
    const [tamano, setTamano] = useState("");
    const [error, setError] = useState("");

    // Acá guardo las opciones de los select que vienen de la API
    const [choices, setChoices] = useState({
        estado: [],
        tipo_animal: [],
        sexo: [],
        tamano: []
    });

    // Cargo las opciones cuando se abre el formulario
    useEffect(() => {
        let activo = true;
        // Hago un GET al endpoint choices
        api.get("choices/")
            .then(response => {
                if (!activo) {
                    return;
                }

                if (response.status === 200) {
                    setChoices(response.data);

                    // Dejo seleccionada la primera opción de cada lista
                    if (response.data.estado.length > 0) {
                        setEstado(response.data.estado[0].value);
                    }

                    if (response.data.tipo_animal.length > 0) {
                        setTipoAnimal(
                            response.data.tipo_animal[0].value
                        );
                    }

                    if (response.data.sexo.length > 0) {
                        setSexo(response.data.sexo[0].value);
                    }

                    if (response.data.tamano.length > 0) {
                        setTamano(response.data.tamano[0].value);
                    }
                }
            })
            .catch(error => {
                console.log(error.response?.status);
                console.log(error.response?.data);

                if (activo) {
                    setError(
                        "No se pudieron cargar las opciones del formulario"
                    );
                }
            });

        // Evita actualizar estados si salgo del formulario
        return () => {
            activo = false;
        };
    }, []);

    // Esta función se ejecuta cuando envío el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validaciones antes de enviar los datos
        if (nombre.trim() === "") {
            setError("El nombre es obligatorio");
            return;
        }

        if (descripcion.trim() === "") {
            setError("La descripción es obligatoria");
            return;
        }

        if (!imagen) {
            setError("Debe seleccionar una imagen");
            return;
        }

        // Uso FormData porque envío datos junto con una imagen
        const formData = new FormData();

        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("imagen", imagen);
        formData.append("estado", estado);
        formData.append("tipo_animal", tipoAnimal);
        formData.append("sexo", sexo);
        formData.append("tamano", tamano);

        // Estos campos son opcionales
        if (edad !== "") {
            formData.append("edad", edad);
        }

        if (raza.trim() !== "") {
            formData.append("raza", raza);
        }

        try {
            // Hago un POST para registrar la mascota
            const response = await api.post(
                "mascotas/",
                formData
            );

            if (response.status === 201) {
                alert("Mascota registrada correctamente");
                navigate("/");
            }
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);

            if (error.response?.status === 400) {
                setError("Revisa los datos ingresados");
            } else {
                setError("No se pudo registrar la mascota");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div>
                <label>Descripción:</label>
                <textarea
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setImagen(e.target.files[0])}
                />
            </div>

            <div>
                <label>Estado:</label>
                <select
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                >
                    {choices.estado.map(opcion => (
                        <option
                            key={opcion.value}
                            value={opcion.value}
                        >
                            {opcion.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Tipo animal:</label>
                <select
                    value={tipoAnimal}
                    onChange={e => setTipoAnimal(e.target.value)}
                >
                    {choices.tipo_animal.map(opcion => (
                        <option
                            key={opcion.value}
                            value={opcion.value}
                        >
                            {opcion.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Edad:</label>
                <input
                    type="number"
                    min="0"
                    value={edad}
                    onChange={e => setEdad(e.target.value)}
                />
            </div>

            <div>
                <label>Raza:</label>
                <input
                    type="text"
                    value={raza}
                    onChange={e => setRaza(e.target.value)}
                />
            </div>

            <div>
                <label>Sexo:</label>
                <select
                    value={sexo}
                    onChange={e => setSexo(e.target.value)}
                >
                    {choices.sexo.map(opcion => (
                        <option
                            key={opcion.value}
                            value={opcion.value}
                        >
                            {opcion.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Tamaño:</label>
                <select
                    value={tamano}
                    onChange={e => setTamano(e.target.value)}
                >
                    {choices.tamano.map(opcion => (
                        <option
                            key={opcion.value}
                            value={opcion.value}
                        >
                            {opcion.label}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p>{error}</p>}

            <button type="submit">
                Registrar Mascota
            </button>
        </form>
    );
}

export default MascotaForm;