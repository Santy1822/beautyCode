using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace  beautyCode.Models
{
 
    [Table("servicios")]
    public class Servicio
    {
      [Key]
      [Column("idServicios")]
      public int IdServicio { get; set; }
      [Column("codServicio")]
      public int CodServicio { get; set; }
      [Column("nombre")]
      public string Nombre { get; set; } = "";
      [Column("precio")]  
      public double Precio { get; set; }
      [Column("imagen")]  
      public string Imagen { get; set; } = "";
      [Column("descripcion")] 
      public string Descripcion { get; set; } = "";
      [Column("idPago")]
      public int IdPago { get; set; }
      [Column("idCatalogo")]  
      public int IdCatalogo { get; set; }
      [Column("activo")]
      public bool Activo { get; set; }
    }
}