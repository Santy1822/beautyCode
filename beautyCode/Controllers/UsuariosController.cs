using Microsoft.AspNetCore.Mvc;
using beautyCode.Data;
using beautyCode.Models;
using Microsoft.EntityFrameworkCore;

namespace beautyCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("registro")]
        public async Task<IActionResult> Registrar(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return Ok("Usuario registrado correctamente");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string usuario, string contrasena)
        {
            var usuarioEncontrado = await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuarioNombre == usuario && u.Contrasena == contrasena);
            if (usuarioEncontrado == null)
            {
                return Unauthorized("credenciales incorrectas");
            }
            return Ok("inicio de sesion exitoso");
        }
    }
}