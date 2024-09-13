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
//     public class EnemiesController : ControllerBase
//     {
//         private readonly GeoInvaderDataContext _context;
//
//         public EnemiesController(GeoInvaderDataContext context)
//         {
//             _context = context;
//         }
//
//         // GET: Fetch tout les ennemies
//         [HttpGet]
//         public IActionResult GetAllEnemies()
//         {
//             var enemies = _context.Enemies
//                 .AsNoTracking()
//                 .Select(e => new EnemyDTO
//                 {
//                     EnemyID = e.EnemyID,
//                     FormID = e.FormID,
//                     Health = e.Health,
//                     MovementStrategyID = e.MovementStrategyID,
//                     EnemyTypeID = e.EnemyTypeID
//                 })
//                 .ToList();
//
//             return Ok(enemies);
//         }
//
//         // GET par id un ennemie a la fois
//         [HttpGet("{id}")]
//         public IActionResult GetEnemy(int id)
//         {
//             var enemy = _context.Enemies
//                 .AsNoTracking()
//                 .Where(e => e.EnemyID == id)
//                 .Select(e => new EnemyDTO
//                 {
//                     EnemyID = e.EnemyID,
//                     FormID = e.FormID,
//                     Health = e.Health,
//                     MovementStrategyID = e.MovementStrategyID,
//                     EnemyTypeID = e.EnemyTypeID
//                 })
//                 .FirstOrDefault();
//
//             if (enemy == null)
//             {
//                 return NotFound($"Enemy with ID {id} not found.");
//             }
//
//             return Ok(enemy);
//         }
//
//         // POST: Créer un nouveau type d'ennemie
//         [HttpPost]
//         public IActionResult CreateEnemy([FromBody] EnemyDTO enemyDto)
//         {
//             var enemy = new Enemies
//             {
//                 FormID = enemyDto.FormID,
//                 Health = enemyDto.Health,
//                 MovementStrategyID = enemyDto.MovementStrategyID,
//                 EnemyTypeID = enemyDto.EnemyTypeID
//             };
//
//             _context.Enemies.Add(enemy);
//             _context.SaveChanges();
//
//             return CreatedAtAction(nameof(GetEnemy), new { id = enemy.EnemyID }, enemyDto);
//         }
//
//         // PUT: Met a jour un type d'ennemie
//         [HttpPut("{id}")]
//         public IActionResult UpdateEnemy(int id, [FromBody] EnemyDTO enemyDto)
//         {
//             var enemy = _context.Enemies.Find(id);
//             if (enemy == null)
//             {
//                 return NotFound($"Enemy with ID {id} not found.");
//             }
//
//             enemy.FormID = enemyDto.FormID;
//             enemy.Health = enemyDto.Health;
//             enemy.MovementStrategyID = enemyDto.MovementStrategyID;
//             enemy.EnemyTypeID = enemyDto.EnemyTypeID;
//
//             _context.SaveChanges();
//
//             return NoContent();
//         }
//
//         // DELETE: Supprime un ennemie
//         [HttpDelete("{id}")]
//         public IActionResult DeleteEnemy(int id)
//         {
//             var enemy = _context.Enemies.Find(id);
//             if (enemy == null)
//             {
//                 return NotFound($"Enemy with ID {id} not found.");
//             }
//
//             _context.Enemies.Remove(enemy);
//             _context.SaveChanges();
//             return NoContent();
//         }
//     }
//     public class EnemyDTO
//     {
//         public int EnemyID { get; set; }
//         public int FormID { get; set; }
//         public int Health { get; set; }
//         public int MovementStrategyID { get; set; }
//         public int EnemyTypeID { get; set; }
//         
//     }
// }
