// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
//
// namespace GeoInvaderAPI.Models.Core;
//
// public class Projectiles
// {
//     [Key]
//     public int ProjectileID { get; set; } 
//
//     [ForeignKey("Form")]  
//     public int FormID { get; set; } 
//     public int Speed { get; set; }
//     public int Damage { get; set; }
//
//     [ForeignKey("MovementStrategies")]
//     public int MovementStrategyID { get; set; } 
//     public MovementStrategies MovementStrategy { get; set; } 
//
//     [ForeignKey("Players")]
//     public int FiredByPlayerID { get; set; } 
//     public Players Player { get; set; } 
// }