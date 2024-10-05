using System.Reflection.Metadata;
using WebLabBackend.Core.Interfaces;
using WebLabBackend.Core.Models;

namespace WebLabBackend.Application.Services;

public class DestinationService(IDestinationRepository destinationRepository) : IDestinationService
{
    public object GetDestinations(string search, string sort)
    {
        var destinations = destinationRepository.GetDestinations(search, sort);
        return destinations;
    }

    public void AddDestination(string image, string name, string description, int price)
    {
        if (destinationRepository.DestinationExists(name))
        {
            throw new Exception("Destination already exists");
        }
        var destination = new Destination
        {
            Id = Guid.NewGuid(),
            Image = image,
            Name = name,
            Description = description,
            Price = price,
            LastUpdated = DateTime.UtcNow
        };
        destinationRepository.AddDestination(destination);
    }

    public void UpdateDestination(Guid id, string image, string name, string description, int price)
    {
        var destination = destinationRepository.GetDestination(id);
        destination.Image = image;
        destination.Name = name;
        destination.Description = description;
        destination.Price = price;
        destination.LastUpdated = DateTime.UtcNow;
        destinationRepository.UpdateDestination(destination);
    }

    public void DeleteDestination(Guid id)
    {
        var destination = destinationRepository.GetDestination(id);
        destinationRepository.DeleteDestination(destination);
    }
    
    public Destination GetDestination(Guid id)
    {
        var destination = destinationRepository.GetDestination(id);
        return destination;
    }
    
    public int GetTotalPrice(List<Guid> ids)
    {
        var totalPrice = 0;
        foreach (var id in ids)
        {
            var destination = destinationRepository.GetDestination(id);
            totalPrice += destination.Price;
        }
        return totalPrice;
    }
}