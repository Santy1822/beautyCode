using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models
{
    public enum Calificacion
    {
        Excelente = 5,
        Bueno = 4,
        Regular = 3,
        Malo = 2,
        Pesimo = 1
    }

    [Table("resenas")]
    public class Resenas
    {
        [Key]
        [Column("idResenas")]
        public int IdResenas { get; set; }

        [Column("codResenas")]
        public int CodResenas { get; set; }

        [Column("calificacion")]
        public int MiCalificacion { get; set; }

        [Column("comentarios")]
        public string Comentarios { get; set; } = "";

        [Column("fecha")]
        public DateTime Fecha { get; set; }
    }
}