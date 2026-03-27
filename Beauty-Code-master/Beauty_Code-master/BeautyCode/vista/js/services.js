/*********************************
 * CONFIGURACIÓN
 *********************************/
const API_URL = "http://localhost:5227/api";

/*********************************
 * OBTENER SERVICIOS DEL BACKEND
 *********************************/
async function cargarServicios() {
    try {
        const respuesta = await fetch(`${API_URL}/servicios`);

        if (!respuesta.ok) {
            throw new Error("Error al obtener servicios");
        }

        return await respuesta.json();

    } catch (error) {
        console.error(error);
        alert("No se pudieron cargar los servicios");
        return [];
    }
}

/*********************************
 * PINTAR SERVICIOS EN EL HTML
 *********************************/
function mostrarServicios(servicios) {
    const contenedor = document.getElementById("servicesList");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    servicios.forEach(serv => {
        const card = document.createElement("div");
        card.classList.add("tarjeta", "tarjeta-serv");

        card.innerHTML = `
            <div class="service-img-container">
                <img src="${serv.imagen}" alt="${serv.nombre}">
            </div>

            <h3>${serv.nombre}</h3>
            <p class="service-desc">${serv.descripcion}</p>
            <p class="service-price">
                $${serv.precio.toLocaleString()} COP
            </p>

            <a href="appointments.html?servicio=${serv.id}" class="btn-primary">
                Agendar
            </a>
        `;

        contenedor.appendChild(card);
    });
}

/*********************************
 * INICIALIZACIÓN
 *********************************/
document.addEventListener("DOMContentLoaded", async () => {
    const servicios = await cargarServicios();
    mostrarServicios(servicios);
});
