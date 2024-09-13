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
//     public class MovementStrategiesController : ControllerBase
//     {
//         private readonly GeoInvaderDataContext _context;
//
//         public MovementStrategiesController(GeoInvaderDataContext context)
//         {
//             _context = context;
//         }
//
//         // GET: Fetch toute les Stratégies
//         [HttpGet]
//         public IActionResult GetAllMovementStrategies()
//         {
//             var strategies = _context.MovementStrategies
//                 .AsNoTracking()
//                 .Select(ms => new MovementStrategyDTO
//                 {
//                     MovementStrategyID = ms.MovementStrategyID,
//                     StrategyType = ms.StrategyType,
//                     Parameters = ms.Parameters
//                 })
//                 .ToList();
//
//             return Ok(strategies);
//         }
//
//         // GET par ID: Fetch une seul Stratégie par sont id
//         [HttpGet("{id}")]
//         public IActionResult GetMovementStrategy(int id)
//         {
//             var strategy = _context.MovementStrategies
//                 .AsNoTracking()
//                 .Where(ms => ms.MovementStrategyID == id)
//                 .Select(ms => new MovementStrategyDTO
//                 {
//                     MovementStrategyID = ms.MovementStrategyID,
//                     StrategyType = ms.StrategyType,
//                     Parameters = ms.Parameters
//                 })
//                 .FirstOrDefault();
//
//             if (strategy == null)
//             {
//                 return NotFound($"Movement strategy with ID {id} not found.");
//             }
//
//             return Ok(strategy);
//         }
//
//         // POST: Créer un nouvel Stratégie
//         [HttpPost]
//         public IActionResult CreateMovementStrategy([FromBody] MovementStrategyDTO strategyDto)
//         {
//             var strategy = new MovementStrategies
//             {
//                 StrategyType = strategyDto.StrategyType,
//                 Parameters = strategyDto.Parameters
//             };
//
//             _context.MovementStrategies.Add(strategy);
//             _context.SaveChanges();
//
//             return CreatedAtAction(nameof(GetMovementStrategy), new { id = strategy.MovementStrategyID }, strategyDto);
//         }
//
//         // PUT: Update une Stratégie
//         [HttpPut("{id}")]
//         public IActionResult UpdateMovementStrategy(int id, [FromBody] MovementStrategyDTO strategyDto)
//         {
//             var strategy = _context.MovementStrategies.Find(id);
//             if (strategy == null)
//             {
//                 return NotFound($"Movement strategy with ID {id} not found.");
//             }
//
//             strategy.StrategyType = strategyDto.StrategyType;
//             strategy.Parameters = strategyDto.Parameters;
//
//             _context.SaveChanges();
//
//             return NoContent();
//         }
//
//         // DELETE: Supprime une Stratégie avec sont Id
//         [HttpDelete("{id}")]
//         public IActionResult DeleteMovementStrategy(int id)
//         {
//             var strategy = _context.MovementStrategies.Find(id);
//             if (strategy == null)
//             {
//                 return NotFound($"Movement strategy with ID {id} not found.");
//             }
//
//             _context.MovementStrategies.Remove(strategy);
//             _context.SaveChanges();
//             return NoContent();
//         }
//     }
//     public class MovementStrategyDTO
//     {
//         public int MovementStrategyID { get; set; }
//         public string StrategyType { get; set; }
//         public string Parameters { get; set; } //  JSON 
//
//     }
// }
