using GeoInvaderAPI.Models.Core;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GeoInvaderAPI.ModelBinders;


public class ShapeModelBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        var shapeTypeValue = bindingContext.ValueProvider.GetValue("ShapeType").FirstValue;

        Form? shape = shapeTypeValue switch
        {
            "Rectangle" => new Rectangle(),
            "Cercle" => new Cercle(),
            "Triangle" => new Triangle(),
            _ => null
        };

        if (shape == null)
        {
            bindingContext.Result = ModelBindingResult.Failed();
            return Task.CompletedTask;
        }

        // Here you would use reflection or another method to set the properties on the shape object based on the incoming request

        bindingContext.Result = ModelBindingResult.Success(shape);
        return Task.CompletedTask;
    }
}
