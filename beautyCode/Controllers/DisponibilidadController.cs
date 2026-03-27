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
            _context.Disponibilidades.Add(disponibilidad);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDisponibilidad), new { id = disponibilidad.IdDisponibilidad }, disponibilidad);
        }
    }
}