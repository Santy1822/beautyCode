using Microsoft.AspNetCore.Mvc;
using beautyCode.Data;
using beautyCode.Models;
using Microsoft.EntityFrameworkCore;

namespace beautyCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EspecialidadController : ControllerBase
    {
        private readonly AppDbContext _context;
        public EspecialidadController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetEspecialidades()
        {
            var especialidades = await _context.Especialidades.ToListAsync();
            return Ok(especialidades);
        }

        [HttpPost]
        public async Task<IActionResult> CrearEspecialidad([FromBody] Especialidad especialidad)
        {
            _context.Especialidades.Add(especialidad);
            await _context.SaveChangesAsync();
            return Ok(especialidad);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarEspecialidad(int id)
        {
            var especialidad = await _context.Especialidades.FindAsync(id);
            if (especialidad == null) return NotFound();

            _context.Especialidades.Remove(especialidad);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}