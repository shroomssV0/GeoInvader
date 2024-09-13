namespace GeoInvaderAPI.Models.Core;
using System.ComponentModel.DataAnnotations;

public class Rectangle : Form
{
    private double length;
    public double Length 
    { 
        get => length; 
        set => length = value; // Ensure this sets the backing field
    }

    private double width;
    public double Width 
    { 
        get => width; 
        set => width = value; // Ensure this sets the backing field
    }
    public override double GetArea() => Length * Width;

    public override double GetPerimeter() => 2 * (Length + Width);
}