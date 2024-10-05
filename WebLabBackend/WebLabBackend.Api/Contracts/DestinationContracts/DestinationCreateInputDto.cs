using System.Reflection.Metadata;

namespace WebLabBackend.Contracts.DestinationContracts;

public record DestinationCreateInputDto(string Image, string Name, string Description, int Price);