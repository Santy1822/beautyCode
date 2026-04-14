using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models
{
    [Table("agenda")]
    public class Agenda
    {
        [Key]
        [Column("idAgenda")]
        public int IdAgenda { get; set; }

        [Column("codAgenda")]
        public string CodAgenda { get; set; } = "";

        [Column("fecha")]
        public DateTime Fecha { get; set; }

        [Column("estado")]
        public string Estado { get; set; } = "Pendiente";

        [Column("creadoEn")]
        public DateTime CreadoEn { get; set; } = DateTime.Now;

        [Column("idCatalogo")]
        public int IdCatalogo { get; set; }

        [Column("idUsuario")]
        public int IdUsuario { get; set; }

        [Column("idEmpleado")]
        public int IdEmpleado { get; set; }

        [Column("idServicios")]
        public int? IdServicios { get; set; }
    }
}