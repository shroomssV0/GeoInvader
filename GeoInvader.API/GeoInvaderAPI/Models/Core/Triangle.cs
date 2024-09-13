namespace GeoInvaderAPI.Models.Core;
using System.ComponentModel.DataAnnotations;

public class Triangle : Form
{
    private double _base { get; set; }
    private double height { get; set; }
    
    public double Base { get => _base; set => _base = value; }
    public double Height { get => height; set => height = value; }
    
    public override double GetArea() => 0.5 * Base * Height;

    public override double GetPerimeter()
    {
        double hypotenuse = Math.Sqrt((Base * Base) + (Height * Height));
        return Base + Height + hypotenuse;
    }
}