using Microsoft.AspNetCore.Mvc;
using beautyCode.Data;
using beautyCode.Models;
using Microsoft.EntityFrameworkCore;

namespace beautyCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolController : ControllerBase
    {
       private readonly AppDbContext _context;
       public RolController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rol>>> GetRols()
        {
            return await _context.Roles.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Rol>> PostRol(Rol rol)
        {
            _context.Roles.Add(rol);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRols", new { id = rol.IdRol }, rol);
        }
    }

}
