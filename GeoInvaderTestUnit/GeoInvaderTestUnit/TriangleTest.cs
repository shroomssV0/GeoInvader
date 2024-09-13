using GeoInvader.Model;
namespace GeoInvaderTestUnit;

public class TriangleTest
{
    [TestFixture]
    public class TriangleTests
    {
        [Test]
        public void Constructor_WithPositiveDimensions_SetsDimensionsCorrectly()
        {
            var baseLength = 3;
            var height = 4;
            var x = 0;
            var y = 0;
            var expectedArea = 0.5 * baseLength * height;
            var expectedPerimeter = baseLength + height + Math.Sqrt((baseLength * baseLength) + (height * height));

            var triangle = new Triangle(x, y, baseLength, height);
            var actualArea = triangle.GetArea();
            var actualPerimeter = triangle.GetPerimeter();

            Assert.That(actualArea, Is.EqualTo(expectedArea),
                "L'aire ne correspond pas à la valeur attendue basée sur les paramètres du constructeur.");
            Assert.That(actualPerimeter, Is.EqualTo(expectedPerimeter),
                "Le périmètre ne correspond pas à la valeur attendue basée sur les paramètres du constructeur.");
        }

        [Test]
        public void GetArea_WithValidDimensions_ReturnsCorrectArea()
        {
            var triangle = new Triangle(0, 0, 3, 4);

            double area = triangle.GetArea();

            Assert.That(area, Is.EqualTo(6));
        }

        [Test]
        public void GetPerimeter_WithValidDimensions_ReturnsCorrectPerimeter()
        {
            var baseLength = 3;
            var height = 4;
            var x = 0;
            var y = 0;
            var triangle = new Triangle(x, y, baseLength, height);

            double perimeter = triangle.GetPerimeter();

            var expectedPerimeter = baseLength + height + Math.Sqrt((baseLength * baseLength) + (height * height));
            Assert.That(perimeter, Is.EqualTo(expectedPerimeter));
        }

        [Test]
        public void ToString_WithValidDimensions_ReturnsCorrectString()
        {
            var triangle = new Triangle(0, 0, 3, 4);
            var expectedString =
                $"Triangle a pour valeurs : Base : 3, Hauteur : 4, Aire = 6 Perimètre : {3 + 4 + Math.Sqrt((3 * 3) + (4 * 4))}";

            string resultString = triangle.ToString();

            Assert.That(resultString, Is.EqualTo(expectedString));
        }

        [Test]
        public void Constructor_WithNegativeDimensions_ThrowsArgumentException()
        {
            Assert.Throws<ArgumentException>(() => new Triangle(0, 0, -3, 4),
                "Une ArgumentException aurait dû être lancée pour des dimensions négatives.");
        }
        [Test]
        public void Constructor_WithPosition_SetsPositionCorrectly()
        {
            // Arrange
            var expectedX = 5;
            var expectedY = 10;
            var baseLength = 3;
            var height = 4;

            // Act
            var triangle = new Triangle(expectedX, expectedY, baseLength, height);

            // Assert
            Assert.That(triangle.GetXPosition(), Is.EqualTo(expectedX), "The X position does not match the expected value.");
            Assert.That(triangle.GetYPosition(), Is.EqualTo(expectedY), "The Y position does not match the expected value.");
        }
    }
}