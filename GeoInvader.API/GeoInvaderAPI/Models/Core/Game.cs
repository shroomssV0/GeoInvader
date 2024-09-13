using System.ComponentModel.DataAnnotations;

namespace GeoInvaderAPI.Models.Core;

public class Game
{
    [Key]
    public int GameID { get; set; } 

    public int DifficultyLevel { get; set; }

    public int CurrentScore { get; set; } 

    public int HighScores { get; set; } 
    public string Name { get; set; }
    
    public ICollection<Form> Forms { get; set; } = new List<Form>();
    public int GetGameID()
    {
        return GameID;
    }
    public int GetDifficultyLevel()
    {
        return DifficultyLevel;
    }
    public int GetCurrentScore()
    {
        return CurrentScore;
    }
    public int GetHighScores()
    {
        return HighScores;
    }

    public string GetName()
    {
        return Name;
    }
    public ICollection<Form> GetForms()
    {
        return Forms;
    }
    public void SetDifficultyLevel(int difficultyLevel)
    {
        DifficultyLevel = difficultyLevel;
    }

    public void SetCurrentScore(int currentScore)
    {
        CurrentScore = currentScore;
    }

    public void SetHighScores(int highScores)
    {
        HighScores = highScores;
    }
}

public class GameDTO
{
    public int GameID { get; set; }
    public int DifficultyLevel { get; set; }
    public int CurrentScore { get; set; }
    public int HighScore { get; set; }
    public string Name { get; set; }
}

public class GameDetailsDTO : GameDTO
{
    public int GameID { get; set; }
    public int DifficultyLevel { get; set; }
    public int CurrentScore { get; set; }
    public int HighScore { get; set; }
    public string Name { get; set; }
    public List<FormDto> Forms { get; set; } = new List<FormDto>();
}
