using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models
{
    [Table("disponibilidad")]
    public class Disponibilidad
    {
        [Key]
        [Column("idDisponibilidad")]
        public int IdDisponibilidad { get;set;}
        [Column("codDisponibilidad")]

        public int CodDisponibilidad { get; set; }
        [Column("diaSemana")]
        public string DiaSemana { get; set; } = "";
        [Column("horaInicio")]

        public TimeSpan HoraInicio { get; set; }
        [Column("horaCierre")]
        public TimeSpan HoraCierre { get; set; }
        [Column("idUsuario")]

        public int IdUsuario { get; set; }


    }
}