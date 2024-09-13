namespace GeoInvaderAPI.Models.Core;
using System.ComponentModel.DataAnnotations;

public class Cercle : Form
{
    private double radius;
    
    public double Radius 
    { 
        get => radius; 
        set => radius = value; 
    }
    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }

    public override double GetPerimeter()
    {
        return 2 * Math.PI * Radius;
    }
}
