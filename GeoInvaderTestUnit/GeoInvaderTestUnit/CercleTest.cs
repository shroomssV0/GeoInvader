using GeoInvader.Model;
namespace GeoInvaderTestUnit;

public class CercleTest
{
    [TestFixture]
    public class CercleTests
    {
        [Test]
        public void Constructor_WithPositiveRadius_SetsRadiusCorrectly()
        {
            var radius = 5;
            var x = 0;
            var y = 0;
            var expectedArea = Math.PI * radius * radius;
            var expectedPerimeter = 2 * Math.PI * radius;

            var cercle = new Cercle(x, y, radius);
            var actualArea = cercle.GetArea();
            var actualPerimeter = cercle.GetPerimeter();

            Assert.That(actualArea, Is.EqualTo(expectedArea),
                "L'aire ne correspond pas à la valeur attendue basée sur le rayon fourni.");
            Assert.That(actualPerimeter, Is.EqualTo(expectedPerimeter),
                "Le périmètre ne correspond pas à la valeur attendue basée sur le rayon fourni.");
        }

        [Test]
        public void GetArea_WithValidRadius_ReturnsCorrectArea()
        {
            var cercle = new Cercle(0, 0, 5);

            double area = cercle.GetArea();

            Assert.That(area, Is.EqualTo(Math.PI * 5 * 5));
        }

        [Test]
        public void GetPerimeter_WithValidRadius_ReturnsCorrectPerimeter()
        {
            var cercle = new Cercle(0, 0, 5);

            double perimeter = cercle.GetPerimeter();

            Assert.That(perimeter, Is.EqualTo(2 * Math.PI * 5));
        }

        [Test]
        public void ToString_WithValidRadius_ReturnsCorrectString()
        {
            var cercle = new Cercle(0, 0, 5);
            var expectedString =
                $"Cercle a pour valeurs : Rayon : 5, Aire = {Math.PI * 5 * 5} Perimètre : {2 * Math.PI * 5}";

            string resultString = cercle.ToString();

            Assert.That(resultString, Is.EqualTo(expectedString));
        }

        [Test]
        public void Constructor_WithNegativeRadius_ThrowsArgumentException()
        {
            Assert.Throws<ArgumentException>(() => new Cercle(0, 0, -5),
                "Une ArgumentException aurait dû être lancée pour un rayon négatif.");
        }
        [Test]
        public void Constructor_SetsPositionCorrectly()
        {
            // Arrange
            var expectedX = 3;
            var expectedY = 4;
            var radius = 5;

            // Act
            var cercle = new Cercle(expectedX, expectedY, radius);

            // Assert
            Assert.That(cercle.GetXPosition(), Is.EqualTo(expectedX), "X position not set correctly by constructor.");
            Assert.That(cercle.GetYPosition(), Is.EqualTo(expectedY), "Y position not set correctly by constructor.");
        }
    }
}