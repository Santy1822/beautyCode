let citas = [];
let citaSeleccionada = null;

document.addEventListener("DOMContentLoaded", cargarCitas);

async function cargarCitas() {
    try {
        const respuesta = await fetch("http://localhost:5227/api/agenda");
        citas = await respuesta.json();

        const tbody = document.getElementById("tablaCitas");
        tbody.innerHTML = "";

        citas.forEach(c => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${c.idAgenda}</td>
                <td>${c.fecha}</td>
                <td>${c.hora}</td>
                <td>${c.estado}</td>
                <td>
                    <button onclick="cancelarCita(${c.idAgenda})">Cancelar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });

        actualizarContadores();
    } catch (error) {
        console.error("Error cargando citas:", error);
    }
}

async function cancelarCita(id) {
    try {
        await fetch(`http://localhost:5227/api/agenda/${id}`, {
            method: "DELETE"
        });
        cargarCitas();
    } catch (error) {
        console.error("Error cancelando cita:", error);
    }
}

function actualizarContadores() {
    document.getElementById("pendientes").textContent =
        citas.filter(c => c.estado === "Pendiente").length;
    document.getElementById("completadas").textContent =
        citas.filter(c => c.estado === "Completada").length;
    document.getElementById("canceladas").textContent =
        citas.filter(c => c.estado === "Cancelada").length;
}