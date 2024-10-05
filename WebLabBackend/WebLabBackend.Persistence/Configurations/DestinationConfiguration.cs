using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebLabBackend.Core.Models;

namespace WebLabBackend.Persistence.Configurations;

public class DestinationConfiguration : IEntityTypeConfiguration<Destination>
{
    public void Configure(EntityTypeBuilder<Destination> builder)
    {
        builder.HasKey(d => d.Id);
        builder.Property(d => d.Name).IsRequired();
        builder.Property(d => d.Description).IsRequired();
        builder.Property(d => d.Price).IsRequired();
        builder.Property(d => d.Image).IsRequired();
        builder.Property(d => d.LastUpdated).IsRequired();
    }
}