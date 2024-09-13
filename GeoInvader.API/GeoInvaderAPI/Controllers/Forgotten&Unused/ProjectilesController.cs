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
//     public class ProjectilesController : ControllerBase
//     {
//         private readonly GeoInvaderDataContext _context;
//
//         public ProjectilesController(GeoInvaderDataContext context)
//         {
//             _context = context;
//         }
//
//         // GET: Fetch tout de la table projectiles
//         [HttpGet]
//         public IActionResult GetAllProjectiles()
//         {
//             var projectiles = _context.Projectiles
//                 .AsNoTracking()
//                 .Select(p => new ProjectileDTO
//                 {
//                     ProjectileID = p.ProjectileID,
//                     FormID = p.FormID,
//                     Speed = p.Speed,
//                     Damage = p.Damage,
//                     MovementStrategyID = p.MovementStrategyID,
//                     FiredByPlayerID = p.FiredByPlayerID
//                 })
//                 .ToList();
//
//             return Ok(projectiles);
//         }
//
//         // GET par ID: Fetch dans la table projectiles
//         [HttpGet("{id}")]
//         public IActionResult GetProjectile(int id)
//         {
//             var projectile = _context.Projectiles
//                 .AsNoTracking()
//                 .Where(p => p.ProjectileID == id)
//                 .Select(p => new ProjectileDTO
//                 {
//                     ProjectileID = p.ProjectileID,
//                     FormID = p.FormID,
//                     Speed = p.Speed,
//                     Damage = p.Damage,
//                     MovementStrategyID = p.MovementStrategyID,
//                     FiredByPlayerID = p.FiredByPlayerID
//                 })
//                 .FirstOrDefault();
//
//             if (projectile == null)
//             {
//                 return NotFound($"Projectile with ID {id} not found.");
//             }
//
//             return Ok(projectile);
//         }
//
//         // POST: Créer un nouveau projectile dans la table projectiles
//         [HttpPost]
//         public IActionResult CreateProjectile([FromBody] ProjectileDTO projectileDto)
//         {
//             var projectile = new Projectiles
//             {
//                 FormID = projectileDto.FormID,
//                 Speed = projectileDto.Speed,
//                 Damage = projectileDto.Damage,
//                 MovementStrategyID = projectileDto.MovementStrategyID,
//                 FiredByPlayerID = projectileDto.FiredByPlayerID
//             };
//
//             _context.Projectiles.Add(projectile);
//             _context.SaveChanges();
//
//             return CreatedAtAction(nameof(GetProjectile), new { id = projectile.ProjectileID }, projectileDto);
//         }
//
//         // PUT: Met a jour dans la table projectiles
//         [HttpPut("{id}")]
//         public IActionResult UpdateProjectile(int id, [FromBody] ProjectileDTO projectileDto)
//         {
//             var projectile = _context.Projectiles.Find(id);
//             if (projectile == null)
//             {
//                 return NotFound($"Projectile with ID {id} not found.");
//             }
//
//             projectile.FormID = projectileDto.FormID;
//             projectile.Speed = projectileDto.Speed;
//             projectile.Damage = projectileDto.Damage;
//             projectile.MovementStrategyID = projectileDto.MovementStrategyID;
//             projectile.FiredByPlayerID = projectileDto.FiredByPlayerID;
//
//             _context.SaveChanges();
//
//             return NoContent();
//         }
//
//         // DELETE: Supprime dans la table projectiles par id 
//         [HttpDelete("{id}")]
//         public IActionResult DeleteProjectile(int id)
//         {
//             var projectile = _context.Projectiles.Find(id);
//             if (projectile == null)
//             {
//                 return NotFound($"Projectile with ID {id} not found.");
//             }
//
//             _context.Projectiles.Remove(projectile);
//             _context.SaveChanges();
//             return NoContent();
//         }
//     }
//     public class ProjectileDTO
//     {
//         public int ProjectileID { get; set; }
//         public int FormID { get; set; }
//         public int Speed { get; set; }
//         public int Damage { get; set; }
//         public int MovementStrategyID { get; set; }
//         public int FiredByPlayerID { get; set; }
//
//         // You might want to include properties from related entities, like Form details, for more comprehensive data representation
//     }
// }
