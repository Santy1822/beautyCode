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
        public int CodAgenda { get; set; }  
        [Column("fecha")]
        public DateTime Fecha { get; set; }
        [Column("hora")]
        public TimeSpan Hora { get; set; }
        [Column("estado")]
        public string Estado { get; set; } = "";
        [Column("idCatalogo")]
        public int IdCatalogo { get; set; }


    }
}