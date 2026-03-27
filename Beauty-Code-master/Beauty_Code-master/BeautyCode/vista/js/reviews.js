/*********************************
 * CONFIGURACIÓN
 *********************************/
const API_URL = "http://localhost:5227/api";

/*********************************
 * OBTENER RESEÑAS
 *********************************/
async function cargarResenas() {
    try {
        const res = await fetch(`${API_URL}/resenas`);
        if (!res.ok) throw new Error("Error al cargar reseñas");
        return await res.json();
    } catch (error) {
        console.error(error);
        alert("No se pudieron cargar las reseñas");
        return [];
    }
}

/*********************************
 * MOSTRAR RESEÑAS
 *********************************/
async function mostrarResenas() {
    const contenedor = document.getElementById("reviewsList");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const resenas = await cargarResenas();

    resenas.forEach(r => {
        const card = document.createElement("div");
        card.className = "review-card";

        const estrellas =
            "★".repeat(r.rating) + "☆".repeat(5 - r.rating);

        card.innerHTML = `
            <div class="review-header">
                <strong>${r.nombre}</strong>
                <span class="review-stars">${estrellas}</span>
            </div>

            <p class="review-servicio">
                Servicio: ${r.servicio}
            </p>

            <p class="review-comentario">
                ${r.comentario}
            </p>

            <button class="btn-delete"
                onclick="eliminarResena('${r.id}')">
                ✖
            </button>
        `;

        contenedor.appendChild(card);
    });
}

/*********************************
 * CREAR RESEÑA
 *********************************/
async function guardarResena() {
    const nombre = document.getElementById("inputNombre").value.trim();
    const servicio = document.getElementById("inputServicio").value.trim();
    const rating = parseInt(document.getElementById("inputRating").value);
    const comentario = document.getElementById("inputComentario").value.trim();

    if (!nombre || !servicio || !comentario) {
        alert("Completa todos los campos");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/resenas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, servicio, rating, comentario })
        });

        if (!res.ok) throw new Error();

        cerrarModal();
        mostrarResenas();

    } catch (error) {
        console.error(error);
        alert("No se pudo guardar la reseña");
    }
}

/*********************************
 * ELIMINAR RESEÑA
 *********************************/
async function eliminarResena(id) {
    if (!confirm("¿Eliminar esta reseña?")) return;

    try {
        const res = await fetch(`${API_URL}/resenas/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error();

        mostrarResenas();

    } catch (error) {
        console.error(error);
        alert("No se pudo eliminar la reseña");
    }
}

/*********************************
 * MODAL
 *********************************/
const modal = document.getElementById("modalResena");

function abrirModal() {
    limpiarFormulario();
    modal.style.display = "flex";
}

function cerrarModal() {
    modal.style.display = "none";
}

function limpiarFormulario() {
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputServicio").value = "";
    document.getElementById("inputRating").value = "5";
    document.getElementById("inputComentario").value = "";
}

/*********************************
 * EVENTOS
 *********************************/
document.getElementById("btnGuardarResena")
    .addEventListener("click", guardarResena);

document.getElementById("btnAbrirResena")
    .addEventListener("click", abrirModal);

document.getElementById("btnCancelar")
    .addEventListener("click", cerrarModal);

document.addEventListener("DOMContentLoaded", mostrarResenas);
