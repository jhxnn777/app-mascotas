import {
    PawPrint,
    CircleAlert,
    Search,
    Heart,
    CircleCheck
} from "lucide-react";

function ContadoresMascotas({ mascotas }) {
    // Cuento todas las mascotas registradas
    const total = mascotas.length;

    // Cuento las mascotas según su estado
    const perdidas = mascotas.filter(
        mascota => mascota.estado === "perdida"
    ).length;

    const encontradas = mascotas.filter(
        mascota => mascota.estado === "encontrada"
    ).length;

    const enAdopcion = mascotas.filter(
        mascota => mascota.estado === "en_adopcion"
    ).length;

    const adoptadas = mascotas.filter(
        mascota => mascota.estado === "adoptada"
    ).length;

    return (
        <section className="row g-3 mb-4">
            <div className="col-6 col-md">
                <div className="contador-card contador-total">
                    <span className="d-flex align-items-center gap-2">
                        <PawPrint size={20} />
                        Total
                    </span>
                    <strong>{total}</strong>
                </div>
            </div>

            <div className="col-6 col-md">
                <div className="contador-card contador-perdidas">
                    <span className="d-flex align-items-center gap-2">
                        <CircleAlert size={20} />
                        Perdidas
                    </span>
                    <strong>{perdidas}</strong>
                </div>
            </div>

            <div className="col-6 col-md">
                <div className="contador-card contador-encontradas">
                    <span className="d-flex align-items-center gap-2">
                        <Search size={20} />
                        Encontradas
                    </span>
                    <strong>{encontradas}</strong>
                </div>
            </div>

            <div className="col-6 col-md">
                <div className="contador-card contador-adopcion">
                    <span className="d-flex align-items-center gap-2">
                        <Heart size={20} />
                        En adopción
                    </span>
                    <strong>{enAdopcion}</strong>
                </div>
            </div>

            <div className="col-6 col-md">
                <div className="contador-card contador-adoptadas">
                    <span className="d-flex align-items-center gap-2">
                        <CircleCheck size={20} />
                        Adoptadas
                    </span>
                    <strong>{adoptadas}</strong>
                </div>
            </div>
        </section>
    );
}

export default ContadoresMascotas;