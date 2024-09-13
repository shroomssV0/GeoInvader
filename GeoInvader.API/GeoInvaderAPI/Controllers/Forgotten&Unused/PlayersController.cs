// using Microsoft.AspNetCore.Mvc;
// using GeoInvaderAPI.Data;
// using GeoInvaderAPI.Models.Core;
// using System.Linq;
// using Microsoft.EntityFrameworkCore;
//
// namespace GeoInvaderAPI.Controllers
// {
//     [ApiController]
//     [Route("[controller]")]
//     public class PlayersController : ControllerBase
//     {
//         private readonly GeoInvaderDataContext _context;
//
//         public PlayersController(GeoInvaderDataContext context)
//         {
//             _context = context;
//         }
//
//         // GET: Fetch tout les joueurs
//         [HttpGet]
//         public IActionResult GetAllPlayers()
//         {
//             var players = _context.Players
//                 .AsNoTracking()
//                 .ToList() 
//                 .Select(p => new PlayerDto
//                 {
//                     PlayerID = p.PlayerID,
//                     Health = p.Health,
//                     Score = p.Score,
//                     HighScore = p.HighScore,
//                     MovementStrategyID = p.MovementStrategyID
//                 })
//                 .ToList();
//
//             return Ok(players);
//         }
//
//         // GET: Fetch un joueur par sont id 
//         [HttpGet("{id}")]
//         public IActionResult GetPlayer(int id)
//         {
//             var player = _context.Players
//                 .AsNoTracking()
//                 .FirstOrDefault(p => p.PlayerID == id);
//
//             if (player == null)
//             {
//                 return NotFound($"Player with ID {id} not found.");
//             }
//
//             var playerDto = new PlayerDto
//             {
//                 PlayerID = player.PlayerID,
//                 Health = player.Health,
//                 Score = player.Score,
//                 HighScore = player.HighScore,
//                 MovementStrategyID = player.MovementStrategyID
//             };
//
//             return Ok(playerDto);
//         }
//
//         // POST: Ajoute un nouveau joueur
//         [HttpPost]
//         public IActionResult CreatePlayer([FromBody] Players newPlayer)
//         {
//             _context.Players.Add(newPlayer);
//             _context.SaveChanges();
//
//             return CreatedAtAction(nameof(GetPlayer), new { id = newPlayer.PlayerID }, newPlayer);
//         }
//
//         // PUT: Met a jour un joueur
//         [HttpPut("{id}")]
//         public IActionResult UpdatePlayer(int id, [FromBody] Players playerUpdate)
//         {
//             var player = _context.Players.Find(id);
//             if (player == null)
//             {
//                 return NotFound($"Player with ID {id} not found.");
//             }
//
//             _context.Entry(player).CurrentValues.SetValues(playerUpdate);
//             _context.SaveChanges();
//
//             return NoContent();
//         }
//
//         // DELETE: Supprime un joueur avec son id 
//         [HttpDelete("{id}")]
//         public IActionResult DeletePlayer(int id)
//         {
//             var player = _context.Players.Find(id);
//             if (player == null)
//             {
//                 return NotFound($"Player with ID {id} not found.");
//             }
//
//             _context.Players.Remove(player);
//             _context.SaveChanges();
//
//             return NoContent();
//         }
//
//         public class PlayerDto
//         {
//             public int PlayerID { get; set; }
//             public int Health { get; set; }
//             public int Score { get; set; }
//             public int HighScore { get; set; }
//             public int MovementStrategyID { get; set; }
//         }
//     }
// }
