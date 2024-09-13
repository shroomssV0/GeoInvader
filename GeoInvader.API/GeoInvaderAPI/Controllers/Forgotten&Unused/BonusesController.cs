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
//     public class BonusesController : ControllerBase
//     {
//         private readonly GeoInvaderDataContext _context;
//
//         public BonusesController(GeoInvaderDataContext context)
//         {
//             _context = context;
//         }
//
//         // GET: Fetch tout les bonus
//         [HttpGet]
//         public IActionResult GetAllBonuses()
//         {
//             var bonuses = _context.Bonuses
//                 .AsNoTracking()
//                 .Select(b => new BonusDTO
//                 {
//                     BonusID = b.BonusID,
//                     FormID = b.FormID,
//                     BonusTypeID = b.BonusTypeID
//                 })
//                 .ToList();
//
//             return Ok(bonuses);
//         }
//
//         // GET par id un bonus a la fois 
//         [HttpGet("{id}")]
//         public IActionResult GetBonus(int id)
//         {
//             var bonus = _context.Bonuses
//                 .AsNoTracking()
//                 .Where(b => b.BonusID == id)
//                 .Select(b => new BonusDTO
//                 {
//                     BonusID = b.BonusID,
//                     FormID = b.FormID,
//                     BonusTypeID = b.BonusTypeID
//                 })
//                 .FirstOrDefault();
//
//             if (bonus == null)
//             {
//                 return NotFound($"Bonus with ID {id} not found.");
//             }
//
//             return Ok(bonus);
//         }
//
//         // POST: Créer un nouveau Bonus
//         [HttpPost]
//         public IActionResult CreateBonus([FromBody] BonusDTO bonusDto)
//         {
//             var bonus = new Bonuses
//             {
//                 FormID = bonusDto.FormID,
//                 BonusTypeID = bonusDto.BonusTypeID
//             };
//
//             _context.Bonuses.Add(bonus);
//             _context.SaveChanges();
//
//             return CreatedAtAction(nameof(GetBonus), new { id = bonus.BonusID }, bonusDto);
//         }
//
//         // PUT: Modifie un bonus existant
//         [HttpPut("{id}")]
//         public IActionResult UpdateBonus(int id, [FromBody] BonusDTO bonusDto)
//         {
//             var bonus = _context.Bonuses.Find(id);
//             if (bonus == null)
//             {
//                 return NotFound($"Bonus with ID {id} not found.");
//             }
//
//             bonus.FormID = bonusDto.FormID;
//             bonus.BonusTypeID = bonusDto.BonusTypeID;
//
//             _context.SaveChanges();
//
//             return NoContent();
//         }
//
//         // DELETE: Supprime un bonus
//         [HttpDelete("{id}")]
//         public IActionResult DeleteBonus(int id)
//         {
//             var bonus = _context.Bonuses.Find(id);
//             if (bonus == null)
//             {
//                 return NotFound($"Bonus with ID {id} not found.");
//             }
//
//             _context.Bonuses.Remove(bonus);
//             _context.SaveChanges();
//             return NoContent();
//         }
//     }
//     public class BonusDTO
//     {
//         public int BonusID { get; set; }
//         public int FormID { get; set; }
//         public int BonusTypeID { get; set; }
//         
//     }
// }
