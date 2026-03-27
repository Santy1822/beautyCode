using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models
{
    [Table("usuarios")]
    public class Usuario
    {
        [Key]
        [Column("IdUsuario")]
        public int IdUsuario { get; set; }
        [Column("NoDocumento")] 
        public string NoDocumento { get; set; } = "";
        [Column("TipoDocumento")]

        public string TipoDocumento { get; set; } = "";
        [Column("Nombre")]

        public string Nombre { get; set; } = "";
        
        [Column("usuario")]
        public string UsuarioNombre { get; set; } = "";
        
        [Column("contrasena")]
        public string Contrasena { get; set; } = "";
        [Column("correo")]
        public string Correo { get; set; } = "";
        [Column("telefono")]

        public string Telefono { get; set; } = "";
         [Column("IdRol")]
        public int IdRol { get; set; }
    }
}