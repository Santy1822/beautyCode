using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models
{
    [Table("catalogo")]
    public class Catalogo
    {
        [Key]
        [Column("idCatalogo")]
        public int IdCatalogo { get; set; }
        [Column("codCatalogo")]

        public int CodCatalogo { get; set; }
        [Column("tipoServicio")]
        public string TipoServicio { get; set; } = "";

    }
}