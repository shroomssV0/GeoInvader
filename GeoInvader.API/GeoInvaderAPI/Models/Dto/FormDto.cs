namespace GeoInvaderAPI.Models.Dto;
using System.ComponentModel.DataAnnotations;

public struct FormDto
{
    public FormDto()
    {
        
    }
    [Required]
    public int ShapeID { get; set; }
    [Required]
    public string Position { get; set; }
    
    public float Length { get; set; }
    
    public float Width { get; set; }
    
    public float Radius { get; set; }
    
    public float Base { get; set; }
    
    public float Heigth { get; set; }
    
}