using Microsoft.AspNetCore.Mvc;
using GeoInvaderAPI.Data;
using GeoInvaderAPI.Models.Core;
using System.Linq;
using GeoInvaderAPI.ModelBinders;
using Microsoft.EntityFrameworkCore;
using Npgsql.Internal;

namespace GeoInvaderAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormController : ControllerBase
    {
        private readonly GeoInvaderDataContext _context;

        public FormController(GeoInvaderDataContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Retrieves all forms.
        /// </summary>
        /// <returns>A list of form DTOs.</returns>
        /// <response code="200">Returns the list of form DTOs</response>
        [HttpGet]
        public IActionResult GetForm()
        {
            var shapes = _context.Form
                .AsNoTracking()
                .ToList() 
                .Select(s => CreateFormDto(s)) 
                .ToList();

            return Ok(shapes);
        }
        /// <summary>
        /// Retrieves forms of a specific type.
        /// </summary>
        /// <param name="shapeType">The type of shape to retrieve.</param>
        /// <returns>A list of form DTOs of the specified type.</returns>
        /// <response code="200">Returns the list of form DTOs of the specified type</response>
        /// <response code="404">If no forms of the specified type are found</response>
        [HttpGet("{shapeType}")]
        public IActionResult GetForm(string shapeType)
        {
            var shapes = _context.Form
                .AsNoTracking()
                .ToList() 
                .Where(s => s.GetType().Name.Equals(shapeType, StringComparison.OrdinalIgnoreCase))
                .Select(s => CreateFormDto(s))
                .ToList();

            if (!shapes.Any())
            {
                return NotFound($"No shapes found for type: {shapeType}");
            }

            return Ok(shapes);
        }
        /// <summary>
        /// Retrieves a form by its ID.
        /// </summary>
        /// <param name="id">The ID of the form to retrieve.</param>
        /// <returns>The form DTO.</returns>
        /// <response code="200">Returns the form DTO</response>
        /// <response code="404">If no form with the specified ID is found</response>
        [HttpGet("{id:int}")]
        public IActionResult GetFormById(int id)
        {
            var form = _context.Form
                .AsNoTracking()
                .FirstOrDefault(f => f.Id == id); 

            if (form == null)
            {
                return NotFound($"No form found with ID: {id}");
            }

            var formDto = CreateFormDto(form); 
            return Ok(formDto);
        }
        
        /// <summary>
        /// Creates a new form.
        /// </summary>
        /// <remarks>
        /// Sample requests:
        ///
        /// Cercle example:
        /// 
        ///  
        ///     {
        ///        "formType": "Cercle",
        ///        "x": 5,
        ///        "y": 3,
        ///        "gameID": 1,
        ///        "radius": 10
        ///     }
        ///
        /// Rectangle example:
        /// 
        /// 
        ///     {
        ///         "formType": "Rectangle",
        ///         "x": 10,
        ///         "y": 20,
        ///         "gameID": 1,
        ///         "length": 15,
        ///         "width": 10
        ///     }
        ///
        ///  Triangle example:
        /// 
        /// 
        ///     {
        ///         "formType": "Triangle",
        ///         "x": 10,
        ///         "y": 20,
        ///         "gameID": 1,
        ///         "base": 15,
        ///         "height": 10
        ///     }
        ///
        /// </remarks>
        /// <param name="formDto">The form DTO to create.</param>
        /// <returns>A newly created Form</returns>
        /// <response code="201">Returns the newly created form</response>
        /// <response code="400">If the form is null or invalid</response>
        [HttpPost]
        public IActionResult CreateForm([FromBody] FormDto formDto)
        {
            Form form;

            switch (formDto.FormType.ToLower()) // Assuming ShapeType is the correct property name
            {
                case "cercle":
                    form = new Cercle { Radius = formDto.Radius ?? 0 };
                    break;
                case "rectangle":
                    form = new Rectangle { Length = formDto.Length ?? 0, Width = formDto.Width ?? 0 };
                    break;
                case "triangle":
                    form = new Triangle { Base = formDto.Base ?? 0, Height = formDto.Height ?? 0 };
                    break;
                default:
                    return BadRequest("Invalid shape type.");
            }

            form.X = formDto.X;
            form.Y = formDto.Y;
            form.GameID = formDto.GameID;
            form.Role = formDto.Role;

            _context.Form.Add(form);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetFormById), new { id = form.Id }, form);
        }
        /// <summary>
        /// Retrieves all form by their gameId.
        /// </summary>
        /// <param name="gameId">The gameId of the forms to retrieve.</param>
        /// <returns>All the shapes in a game.</returns>
        /// <response code="200">Returns all the shapes in a game.</response>
        /// <response code="404">If no forms with the specified gameId is found</response>
        [HttpGet("Game/{gameId}")]
        public IActionResult GetFormsByGameId(int gameId)
        {
            var forms = _context.Form
                .AsNoTracking()
                .Where(f => f.GameID == gameId)
                .ToList();
            
            var shapesWithGame = forms.Select(f => new FormDto
            {
                Id = f.Id,
                FormType = f.GetType().Name,
                GameID = f.GameID,
                Role = f.Role,
                X = f.X,
                Y = f.Y,
                Radius = f is Cercle c ? c.Radius : null,
                Length = f is Rectangle r ? r.Length : null,
                Width = f is Rectangle r2 ? r2.Width : null,
                Base = f is Triangle t ? t.Base : null,
                Height = f is Triangle t2 ? t2.Height : null 
            }).ToList();

            return Ok(shapesWithGame);
        }

        /// <summary>
        /// Update a form by its ID.
        /// </summary>
        /// <param name="id">The ID of the form to uptade.</param>
        /// <response code="200">Returns the form DTO</response>
        /// <response code="404">If no form with the specified ID is found</response>
        [HttpPut("{id}")]
        public IActionResult UpdateForm(int id, [FromBody] FormDto updatedShape)
        {
            var shape = _context.Form.Find(id);
            if (shape == null)
            {
                return NotFound();
            }

            _context.Entry(shape).CurrentValues.SetValues(updatedShape);
            _context.SaveChanges();
            return NoContent();
        }
        /// <summary>
        /// Delete a form by its ID.
        /// </summary>
        /// <param name="id">The ID of the form to delete.</param>
        /// <response code="200">The shapes with this gameId has been deleted</response>
        /// <response code="404">If no form with the specified ID is found</response>
        [HttpDelete("{id}")]
        public IActionResult DeleteForm(int id)
        {
            var shape = _context.Form.Find(id);
            if (shape == null)
            {
                return NotFound();
            }

            _context.Form.Remove(shape);
            _context.SaveChanges();
            return NoContent();
        }
        
        private static FormDto CreateFormDto(Form form)
        {
            return new FormDto
            {
                FormType = form.GetType().Name,
                Id  = form.Id,
                GameID = form.GameID,
                Role = form.Role,
                X = form.X,
                Y =  form.Y,
                Radius = form is Cercle cercle ? cercle.Radius : (float?)null, 
                Length = form is Rectangle rectangle ? rectangle.Length : (float?)null, 
                Width = form is Rectangle rect ? rect.Width : (float?)null, 
                Base = form is Triangle triangle ? triangle.Base : (float?)null, 
                Height = form is Triangle tri ? tri.Height : (float?)null 
            };
        }

    }
}
