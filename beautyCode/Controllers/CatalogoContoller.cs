using Microsoft.AspNetCore.Mvc;
using beautyCode.Data;
using beautyCode.Models;
using Microsoft.EntityFrameworkCore;


namespace beautyCode.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class  CatalogoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CatalogoController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Catalogo>>> GetCatalogos()
        {
            return await _context.Catalogos.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Catalogo>> PostCatalogo(Catalogo catalogo)
        {
            _context.Catalogos.Add(catalogo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCatalogos", new { id = catalogo.IdCatalogo }, catalogo);
        }
    }
}