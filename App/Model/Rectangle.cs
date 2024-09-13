namespace GeoInvader.Model;

public class Rectangle : Form
{
    private double Length { get; set; }
    private double Width { get; set; }
    
    public Rectangle() : this(0, 0, 0,0 ) { }
    
    public Rectangle(double x, double y, double length, double width) : base(x, y)
    {
        SetDimensions(length, width);
    }

    private void SetDimensions(double length, double width)
    {
        if (length < 0 || width < 0) throw new ArgumentException("Length and width cannot be negative.");
        Length = length;
        Width = width;
    }
    public double GetLength()
    { 
        return Length;
    } 
    public  double GetWidth()
    { 
        return Width;
    } 
    
    public override double GetArea() => Length * Width;

    public override double GetPerimeter() => 2 * (Length + Width);
    
    public override string ToString() => $"Rectangle a pour valeurs : Longeur : {Length}, Largeur : {Width}, Aire = {GetArea()} Perimètre : {GetPerimeter()}";
}

