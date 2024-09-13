using GeoInvader.Model;
namespace GeoInvaderTestUnit;

public class GameTest
{
    [TestFixture]
    public class GameTests
    {
        [Test]
        public void AddForm_SingleRectangle_IncreasesCount()
        {
            var game = new Game();
            var rectangle = new Rectangle(0, 0, 10, 5);
            
            game.AddForm(rectangle);
            
            Assert.That(game.GetForms().Count(), Is.EqualTo(1));
        }
        
        [Test]
        public void AddForm_RectangleAndTriangle_IncreasesCountAccordingly()
        {
            var game = new Game();
            var rectangle = new Rectangle(0, 0, 10, 5);
            var triangle = new Triangle(0, 0, 10, 5); 
            
            game.AddForm(rectangle);
            game.AddForm(triangle);
            
            Assert.That(game.GetForms().Count(), Is.EqualTo(2));
        }
        [Test]
        public void AddForm_RectangleAndTriangleAndCercle_IncreasesCountAccordingly()
        {

            var game = new Game();
            var rectangle = new Rectangle(0, 0, 10, 5);
            var triangle = new Triangle(0, 0, 10, 5);
            var cercle = new Cercle(0, 0, 4);
            

            game.AddForm(rectangle);
            game.AddForm(triangle);
            game.AddForm(cercle);
            
            Assert.That(game.GetForms().Count(), Is.EqualTo(3));
        }
        
        [Test]
        public void TotalArea_AfterAddingMultipleForms_CalculatesCorrectly()
        {
            var game = new Game();
            var rectangle = new Rectangle(0, 0, 10, 5); 
            var triangle = new Triangle(0, 0, 10, 5); 
            var cercle = new Cercle(0, 0, 7); 
            
            game.AddForm(rectangle);
            game.AddForm(triangle);
            game.AddForm(cercle);
            
            var expectedTotalArea = rectangle.GetArea() + triangle.GetArea() + cercle.GetArea();
            Assert.That(game.TotalArea, Is.EqualTo(expectedTotalArea)); 
        }
        
        [Test]
        public void TotalPerimeter_AfterAddingMultipleForms_CalculatesCorrectly()
        {
            var game = new Game();
            var rectangle = new Rectangle(0, 0, 10, 5);
            var triangle = new Triangle(0, 0, 10, 5); 
            var cercle = new Cercle(0, 0, 7);
            
            game.AddForm(rectangle);
            game.AddForm(triangle);
            game.AddForm(cercle);
            
            var expectedTotalPerimeter = rectangle.GetPerimeter() + triangle.GetPerimeter() + cercle.GetPerimeter();
            Assert.That(game.TotalPerimeter, Is.EqualTo(expectedTotalPerimeter)   );
        }
    }
}