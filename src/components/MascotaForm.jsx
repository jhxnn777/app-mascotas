import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import notyf from "../utils/notificaciones";

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

    // Aca guardo las opciones de los select que vienen de la API
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
                notyf.success("Mascota registrada correctamente");
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
        <section className="formulario-mascota">
            <div className="card border-0 shadow-sm formulario-card">
                <div className="card-body p-4 p-md-5">
                    <div className="mb-4">
                        <h2 className="fs-4 mb-2">
                            Datos de la mascota
                        </h2>

                        <p className="text-secondary mb-0">
                            Completa los campos para registrar una nueva mascota.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Nombre
                                </label>

                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Ejemplo: Firulais"
                                    value={nombre}
                                    onChange={e =>
                                        setNombre(e.target.value)
                                    }
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Tipo de animal
                                </label>

                                <select
                                    className="form-select"
                                    value={tipoAnimal}
                                    onChange={e =>
                                        setTipoAnimal(e.target.value)
                                    }
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

                            <div className="col-12">
                                <label className="form-label fw-semibold">
                                    Descripción
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Describe las características de la mascota"
                                    value={descripcion}
                                    onChange={e =>
                                        setDescripcion(e.target.value)
                                    }
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">
                                    Imagen
                                </label>

                                <input
                                    className="form-control"
                                    type="file"
                                    accept="image/*"
                                    onChange={e =>
                                        setImagen(e.target.files[0])
                                    }
                                />

                                <div className="form-text">
                                    Selecciona una imagen desde tu computador.
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Estado
                                </label>

                                <select
                                    className="form-select"
                                    value={estado}
                                    onChange={e =>
                                        setEstado(e.target.value)
                                    }
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

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Edad
                                </label>

                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    placeholder="Ejemplo: 3"
                                    value={edad}
                                    onChange={e =>
                                        setEdad(e.target.value)
                                    }
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Raza
                                </label>

                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Ejemplo: Labrador"
                                    value={raza}
                                    onChange={e =>
                                        setRaza(e.target.value)
                                    }
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Sexo
                                </label>

                                <select
                                    className="form-select"
                                    value={sexo}
                                    onChange={e =>
                                        setSexo(e.target.value)
                                    }
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

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Tamaño
                                </label>

                                <select
                                    className="form-select"
                                    value={tamano}
                                    onChange={e =>
                                        setTamano(e.target.value)
                                    }
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
                        </div>

                        {error && (
                            <div
                                className="alert alert-danger mt-4"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}

                        <div className="d-grid d-md-flex justify-content-md-end mt-4">
                            <button
                                className="btn btn-primary btn-lg px-5"
                                type="submit"
                            >
                                Registrar mascota
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default MascotaForm;