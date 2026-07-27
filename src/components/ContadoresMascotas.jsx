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
                    <span>Total</span>
                    <strong>{total}</strong>
                </div>
            </div>

            <div className="col-6 col-md">
                <div className="contador-card contador-perdidas">
                    <span>Perdidas</span>
                    <strong>{perdidas}</strong>
                </div>
            </div>

            <div className="col-6 col-md">
                <div className="contador-card contador-encontradas">
                    <span>Encontradas</span>
                    <strong>{encontradas}</strong>
                </div>
            </div>

            <div className="col-6 col-md">
                <div className="contador-card contador-adopcion">
                    <span>En adopción</span>
                    <strong>{enAdopcion}</strong>
                </div>
            </div>

            <div className="col-6 col-md">
                <div className="contador-card contador-adoptadas">
                    <span>Adoptadas</span>
                    <strong>{adoptadas}</strong>
                </div>
            </div>
        </section>
    );
}

export default ContadoresMascotas;