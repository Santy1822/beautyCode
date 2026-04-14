const API_URL = "http://localhost:5227/api";

document.addEventListener("DOMContentLoaded", cargarEmpleados);

// GET - Cargar empleados
async function cargarEmpleados() {
    try {
        const resUsuarios = await fetch(`${API_URL}/Usuarios`);
        const usuarios = await resUsuarios.json();

        const resEspecialidades = await fetch(`${API_URL}/Especialidad`);
        const especialidades = await resEspecialidades.json();

        const tbody = document.getElementById("employeeList");
        tbody.innerHTML = "";

        usuarios.forEach(u => {
            const esp = especialidades.find(e => e.codEspecialidad === u.noDocumento);
            const nombreEsp = esp ? esp.nombre : "Sin especialidad";

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${u.nombre}</td>
                <td>${u.telefono}</td>
                <td>${nombreEsp}</td>
                <td>
                    <button onclick="eliminarEmpleado('${u.noDocumento}', ${esp ? esp.idEspecialidad : 0})"
                    class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Error cargando empleados:", error);
    }
}

// POST - Registrar empleado + especialidad
const form = document.querySelector(".admin-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    const documento = Date.now().toString();

    const nuevoEmpleado = {
        noDocumento: documento,
        tipoDocumento: "CC",
        nombre: inputs[0].value.trim(),
        usuario: inputs[0].value.replace(/\s+/g, "").toLowerCase(),
        contrasena: "12345678",
        correo: inputs[0].value.replace(/\s+/g, "").toLowerCase() + "@beautycode.com",
        telefono: inputs[1].value.trim(),
        idRol: 3
    };

    const nuevaEspecialidad = {
        codEspecialidad: documento,
        nombre: inputs[2].value.trim()
    };

    try {
        await fetch(`${API_URL}/Usuarios/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoEmpleado)
        });

        await fetch(`${API_URL}/Especialidad`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaEspecialidad)
        });

        alert("Empleado registrado correctamente");
        form.reset();
        cargarEmpleados();

    } catch (error) {
        console.error("Error registrando empleado:", error);
    }
});

// DELETE - Eliminar empleado y su especialidad
async function eliminarEmpleado(docId, espId) {
    if (!confirm("¿Eliminar este empleado?")) return;

    try {
        await fetch(`${API_URL}/Usuarios/${docId}`, { method: "DELETE" });

        if (espId !== 0) {
            await fetch(`${API_URL}/Especialidad/${espId}`, { method: "DELETE" });
        }

        cargarEmpleados();

    } catch (error) {
        console.error("Error eliminando empleado:", error);
    }
}

// BUSCAR usuario por documento
async function buscarUsuario() {
    const documento = document.getElementById("buscarDocumento").value.trim();
    if (!documento) {
        alert("Ingresa un número de documento");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/Usuarios`);
        const usuarios = await res.json();

        const usuario = usuarios.find(u => u.noDocumento === documento);

        const filaBusqueda = document.getElementById("filaBusqueda");
        const resultadoBusqueda = document.getElementById("resultadoBusqueda");

        if (!usuario) {
            alert("Usuario no encontrado");
            resultadoBusqueda.style.display = "none";
            return;
        }

        const rol = usuario.idRol === 1 ? "Cliente" :
                    usuario.idRol === 2 ? "Administrador" : "Empleado";

        filaBusqueda.innerHTML = `
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${rol}</td>
                <td>
                    ${usuario.idRol !== 3 ?
                        `<button onclick="cambiarAEmpleado('${usuario.noDocumento}')" 
                        class="btn btn-success btn-sm">Hacer Empleado</button>`
                        : '<span style="color:green">Ya es Empleado</span>'}
                </td>
            </tr>
        `;

        resultadoBusqueda.style.display = "block";

    } catch (error) {
        console.error("Error buscando usuario:", error);
    }
}

// PUT - Cambiar rol a Empleado
async function cambiarAEmpleado(docId) {
    if (!confirm("¿Cambiar este usuario a Empleado?")) return;

    try {
        await fetch(`${API_URL}/Usuarios/${docId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idRol: 3 })
        });

        alert("Rol actualizado correctamente");
        document.getElementById("buscarDocumento").value = "";
        document.getElementById("resultadoBusqueda").style.display = "none";
        cargarEmpleados();

    } catch (error) {
        console.error("Error actualizando rol:", error);
    }
}