using Microsoft.EntityFrameworkCore;
using WebLabBackend.Application.Services;
using WebLabBackend.Core.Interfaces;
using WebLabBackend.Persistence;
using WebLabBackend.Persistence.Repositories;

namespace WebLabBackend;

public static class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
        builder.Services.AddScoped<IDestinationService, DestinationService>();
        builder.Services.AddScoped<IDestinationRepository, DestinationRepository>();
        builder.Services.AddDbContext<WebLabBackendDbContext>(options =>
        {
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
        });
        var app = builder.Build();
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.UseCors("AllowAll");
        app.MapControllers();

        app.Run();
    }
}