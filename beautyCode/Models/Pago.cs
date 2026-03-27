using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace beautyCode.Models
{
    [Table("Pago")]
    public class Pago
    {
        [Key] 
        [Column("idPago")]
        public int IdPago { get; set; }
        [Column("codPago")]
        public int CodPago { get; set; }
        [Column("fecha")]
        public DateTime Fecha { get; set; }
        [Column("hora")]
        public TimeSpan Hora { get; set; }
        [Column("pago10")]
        public Double Pago10 { get; set; }
        [Column("voucher")]
        public string Voucher { get; set;} ="";
        [Column("idResenas")]
        public int IdResenas { get; set;}
    }
}