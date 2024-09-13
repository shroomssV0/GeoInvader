using GeoInvader.Model;
namespace GeoInvader;
class Program
{
    static void Main()
    {
        var game = new Game();
        Console.WriteLine("Formats accepter sont :");
        Console.WriteLine("Les formes de bases : 'rectangle' , 'triangle' , 'cercle' ");
        Console.WriteLine("Les formes avec valeurs possible : 'rectangle.X.Y.longeur.largeur' , 'triangle.X.Y.longeurBase.longeurHauteur' , 'cercle.X.Y.rayon' ");
            
        while (true)
        {
            string input = Console.ReadLine() ?? string.Empty;
            if (input?.ToLower() == "fini") break;

            try
            {
                var form = ParseInputToForm(input);
                if (form != null)
                {
                    game.AddForm(form);
                    Console.WriteLine($"La forme ajouter : {input}. {form.GetPosition()} Total formes : {game.GetForms().Count()}. Aire total des formes créer : {game.TotalArea}, Perimetre total des formes créer : {game.TotalPerimeter}");
                }
                else
                {
                    Console.WriteLine("Format de la forme invalide ( exemple : 'forme.X.Y.dimension1.dimension2,...'). / ( exemple : 'forme' ");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur création forme :  {ex.Message}");
            }
        }

        foreach (var form in game.GetForms())
        {
            Console.WriteLine($"Forme: {form.GetPosition()} {form.GetType()}, Aire: {form.GetArea()}, Perimetre: {form.GetPerimeter()}");
        }

        Console.WriteLine($"Aire total des formes créer : {game.TotalArea}, Perimetre total des formes créer : {game.TotalPerimeter}");
    }
    private static Form? ParseInputToForm(string? input)
    {
        var parts = input?.Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries);
        if (parts == null || parts.Length < 1) return null;

        string shapeType = parts[0].ToLower();
        switch (shapeType)
        {
            case "rectangle":
                switch (parts.Length)
                {
                    case 1: 
                        return new Rectangle();
                    case 5: 
                        return new Rectangle(double.Parse(parts[1]), double.Parse(parts[2]), double.Parse(parts[3]), double.Parse(parts[4]));
                    default: 
                        return null;
                }
            case "cercle":
                switch (parts.Length)
                {
                    case 1: 
                        return new Cercle();
                    case 4: 
                        return new Cercle(double.Parse(parts[1]),double.Parse(parts[2]),double.Parse(parts[3]));
                    default: 
                        return null;
                }
            case "triangle":
                switch (parts.Length)
                {
                    case 1:
                        return new Triangle();
                    case 5:
                        return new Triangle(double.Parse(parts[1]), double.Parse(parts[2]),double.Parse(parts[3]), double.Parse(parts[4]));
                    default:
                        return null;
                }
            default:
                return null; 
        }
    }


}