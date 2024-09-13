using GeoInvader.Model;
namespace GeoInvaderTestUnit;

public class RectangleTest
{
    [TestFixture]
    public class RectangleTests
    {
        [Test]
        public void Constructor_WithPositiveDimensions_SetsDimensionsCorrectly()
        {
            var length = 10;
            var width = 20;
            var expectedArea = length * width;
            var expectedPerimeter = 2 * (length + width);

            var y = 0;
            var x = 0;
            var rectangle = new Rectangle(x, y, length, width);
            var actualArea = rectangle.GetArea();
            var actualPerimeter = rectangle.GetPerimeter();

            Assert.That(actualArea, Is.EqualTo(expectedArea),
                "L'aire ne correspond pas à la valeur attendue basée sur les paramètres du constructeur.");
            Assert.That(actualPerimeter, Is.EqualTo(expectedPerimeter),
                "Le périmètre ne correspond pas à la valeur attendue basée sur les paramètres du constructeur.");
        }

        [Test]
        public void GetArea_WithValidDimensions_ReturnsCorrectArea()
        {
            var rectangle = new Rectangle(0, 0, 10, 20);

            double area = rectangle.GetArea();

            Assert.That(area, Is.EqualTo(200));
        }

        [Test]
        public void GetPerimeter_WithValidDimensions_ReturnsCorrectPerimeter()
        {
            var rectangle = new Rectangle(0, 0, 10, 20);

            double perimeter = rectangle.GetPerimeter();

            Assert.That(perimeter, Is.EqualTo(60));
        }

        [Test]
        public void ToString_WithValidDimensions_ReturnsCorrectString()
        {
            var rectangle = new Rectangle(0, 0, 10, 20);
            var expectedString = "Rectangle a pour valeurs : Longeur : 10, Largeur : 20, Aire = 200 Perimètre : 60";

            string resultString = rectangle.ToString();

            Assert.That(resultString, Is.EqualTo(expectedString));
        }

        [Test]
        public void Constructor_WithNegativeDimensions_ThrowsArgumentException()
        {
            Assert.Throws<ArgumentException>(() => new Rectangle(0, 0, -10, 20),
                "Une ArgumentException aurait dû être lancée pour des dimensions négatives.");
        }
        [Test]
        public void Constructor_SetsPositionCorrectly()
        {
            // Arrange
            var expectedX = 1;
            var expectedY = 2;
            var length = 5;
            var width = 10;

            // Act
            var rectangle = new Rectangle(expectedX, expectedY, length, width);

            // Assert
            Assert.That(rectangle.GetXPosition(), Is.EqualTo(expectedX), "X position not set correctly by constructor.");
            Assert.That(rectangle.GetYPosition(), Is.EqualTo(expectedY), "Y position not set correctly by constructor.");
        }
    }
}