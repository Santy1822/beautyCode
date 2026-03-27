using Microsoft.AspNetCore.Mvc;
using beautyCode.Data;
using beautyCode.Models;
using Microsoft.EntityFrameworkCore;


namespace beautyCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgendaController : ControllerBase
    {
       private readonly AppDbContext _context;
        public AgendaController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> AgendarCita(Agenda agenda)
        {
            _context.Agendas.Add(agenda);
            await _context.SaveChangesAsync();
            return Ok("Cita agendada correctamente");
        }
        [HttpGet]
        public async Task<IActionResult> GetAgendas()
        {
            var agendas = await _context.Agendas.ToListAsync();
            return Ok(agendas);
        }
        [HttpDelete("{idAgenda}")]
        public async Task<IActionResult> CancelarCita(int idAgenda)
        {
            var agenda = await _context.Agendas.FindAsync(idAgenda);
            if (agenda == null)
            {
                return NotFound("Cita no encontrada");
            }
            _context.Agendas.Remove(agenda);
            await _context.SaveChangesAsync();
            return Ok("Cita cancelada correctamente");
        }
    }
}