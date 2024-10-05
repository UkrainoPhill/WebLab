using Microsoft.EntityFrameworkCore;
using WebLabBackend.Core.Models;
using WebLabBackend.Persistence.Configurations;

namespace WebLabBackend.Persistence;

public class WebLabBackendDbContext(DbContextOptions<WebLabBackendDbContext> options) : DbContext(options)
{
    public DbSet<Destination> Destinations { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new DestinationConfiguration());
    }
}