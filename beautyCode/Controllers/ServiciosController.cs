using Microsoft.AspNetCore.Mvc;
using beautyCode.Data;
using beautyCode.Models;
using Microsoft.EntityFrameworkCore;

namespace beautyCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiciosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ServiciosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetServicios()
        {
            var servicios = await _context.Servicios.ToListAsync();
            return Ok(servicios);
        }

        [HttpPost]
        public async Task<IActionResult> CrearServicio([FromBody] Servicio servicio)
        {
            servicio.CodServicio = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
            servicio.CreadoEn = DateTime.Now;
            servicio.Activo = true;
            servicio.IdCatalogo = 1;
            _context.Servicios.Add(servicio);
            await _context.SaveChangesAsync();
            return Ok(servicio);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarServicio(int id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null) return NotFound();

            _context.Servicios.Remove(servicio);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}