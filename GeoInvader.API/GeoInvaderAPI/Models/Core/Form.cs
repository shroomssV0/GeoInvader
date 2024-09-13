using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GeoInvaderAPI.Models.Core;
public enum Role
{
    Enemy = 0,     
    Projectile = 1, 
    Player = 2     
}


public abstract class Form
{
    [Key]
    public int Id { get; set; }
    
    private double x; 
    private double y; 

    public double X { get => x; set => x = value; }
    public double Y { get => y; set => y = value; }


    public int GameID { get; set; } 


    [ForeignKey("GameID")]
    public Game Game { get; set; }
    public Role Role { get; set; }
    
    public abstract double GetArea();
    public abstract double GetPerimeter();
}
public class FormDto
{
    public string FormType { get; set; }
    public Role Role { get; set; } 
    public double Area { get; set; }
    public double Perimeter { get; set; }
    public int Id  { get; set; }
    public int GameID { get; set; }
    public double Y { get; set; }
    public double X { get; set; }
    public double? Radius { get; set; }
    public double? Length { get; set; }
    public double? Width { get; set; }
    public double? Base { get; set; }
    public double? Height { get; set; }
}
