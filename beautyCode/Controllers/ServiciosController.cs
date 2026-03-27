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
    }    
}