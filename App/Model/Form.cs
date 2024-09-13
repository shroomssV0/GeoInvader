namespace GeoInvader.Model;

public abstract class Form(double x, double y)
{
    protected double X { get; set; } = x;
    protected double Y { get; set; } = y;

    public abstract double GetArea();
    public abstract double GetPerimeter();
    public string GetPosition()
    {
        return $"{X},{Y}";
    }
    public void SetPosition(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double  GetYPosition()
    {
        return Y;
    }
    public double  GetXPosition()
    {
        return X;
    }
}