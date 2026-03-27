using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models 
{
    [Table("rol")]
    public class Rol
    {
        [Key]
        [Column("idRol")]
        public int IdRol { get; set; }
        [Column("codRol")]
        public int CodRol { get; set; }
        [Column("nombre")]
        public string Nombre { get; set; } = "";
    } 
    }
