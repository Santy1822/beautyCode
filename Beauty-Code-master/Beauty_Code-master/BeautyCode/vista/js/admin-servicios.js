const API_URL = "http://localhost:5227/api";

document.addEventListener("DOMContentLoaded", cargarServicios);

// GET - Cargar servicios
async function cargarServicios() {
    try {
        const res = await fetch(`${API_URL}/Servicios`);
        const servicios = await res.json();

        const tbody = document.getElementById("serviceList");
        tbody.innerHTML = "";

        if (servicios.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="color:#888">No hay servicios registrados</td></tr>`;
            return;
        }

        servicios.forEach(s => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><img src="img/servicios/${s.imagen}" width="70" 
                onerror="this.src='img/logo.png'"></td>
                <td>${s.nombre}</td>
                <td>$${Number(s.precio).toLocaleString()}</td>
                <td>${s.duracionMinutos} min</td>
                <td>${s.descripcion || "-"}</td>
                <td>
                    <button onclick="eliminarServicio(${s.idServicio})"
                    class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Error cargando servicios:", error);
    }
}

// POST - Agregar servicio
const form = document.getElementById("serviceForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoServicio = {
        nombre: document.getElementById("serviceName").value.trim(),
        precio: parseFloat(document.getElementById("servicePrice").value.trim()),
        descripcion: document.getElementById("serviceDesc").value.trim(),
        duracionMinutos: parseInt(document.getElementById("serviceDuration").value.trim()) || 60,
        imagen: "default.jpg",
        activo: true
    };

    try {
        const res = await fetch(`${API_URL}/Servicios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoServicio)
        });

        if (!res.ok) throw new Error("Error agregando servicio");

        alert("Servicio agregado correctamente");
        form.reset();
        cargarServicios();

    } catch (error) {
        console.error("Error agregando servicio:", error);
        alert("No se pudo agregar el servicio");
    }
});

// DELETE - Eliminar servicio
async function eliminarServicio(id) {
    if (!confirm("¿Eliminar este servicio?")) return;

    try {
        await fetch(`${API_URL}/Servicios/${id}`, {
            method: "DELETE"
        });
        cargarServicios();

    } catch (error) {
        console.error("Error eliminando servicio:", error);
    }
}