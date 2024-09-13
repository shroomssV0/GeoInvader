using Microsoft.AspNetCore.Mvc;
using GeoInvaderAPI.Data;
using GeoInvaderAPI.Models.Core;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace GeoInvaderAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        private readonly GeoInvaderDataContext _context;

        public GameController(GeoInvaderDataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Fetches all games.
        /// </summary>
        /// <returns>A list of all games.</returns>
        /// <response code="200">Returns the list of games</response>
        [HttpGet]
        public IActionResult GetAllGames()
        {
            var games = _context.Game
                .AsNoTracking()
                .Select(g => new GameDTO
                {
                    GameID = g.GetGameID(),
                    Name = g.GetName(),
                    DifficultyLevel = g.GetDifficultyLevel(),
                    CurrentScore = g.GetCurrentScore(),
                    HighScore = g.GetHighScores() // Assuming HighScores is a singular high score property
                })
                .ToList();

            return Ok(games);
        }

        /// <summary>
        /// Fetches a specific game by ID, including its associated forms.
        /// </summary>
        /// <param name="id">The ID of the game to retrieve.</param>
        /// <returns>The game matching the given ID, including its forms.</returns>
        /// <response code="200">Returns the game matching the ID, including its forms</response>
        /// <response code="404">If no game with the specified ID is found</response>
        [HttpGet("{id}")]
        public IActionResult GetGame(int id)
        {
            var game = _context.Game
                .AsNoTracking()
                .Include(g => g.Forms)
                .FirstOrDefault(g => g.GameID == id);

            if (game == null)
            {
                return NotFound($"Game with ID {id} not found.");
            }
            
            var gameDto = new GameDetailsDTO
            {
                GameID = game.GameID,
                Name = game.Name,
                DifficultyLevel = game.DifficultyLevel,
                CurrentScore = game.CurrentScore,
                HighScore = game.HighScores,
                Forms = game.Forms.Select(f => new FormDto
                {
                    FormType = f.GetType().Name,
                    Id = f.Id,
                    Area = f.GetArea(),
                    Perimeter = f.GetPerimeter(),
                    GameID = f.GameID,
                    Role = f.Role,
                    X = f.X,
                    Y = f.Y,
                    Radius = f is Cercle c ? c.Radius : null,
                    Length = f is Rectangle r ? r.Length : null,
                    Width = f is Rectangle r2 ? r2.Width : null,
                    Base = f is Triangle t ? t.Base : null,
                    Height = f is Triangle t2 ? t2.Height : null,
                }).ToList()
            };
            return Ok(gameDto);
        }



        /// <summary>
        /// Creates a new game.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Game
        ///     {
        ///         "difficultyLevel": 2,
        ///         "currentScore": 0,
        ///         "highScore": 100
        ///     }
        /// </remarks>
        /// <param name="gameDto">The game data transfer object.</param>
        /// <returns>A newly created game.</returns>
        /// <response code="201">Returns the newly created game</response>
        /// <response code="400">If the game is null or invalid</response>
        [HttpPost]
        public IActionResult CreateGame([FromBody] GameDTO gameDto)
        {
            var game = new Game
            {
                DifficultyLevel = gameDto.DifficultyLevel,
                Name = gameDto.Name,
                CurrentScore = gameDto.CurrentScore,
                HighScores = gameDto.HighScore 
            };

            _context.Game.Add(game);
            _context.SaveChanges();

            // Assuming your Game entity has a property `GameID` that gets set upon saving
            return CreatedAtAction(nameof(GetGame), new { id = game.GameID }, game);
        }

        /// <summary>
        /// Updates an existing game.
        /// </summary>
        /// <param name="id">The ID of the game to update.</param>
        /// <param name="gameDto">The updated game data.</param>
        /// <returns>No content.</returns>
        /// <response code="204">Indicates that the game has been successfully updated</response>
        /// <response code="404">If no game with the specified ID is found</response>
        [HttpPut("{id}")]
        public IActionResult UpdateGame(int id, [FromBody] GameDTO gameDto)
        {
            var game = _context.Game.Find(id);
            if (game == null)
            {
                return NotFound($"Game with ID {id} not found.");
            }

            game.DifficultyLevel = gameDto.DifficultyLevel;
            game.Name = gameDto.Name;
            game.CurrentScore = gameDto.CurrentScore;
            game.HighScores = gameDto.HighScore;

            _context.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Deletes a game by ID.
        /// </summary>
        /// <param name="id">The ID of the game to delete.</param>
        /// <returns>No content.</returns>
        /// <response code="204">Indicates that the game has been successfully deleted</response>
        /// <response code="404">If no game with the specified ID is found</response>
        [HttpDelete("{id}")]
        public IActionResult DeleteGame(int id)
        {
            var game = _context.Game.Find(id);
            if (game == null)
            {
                return NotFound($"Game with ID {id} not found.");
            }

            _context.Game.Remove(game);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
