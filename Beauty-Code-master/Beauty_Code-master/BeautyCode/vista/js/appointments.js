/*******************************
 * CONFIGURACIÓN GENERAL
 *******************************/
const API_URL = "http://localhost:5227/api";

let servicios = [];
let citas = [];

// ⚠️ Temporal (hasta que empleados vengan del backend)
let empleados = [
    { id: "1", nombre: "Camila" },
    { id: "2", nombre: "Daniela" },
    { id: "3", nombre: "Sofía" }
];

// Disponibilidad definida por admin
const disponibilidad = {
    diasHabiles: [1, 2, 3, 4, 5], // Lunes a Viernes
    horaInicio: "09:00",
    horaFin: "17:00"
};

/*******************************
 * CARGA INICIAL
 *******************************/
document.addEventListener("DOMContentLoaded", () => {
    cargarServicios();
    cargarEmpleados();
    cargarCitas();
});

/*******************************
 * BACKEND → DATOS
 *******************************/
async function cargarServicios() {
    try {
        const res = await fetch(`${API_URL}/servicios`);
        if (!res.ok) throw new Error("Error cargando servicios");

        servicios = await res.json();

        const select = document.getElementById("servicioSelect");
        select.innerHTML = `<option value="">Seleccione...</option>`;

        servicios.forEach(s => {
            const option = document.createElement("option");
            option.value = s.id;
            option.textContent = `${s.nombre} ($${s.precio.toLocaleString()})`;
            select.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        alert("No se pudieron cargar los servicios");
    }
}

async function cargarCitas() {
    try {
        const res = await fetch(`${API_URL}/Agenda`);
        if (!res.ok) throw new Error("Error cargando citas");

        citas = await res.json();
        mostrarCitas();

    } catch (error) {
        console.error(error);
    }
}

function cargarEmpleados() {
    const select = document.getElementById("empleadoSelect");
    select.innerHTML = `<option value="">Seleccione...</option>`;

    empleados.forEach(e => {
        const option = document.createElement("option");
        option.value = e.id;
        option.textContent = e.nombre;
        select.appendChild(option);
    });
}

/*******************************
 * VALIDACIONES
 *******************************/
function validarFecha() {
    const fecha = document.getElementById("fechaInput").value;
    if (!fecha) return alert("Selecciona una fecha"), false;

    const date = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (date < hoy) return alert("Fecha inválida"), false;

    const dia = date.getDay();
    if (!disponibilidad.diasHabiles.includes(dia))
        return alert("Solo lunes a viernes"), false;

    return true;
}

function validarHora() {
    const hora = document.getElementById("horaInput").value;
    if (!hora) return alert("Selecciona una hora"), false;

    if (hora < disponibilidad.horaInicio || hora > disponibilidad.horaFin)
        return alert("Fuera de horario"), false;

    return true;
}

/*******************************
 * FLUJO DE PASOS
 *******************************/
function nextStep(step) {
    if (step === 1 && !servicioSeleccionado()) return;
    if (step === 2 && !empleadoSeleccionado()) return;
    if (step === 3 && !validarFecha()) return;
    if (step === 4 && !validarHora()) return;

    if (step === 4) generarResumen();

    document.getElementById("paso" + (step + 1)).classList.remove("d-none");
}

function servicioSeleccionado() {
    if (!document.getElementById("servicioSelect").value) {
        alert("Selecciona un servicio");
        return false;
    }
    return true;
}

function empleadoSeleccionado() {
    if (!document.getElementById("empleadoSelect").value) {
        alert("Selecciona un especialista");
        return false;
    }
    return true;
}

/*******************************
 * RESUMEN
 *******************************/
function generarResumen() {
    const servicio = servicios.find(
        s => s.id === document.getElementById("servicioSelect").value
    );
    const empleado = empleados.find(
        e => e.id === document.getElementById("empleadoSelect").value
    );

    const fecha = document.getElementById("fechaInput").value;
    const hora = document.getElementById("horaInput").value;
    const adelanto = servicio.precio * 0.1;

    document.getElementById("resumenBox").innerHTML = `
        <p><strong>Servicio:</strong> ${servicio.nombre}</p>
        <p><strong>Especialista:</strong> ${empleado.nombre}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora:</strong> ${hora}</p>
        <hr>
        <p><strong>Total:</strong> $${servicio.precio.toLocaleString()}</p>
        <p><strong>Adelanto:</strong> $${adelanto.toLocaleString()}</p>
    `;
}

/*******************************
 * GUARDAR CITA (BACKEND REAL)
 *******************************/
async function guardarCita() {
    try {
        const servicioId = document.getElementById("servicioSelect").value;
        const fecha = document.getElementById("fechaInput").value;
        const hora = document.getElementById("horaInput").value;

        const servicio = servicios.find(s => s.id === servicioId);

        const nuevaCita = {
            codAgenda: 1,
            fecha: fecha,
            hora: hora,
            estado: "Pendiente",
            idCatalogo: 1
        };

        const res = await fetch(`${API_URL}/Agenda`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaCita)
        });

        if (!res.ok) throw new Error("Error guardando cita");

        alert("Cita registrada correctamente");
        limpiarFormulario();
        cargarCitas();

    } catch (error) {
        console.error(error);
        alert("No se pudo registrar la cita");
    }
}

/*******************************
 * MOSTRAR CITAS
 *******************************/
function mostrarCitas() {
    const tabla = document.getElementById("tablaCitas");
    if (!tabla) return;

    tabla.innerHTML = "";

    citas.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.servicioId}</td>
            <td>${c.fecha}</td>
            <td>${c.hora}</td>
            <td>${c.estado}</td>
        `;
        tabla.appendChild(tr);
    });
}

/*******************************
 * UTILIDADES
 *******************************/
function limpiarFormulario() {
    ["servicioSelect", "empleadoSelect", "fechaInput", "horaInput"]
        .forEach(id => document.getElementById(id).value = "");

    for (let i = 2; i <= 7; i++) {
        const paso = document.getElementById("paso" + i);
        if (paso) paso.classList.add("d-none");
    }
}
