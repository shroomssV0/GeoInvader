// using Microsoft.AspNetCore.Mvc;
// using GeoInvader.Model;
// using System.Collections.Generic;
// using System.Linq;
//
// namespace GeoInvaderAPI.Controllers
// {
//     [ApiController]
//     [Route("[controller]")]
//     public class TriangleController : ControllerBase
//     {
//         [HttpGet]
//         public IActionResult GetTriangles()
//         {
//             var triangles = new List<Triangle>
//             {
//                 new Triangle(0, 0, 3, 3),
//                 new Triangle(0, 0, 5, 4.33)
//             };
//
//             return Ok(triangles.Select(t => new
//             {
//                 Type = t.GetType().Name,
//                 Area = t.GetArea(),
//                 Perimeter = t.GetPerimeter(),
//                 Position = t.GetPosition(),
//                 Base = t.GetBaseLengh(),
//                 Heigth = t.GetHeight()
//             }));
//         }
//     }
// }