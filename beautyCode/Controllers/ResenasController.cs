using Microsoft.AspNetCore.Mvc;
using beautyCode.Data;
using beautyCode.Models;
using Microsoft.EntityFrameworkCore;

namespace beautyCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResenasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ResenasController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetResenas()
        {
            var resenas = await _context.Resenas.ToListAsync();
            return Ok(resenas);
        }
        [HttpPost]
        public async Task<IActionResult> PostResena(Resenas resena)
        {
            _context.Resenas.Add(resena);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResenas", new { id = resena.IdResenas }, resena);
        }
    }
}