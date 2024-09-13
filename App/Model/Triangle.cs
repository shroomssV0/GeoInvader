namespace GeoInvader.Model;

public class Triangle : Form
{
    private double Base { get; set; }
    private double Height { get; set; }

    public Triangle() : this(0, 0, 0, 0) { }
    
    public Triangle(double x, double y, double baseLength, double height) : base(x, y)
    {
        SetDimensions(baseLength, height);
    }

    private void SetDimensions(double baseLength, double height)
    {
        if (baseLength < 0 || height < 0) throw new ArgumentException("Base and height cannot be negative.");
        Base = baseLength;
        Height = height;
    }
    
    public override double GetArea() => 0.5 * Base * Height;

    public override double GetPerimeter()
    {
        double hypotenuse = Math.Sqrt((Base * Base) + (Height * Height));
        return Base + Height + hypotenuse;
    }
    public double GetBaseLengh()
    {
        return Base;
    }
    public double GetHeight()
    {
        return Height;
    }
    public override string ToString() => $"Triangle a pour valeurs : Base : {Base}, Hauteur : {Height}, Aire = {GetArea()} Perimètre : {GetPerimeter()}";
}
