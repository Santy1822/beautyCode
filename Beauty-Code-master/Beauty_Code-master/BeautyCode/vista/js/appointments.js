const API_URL = "http://localhost:5227/api";

let servicios = [];
let empleados = [];
let citas = [];

let selServicio = null;
let selEmpleado = null;
let selFecha = null;
let selHora = null;

let pasoActual = 1;

document.addEventListener("DOMContentLoaded", () => {
    cargarServicios();
    cargarEmpleados();
    cargarCitas();

    const hoy = new Date().toISOString().split("T")[0];
    document.getElementById("fechaInput").min = hoy;
});

// ===== CARGAR DATOS =====
async function cargarServicios() {
    try {
        const res = await fetch(`${API_URL}/Servicios`);
        servicios = await res.json();
        pintarServicios();
    } catch (error) {
        console.error("Error cargando servicios:", error);
    }
}

async function cargarEmpleados() {
    try {
        const res = await fetch(`${API_URL}/Usuarios`);
        const usuarios = await res.json();
        empleados = usuarios.filter(u => u.idRol === 3);
        pintarEmpleados();
    } catch (error) {
        console.error("Error cargando empleados:", error);
    }
}

async function cargarCitas() {
    try {
        const res = await fetch(`${API_URL}/Agenda`);
        citas = await res.json();
        pintarCitas();
    } catch (error) {
        console.error("Error cargando citas:", error);
    }
}

// ===== PINTAR TARJETAS =====
function pintarServicios() {
    const grid = document.getElementById("serviciosGrid");
    grid.innerHTML = "";

    servicios.forEach(s => {
        const card = document.createElement("div");
        card.className = "servicio-card";
        card.innerHTML = `
            <div class="nombre">✨ ${s.nombre}</div>
            <div class="duracion">⏱ ${s.duracionMinutos || 60} min</div>
            <div class="precio">$${Number(s.precio).toLocaleString()}</div>
            <div style="font-size:12px;color:#888;margin-top:5px;">${s.descripcion || ""}</div>
        `;
        card.onclick = () => {
            document.querySelectorAll(".servicio-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selServicio = s;
        };
        grid.appendChild(card);
    });
}

function pintarEmpleados() {
    const grid = document.getElementById("empleadosGrid");
    grid.innerHTML = "";

    if (empleados.length === 0) {
        grid.innerHTML = "<p style='color:#888'>No hay especialistas disponibles</p>";
        return;
    }

    empleados.forEach(e => {
        const card = document.createElement("div");
        card.className = "empleado-card";
        card.innerHTML = `
            <div class="avatar">💅</div>
            <div class="emp-nombre">${e.nombre}</div>
        `;
        card.onclick = () => {
            document.querySelectorAll(".empleado-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selEmpleado = e;
        };
        grid.appendChild(card);
    });
}

function pintarHoras() {
    const grid = document.getElementById("horasGrid");
    grid.innerHTML = "";

    const horas = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

    horas.forEach(h => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "hora-btn";
        btn.textContent = h;
        btn.onclick = () => {
            document.querySelectorAll(".hora-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selHora = h;
        };
        grid.appendChild(btn);
    });
}

function pintarCitas() {
    const tbody = document.getElementById("tablaCitas");
    tbody.innerHTML = "";

    if (citas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="color:#888">No tienes citas registradas</td></tr>`;
        return;
    }

    citas.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.idServicios || "-"}</td>
            <td>${c.idEmpleado || "-"}</td>
            <td>${c.fecha ? c.fecha.split("T")[0] : "-"}</td>
            <td>${c.estado}</td>
            <td>
                <button onclick="cancelarCita(${c.idAgenda})" 
                class="btn btn-danger btn-sm">Cancelar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ===== NAVEGACIÓN PASOS =====
function irPaso(paso) {
    if (paso === 2 && !selServicio) return alert("Selecciona un servicio");
    if (paso === 3 && !selEmpleado) return alert("Selecciona un especialista");
    if (paso === 4) {
        selFecha = document.getElementById("fechaInput").value;
        if (!selFecha) return alert("Selecciona una fecha");
        pintarHoras();
    }

    document.getElementById("paso" + pasoActual).classList.add("d-none");
    document.getElementById("paso" + paso).classList.remove("d-none");

    actualizarStepper(paso);
    pasoActual = paso;
}

function actualizarStepper(paso) {
    for (let i = 1; i <= 4; i++) {
        const circle = document.getElementById("stepCircle" + i);
        circle.classList.remove("active", "done");
        if (i < paso) circle.classList.add("done");
        if (i === paso) circle.classList.add("active");

        if (i < 4) {
            const line = document.getElementById("line" + i);
            line.classList.toggle("done", i < paso);
        }
    }
}

// ===== CONFIRMAR CITA =====
async function confirmarCita() {
    if (!selHora) return alert("Selecciona una hora");

    const nuevaCita = {
        codAgenda: Date.now().toString().slice(-8),
        fecha: `${selFecha}T${selHora}:00`,
        estado: "Pendiente",
        creadoEn: new Date().toISOString(),
        idCatalogo: 1,
        idUsuario: 4,
        idEmpleado: selEmpleado.idUsuario,
        idServicios: selServicio.idServicios
    };

    console.log("Datos a enviar:", JSON.stringify(nuevaCita));

    try {
        const res = await fetch(`${API_URL}/Agenda`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaCita)
        });

        if (!res.ok) throw new Error("Error guardando cita");

        document.getElementById("resumenFinal").innerHTML = `
            <div class="resumen-item">
                <span class="resumen-label">Servicio</span>
                <span class="resumen-valor">${selServicio.nombre}</span>
            </div>
            <div class="resumen-item">
                <span class="resumen-label">Especialista</span>
                <span class="resumen-valor">${selEmpleado.nombre}</span>
            </div>
            <div class="resumen-item">
                <span class="resumen-label">Fecha</span>
                <span class="resumen-valor">${selFecha}</span>
            </div>
            <div class="resumen-item">
                <span class="resumen-label">Hora</span>
                <span class="resumen-valor">${selHora}</span>
            </div>
            <div class="resumen-item">
                <span class="resumen-label">Total</span>
                <span class="resumen-valor" style="color:#6B0C17">$${Number(selServicio.precio).toLocaleString()}</span>
            </div>
        `;

        document.getElementById("paso" + pasoActual).classList.add("d-none");
        document.getElementById("paso5").classList.remove("d-none");
        cargarCitas();

    } catch (error) {
        console.error(error);
        alert("No se pudo registrar la cita");
    }
}

// ===== CANCELAR CITA =====
async function cancelarCita(id) {
    if (!confirm("¿Cancelar esta cita?")) return;
    try {
        await fetch(`${API_URL}/Agenda/${id}`, { method: "DELETE" });
        cargarCitas();
    } catch (error) {
        console.error("Error cancelando cita:", error);
    }
}

// ===== NUEVA CITA =====
function nuevaCita() {
    selServicio = null;
    selEmpleado = null;
    selFecha = null;
    selHora = null;
    pasoActual = 1;

    document.querySelectorAll(".servicio-card, .empleado-card, .hora-btn")
        .forEach(el => el.classList.remove("selected"));
    document.getElementById("fechaInput").value = "";

    for (let i = 2; i <= 5; i++) {
        document.getElementById("paso" + i).classList.add("d-none");
    }
    document.getElementById("paso1").classList.remove("d-none");
    actualizarStepper(1);
}