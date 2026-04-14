using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models
{
    [Table("servicios")]
    public class Servicio
    {
        [Key]
        [Column("idServicios")]
        public int IdServicio { get; set; }

        [Column("codServicio")]
        public string CodServicio { get; set; } = "";

        [Column("nombre")]
        public string Nombre { get; set; } = "";

        [Column("precio")]
        public double Precio { get; set; }

        [Column("imagen")]
        public string Imagen { get; set; } = "";

        [Column("descripcion")]
        public string Descripcion { get; set; } = "";

        [Column("duracionMinutos")]
        public int DuracionMinutos { get; set; } = 60;

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [Column("creadoEn")]
        public DateTime CreadoEn { get; set; } = DateTime.Now;

        [Column("idCatalogo")]
        public int IdCatalogo { get; set; }

        
    }
}