const API_URL = "http://localhost:5227/api";

/* ============================
        USUARIOS
============================ */

// Obtener usuarios
export async function getUsers() {
    const res = await fetch(`${API_URL}/Usuarios`);
    return await res.json();
}

// Registro
export async function createUser(userData) {
    const res = await fetch(`${API_URL}/Usuarios/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return await res.json();
}

// Login
export async function loginUser(data) {
    const res = await fetch(`${API_URL}/Usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await res.json();
}


/* ============================
        AGENDA (CITAS)
============================ */

export async function getAppointments() {
    const res = await fetch(`${API_URL}/Agenda`);
    return await res.json();
}


/* ============================
        SERVICIOS
============================ */

export async function getServices() {
    const res = await fetch(`${API_URL}/Servicios`);
    return await res.json();
}


/* ============================
        CATALOGO (CATEGORIAS)
============================ */

export async function getCategories() {
    const res = await fetch(`${API_URL}/Catalogo`);
    return await res.json();
}


/* ============================
        PAGOS
============================ */

export async function getPayments() {
    const res = await fetch(`${API_URL}/Pago`);
    return await res.json();
}


/* ============================
        RESEÑAS
============================ */

export async function getReviews() {
    const res = await fetch(`${API_URL}/Resenas`);
    return await res.json();
}