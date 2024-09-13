// using Microsoft.AspNetCore.Mvc;
// using GeoInvader.Model;
// using System.Collections.Generic;
// using System.Linq;
//
// namespace GeoInvaderAPI.Controllers
// {
//     [ApiController]
//     [Route("[controller]")]
//     public class RectangleController : ControllerBase
//     {
//         [HttpGet]
//         public IActionResult GetRectangles()
//         {
//             var rectangles = new List<Rectangle>
//             {
//                 new Rectangle(0, 0, 10, 1),
//                 new Rectangle(0, 0, 10, 10),
//                 new Rectangle(0, 0, 10, 20)
//             };
//
//             return Ok(rectangles.Select(r => new
//             {
//                 Type = r.GetType().Name,
//                 Area = r.GetArea(),
//                 Perimeter = r.GetPerimeter(),
//                 Position = r.GetPosition(),
//                 Length = r.GetLength(),
//                 Width = r.GetWidth()
//             }));
//         }
//     }
// }