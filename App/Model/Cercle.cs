namespace GeoInvader.Model;

public class Cercle : Form
{
    private double Radius { get; set; }
    public Cercle() : this(0, 0, 0) { }
    
    public Cercle(double x, double y, double radius) : base(x, y)
    {
        SetRadius(radius);
    }
    public void SetRadius(double radius)
    {
        if (radius < 0 ) throw new ArgumentException("Base and height cannot be negative.");
        Radius = radius;
    }
    public double GetRadius()
    {
        return Radius;
    }
    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }

    public override double GetPerimeter()
    {
        return 2 * Math.PI * Radius;
    }
    public override string ToString() => $"Cercle a pour valeurs : Rayon : {Radius}, Aire = {GetArea()} Perimètre : {GetPerimeter()}";
}

