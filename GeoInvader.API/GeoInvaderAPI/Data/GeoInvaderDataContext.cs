using GeoInvaderAPI.Models.Core;
using Microsoft.EntityFrameworkCore;

namespace GeoInvaderAPI.Data;

public class GeoInvaderDataContext : DbContext
{
    public GeoInvaderDataContext(DbContextOptions<GeoInvaderDataContext> options)
        : base(options)
    {
    }

    public DbSet<Form> Form { get; set; }
    public DbSet<Cercle> Cercle { get; set; }
    public DbSet<Rectangle> Rectangle { get; set; }
    public DbSet<Triangle> Triangle { get; set; }
    public DbSet<Game> Game { get; set; }
    // public DbSet<Position> Position { get; set; }
    // public DbSet<Bonuses> Bonuses { get; set; }
    // public DbSet<Enemies> Enemies { get; set; }
    // public DbSet<MovementStrategies> MovementStrategies { get; set; }
    
    // public DbSet<Projectiles> Projectiles { get; set; }
    // public DbSet<Players> Players { get; set; }
}