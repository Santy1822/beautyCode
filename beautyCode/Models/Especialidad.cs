using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models
{
    [Table("especialidad")]
    public class Especialidad
    {
        [Key]
        [Column("idEspecialidad")]
        public int IdEspecialidad { get; set; }

        [Column("codEspecialidad")]
        public string CodEspecialidad { get; set; } = "";

        [Column("nombre")]
        public string Nombre { get; set; } = "";
    }
}