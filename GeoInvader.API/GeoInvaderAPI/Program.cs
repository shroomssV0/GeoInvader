using System.Reflection;
using GeoInvaderAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using dotenv.net;

DotEnv.Load(); 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<GeoInvaderDataContext>(options =>
{
    var host = Environment.GetEnvironmentVariable("HOST");
    var port = Environment.GetEnvironmentVariable("PORT_PGADMIN"); 
    var database = Environment.GetEnvironmentVariable("POSTGRES_DATABASE");
    var username = Environment.GetEnvironmentVariable("POSTGRES_USER");
    var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");

    var connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};";
    options.UseNpgsql(connectionString);
});
// builder.Services.AddSwaggerGen(); 
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "GeoInvader API", Version = "v1" });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});


builder.Services.AddDbContext<GeoInvaderDataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("GeoInvaderDataContext")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}    else
{
    app.UseHttpsRedirection();
    app.UseHsts();
}

app.UseAuthorization();
app.MapControllers();

app.Run();