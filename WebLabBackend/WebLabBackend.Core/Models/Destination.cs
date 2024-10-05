using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace WebLabBackend.Core.Models;

[Table("Destinations")]
public class Destination
{
    public Guid Id { get; set; }
    public string? Image { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int Price { get; set; }
    public DateTime LastUpdated { get; set; }
}