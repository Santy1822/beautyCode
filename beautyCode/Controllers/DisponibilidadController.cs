using Microsoft.AspNetCore.Mvc;
using beautyCode.Data;
using beautyCode.Models;
using Microsoft.EntityFrameworkCore;
 
namespace beautyCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DisponibilidadController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DisponibilidadController(AppDbContext context)
        {
            _context = context;
        }
 
        [HttpGet]
        public async Task<IActionResult> GetDisponibilidad()
        {
            var disponibilidad = await _context.Disponibilidades.ToListAsync();
            return Ok(disponibilidad);
        }
 
        [HttpPost]
        public async Task<IActionResult> CreateDisponibilidad([FromBody] Disponibilidad disponibilidad)
        {
            disponibilidad.CodDisponibilidad = (int)(DateTimeOffset.UtcNow.ToUnixTimeSeconds() % 100000000);
            _context.Disponibilidades.Add(disponibilidad);
            await _context.SaveChangesAsync();
            return Ok(disponibilidad);
        }
 
        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarDisponibilidad(int id)
        {
            var disponibilidad = await _context.Disponibilidades.FindAsync(id);
            if (disponibilidad == null)
                return NotFound("Horario no encontrado");
 
            _context.Disponibilidades.Remove(disponibilidad);
            await _context.SaveChangesAsync();
            return Ok("Horario eliminado correctamente");
        }
    }
}