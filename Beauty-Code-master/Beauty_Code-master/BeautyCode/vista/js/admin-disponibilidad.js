const API_URL = "http://localhost:5227/api";
 
document.addEventListener("DOMContentLoaded", () => {
    cargarDisponibilidad();
 
    document.getElementById("disponibilidadForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        await guardarDisponibilidad();
    });
});
 
async function cargarDisponibilidad() {
    try {
        const res = await fetch(`${API_URL}/Disponibilidad`);
        const datos = await res.json();
 
        // Traer usuarios para mostrar nombre del empleado
        const resUsuarios = await fetch(`${API_URL}/Usuarios`);
        const usuarios = await resUsuarios.json();
        const mapaUsuarios = {};
        usuarios.forEach(u => mapaUsuarios[u.idUsuario] = u);
 
        const tbody = document.getElementById("listaDisponibilidad");
        tbody.innerHTML = "";
 
        if (datos.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="color:#888">No hay horarios registrados</td></tr>`;
            return;
        }
 
        datos.forEach(d => {
            const empleado = mapaUsuarios[d.idUsuario];
            const nombreEmpleado = empleado ? empleado.nombre : `Empleado #${d.idUsuario}`;
 
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${d.diaSemana}</td>
                <td>${formatearHora(d.horaInicio)}</td>
                <td>${formatearHora(d.horaCierre)}</td>
                <td>
                    <button onclick="eliminarDisponibilidad(${d.idDisponibilidad})" 
                        style="background:none;border:none;cursor:pointer;font-size:18px;" title="Eliminar">❌</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
 
    } catch (error) {
        console.error("Error cargando disponibilidad:", error);
    }
}
 
async function guardarDisponibilidad() {
    const diaSemana = document.getElementById("diaSemana").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const horaFin = document.getElementById("horaFin").value;
 
    if (!diaSemana || diaSemana === "Seleccione..." || !horaInicio || !horaFin) {
        alert("Por favor completa todos los campos");
        return;
    }
 
    if (horaInicio >= horaFin) {
        alert("La hora de apertura debe ser menor a la hora de cierre");
        return;
    }
 
    const nueva = {
        codDisponibilidad: Date.now().toString().slice(-8),
        diaSemana: diaSemana,
        horaInicio: horaInicio + ":00",
        horaCierre: horaFin + ":00",
        idUsuario: 3  // por ahora hardcodeado, después se conecta con login
    };
 
    try {
        const res = await fetch(`${API_URL}/Disponibilidad`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nueva)
        });
 
        if (res.ok) {
            alert("Disponibilidad guardada correctamente ✅");
            document.getElementById("disponibilidadForm").reset();
            cargarDisponibilidad();
        } else {
            const error = await res.text();
            console.error("Error del servidor:", error);
            alert("No se pudo guardar la disponibilidad");
        }
    } catch (error) {
        console.error("Error guardando disponibilidad:", error);
        alert("Error de conexión");
    }
}
 
async function eliminarDisponibilidad(id) {
    if (!confirm("¿Eliminar este horario?")) return;
 
    try {
        const res = await fetch(`${API_URL}/Disponibilidad/${id}`, {
            method: "DELETE"
        });
 
        if (res.ok) {
            cargarDisponibilidad();
        } else {
            alert("No se pudo eliminar el horario");
        }
    } catch (error) {
        console.error("Error eliminando disponibilidad:", error);
    }
}
 
function formatearHora(hora) {
    if (!hora) return "-";
    // hora viene como "HH:MM:SS" o "HH:MM"
    const partes = hora.split(":");
    let h = parseInt(partes[0]);
    const m = partes[1];
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
}
 