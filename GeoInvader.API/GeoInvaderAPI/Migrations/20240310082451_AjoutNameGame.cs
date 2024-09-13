using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GeoInvaderAPI.Migrations
{
    /// <inheritdoc />
    public partial class AjoutNameGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Game",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Game");
        }
    }
}
