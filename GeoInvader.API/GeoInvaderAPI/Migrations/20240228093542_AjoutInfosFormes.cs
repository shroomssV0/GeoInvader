using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GeoInvaderAPI.Migrations
{
    /// <inheritdoc />
    public partial class AjoutInfosFormes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Base",
                table: "Form",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "Form",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Length",
                table: "Form",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Radius",
                table: "Form",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Width",
                table: "Form",
                type: "double precision",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Base",
                table: "Form");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Form");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Form");

            migrationBuilder.DropColumn(
                name: "Radius",
                table: "Form");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "Form");
        }
    }
}
