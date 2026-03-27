using Microsoft.AspNetCore.Mvc; 
using beautyCode.Data;
using beautyCode.Models;    
using Microsoft.EntityFrameworkCore;

namespace beautyCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PagoController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetPagos()
        {
            var pagos = await _context.Pagos.ToListAsync();
            return Ok(pagos);
        }
        [HttpPost]
        public async Task<IActionResult> CreatePagos([FromBody] Pago pago)
        {
            _context.Pagos.Add(pago);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPagos), new { id = pago.IdPago }, pago);
        }
    }
}