const API_URL = "http://localhost:5227/api";
 
let todasLasCitas = [];
 
document.addEventListener("DOMContentLoaded", () => {
    cargarCitas();
});
 
async function cargarCitas() {
    try {
        // Traemos citas, usuarios y servicios al mismo tiempo
        const [resCitas, resUsuarios, resServicios] = await Promise.all([
            fetch(`${API_URL}/Agenda`),
            fetch(`${API_URL}/Usuarios`),
            fetch(`${API_URL}/Servicios`)
        ]);
 
        todasLasCitas = await resCitas.json();
        const usuarios = await resUsuarios.json();
        const servicios = await resServicios.json();
 
        // Mapas para buscar por ID rápido
        const mapaUsuarios = {};
        usuarios.forEach(u => mapaUsuarios[u.idUsuario] = u);
 
        const mapaServicios = {};
        servicios.forEach(s => mapaServicios[s.idServicios] = s);
 
        // Contadores
        let programadas = 0, completadas = 0, canceladas = 0;
        todasLasCitas.forEach(c => {
            if (c.estado === "Pendiente" || c.estado === "Programada") programadas++;
            else if (c.estado === "Completado") completadas++;
            else if (c.estado === "Cancelado") canceladas++;
        });
 
        document.getElementById("totalCitas").textContent = todasLasCitas.length;
        document.getElementById("citasProgramadas").textContent = programadas;
        document.getElementById("citasCompletadas").textContent = completadas;
        document.getElementById("citasCanceladas").textContent = canceladas;
 
        // Pintar tabla
        const tbody = document.getElementById("appointmentList");
        tbody.innerHTML = "";
 
        if (todasLasCitas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#888">No hay citas registradas</td></tr>`;
            return;
        }
 
        todasLasCitas.forEach(c => {
            const cliente = mapaUsuarios[c.idUsuario];
            const empleado = mapaUsuarios[c.idEmpleado];
            const servicio = mapaServicios[c.idServicios];
 
            const nombreCliente = cliente ? cliente.nombre : `Usuario #${c.idUsuario}`;
            const nombreEmpleado = empleado ? empleado.nombre : `Empleado #${c.idEmpleado}`;
            const nombreServicio = servicio ? servicio.nombre : "Sin servicio";
 
            const fecha = c.fecha ? c.fecha.split("T")[0] : "-";
            const hora = c.fecha ? formatearHora(c.fecha) : "-";
 
            const estadoClase = {
                "Pendiente": "estado-prog",
                "Programada": "estado-prog",
                "Completado": "estado-comp",
                "Cancelado": "estado-canc"
            }[c.estado] || "";
 
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${nombreCliente}</td>
                <td>${nombreServicio}</td>
                <td>${fecha}</td>
                <td>${hora}</td>
                <td>${nombreEmpleado}</td>
                <td class="${estadoClase}">${c.estado}</td>
                <td>
                    ${c.estado !== "Completado" && c.estado !== "Cancelado" ? `
                        <button onclick="cambiarEstado(${c.idAgenda}, 'Cancelado')" title="Cancelar" style="background:none;border:none;cursor:pointer;font-size:18px;">❌</button>
                        <button onclick="cambiarEstado(${c.idAgenda}, 'Completado')" title="Completar" style="background:none;border:none;cursor:pointer;font-size:18px;">✔️</button>
                    ` : "-"}
                </td>
            `;
            tbody.appendChild(tr);
        });
 
    } catch (error) {
        console.error("Error cargando citas:", error);
    }
}
 
function formatearHora(fechaISO) {
    const fecha = new Date(fechaISO);
    let horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    const ampm = horas >= 12 ? "PM" : "AM";
    horas = horas % 12 || 12;
    return `${horas}:${minutos} ${ampm}`;
}
 
async function cambiarEstado(idAgenda, nuevoEstado) {
    const accion = nuevoEstado === "Cancelado" ? "cancelar" : "completar";
    if (!confirm(`¿Seguro que deseas ${accion} esta cita?`)) return;
 
    try {
        const res = await fetch(`${API_URL}/Agenda/${idAgenda}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: nuevoEstado })
        });
 
        if (res.ok) {
            cargarCitas();
        } else {
            alert("No se pudo actualizar el estado de la cita");
        }
    } catch (error) {
        console.error("Error actualizando cita:", error);
        alert("Error de conexión");
    }
}