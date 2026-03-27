document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const respuesta = await fetch("http://localhost:5227/api/usuarios/login?usuario=" + email + "&contrasena=" + password, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!respuesta.ok) {
            alert("Usuario o contraseña incorrectos");
            return;
        }

        const data = await respuesta.text(); // ← aquí el cambio

        alert("Inicio de sesión exitoso");
        window.location.href = "index.html"; // ← aquí el cambio

    } catch (error) {
        alert("Error al conectar con el servidor");
        console.error(error);
    }
});