// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
//
// namespace GeoInvaderAPI.Models.Core;
//
// public class Players
// {
//     [Key]
//     public int PlayerID { get; set; }
//
//     [ForeignKey("Form")]
//     public int FormID { get; set; }
//     public int Health { get; set; }
//     public int Score { get; set; }
//     public int HighScore { get; set; }
//
//     [ForeignKey("MovementStrategies")]
//     public int MovementStrategyID { get; set; }
// }