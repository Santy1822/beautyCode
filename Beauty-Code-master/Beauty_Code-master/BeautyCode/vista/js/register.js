document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const contrasena = document.getElementById("password").value.trim();
        const confirmar = document.getElementById("confirmpassword").value.trim();
        const telefono = document.getElementById("phone").value.trim();
        const tipoDocumento = document.getElementById("doctype").value;
        const numeroDocumento = document.getElementById("document").value.trim();

        const errorSpan = document.getElementById("error-password");

        if (contrasena !== confirmar) {
            errorSpan.textContent = "Las contraseñas no coinciden";
            return;
        }

        errorSpan.textContent = "";

        try {
            const response = await fetch("http://localhost:5227/api/usuarios/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre,
                    correo: email,
                    contrasena: contrasena,
                    telefono: telefono,
                    tipoDocumento: tipoDocumento,
                    noDocumento: numeroDocumento,
                    usuarioNombre: nombre,
                    idRol: 1
                })
            });

            if (!response.ok) {
                alert("Error al registrar usuario");
                return;
            }

            alert("Usuario registrado correctamente");
            window.location.href = "login.html";

        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor");
        }
    });
});


