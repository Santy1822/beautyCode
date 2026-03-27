document.addEventListener("DOMContentLoaded", () => {
    cargarResumen();
    cargarCitas();
});

async function cargarResumen() {
    try {
        const resServicios = await fetch("http://localhost:5227/api/servicios");
        const servicios = await resServicios.json();
        document.getElementById("totalServicios").textContent = servicios.length;

        const resUsuarios = await fetch("http://localhost:5227/api/usuarios");
        const usuarios = await resUsuarios.json();
        document.getElementById("totalEmpleados").textContent = usuarios.length;

        document.getElementById("totalImagenes").textContent = 0;

    } catch (error) {
        console.error("Error cargando resumen:", error);
    }
}

let citas = [];

async function cargarCitas() {
    try {
        const res = await fetch("http://localhost:5227/api/agenda");
        citas = await res.json();
        pintarTablaCitas();
    } catch (error) {
        console.error("Error cargando citas:", error);
    }
}

function pintarTablaCitas() {
    const tbody = document.getElementById("tablaCitas");
    if (!tbody) return;

    tbody.innerHTML = "";

    citas.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.idAgenda}</td>
            <td>${c.fecha}</td>
            <td>${c.hora}</td>
            <td>${c.estado}</td>
            <td>
                <button onclick="cancelar(${c.idAgenda})">Cancelar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function cancelar(id) {
    try {
        await fetch(`http://localhost:5227/api/agenda/${id}`, {
            method: "DELETE"
        });
        cargarCitas();
    } catch (error) {
        console.error("Error cancelando cita:", error);
    }
}