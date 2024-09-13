// using Microsoft.AspNetCore.Mvc;
// using GeoInvader.Model;
// using System.Collections.Generic;
// using System.Linq;
//
// namespace GeoInvaderAPI.Controllers
// {
//     [ApiController]
//     [Route("[controller]")]
//     public class CercleController : ControllerBase
//     {
//         [HttpGet]
//         public IActionResult GetCercles()
//         {
//             var circles = new List<Cercle>
//             {
//                 new Cercle(0, 0, 1),
//                 new Cercle(0, 0, 2),
//                 new Cercle(0, 0, 3),
//                 new Cercle(0, 0, 4),
//                 new Cercle(0, 0, 5)
//             };
//
//             return Ok(circles.Select(c => new
//             {
//                 Type = c.GetType().Name,
//                 Area = c.GetArea(),
//                 Perimeter = c.GetPerimeter(),
//                 Position = c.GetPosition(),
//                 Radius = c.GetRadius()
//             }));
//         }
//     }
// }