using Microsoft.EntityFrameworkCore;
using beautyCode.Models;

namespace beautyCode.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<Agenda> Agendas { get; set; }
        public DbSet<Catalogo> Catalogos { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Resenas> Resenas { get; set; }
        public DbSet<Pago> Pagos { get; set; }
        public DbSet<Disponibilidad> Disponibilidades { get; set; }
        public DbSet<Especialidad> Especialidades { get; set; }
    }
}