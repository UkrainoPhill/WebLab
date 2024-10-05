using System.Reflection.Metadata;
using WebLabBackend.Core.Interfaces;
using WebLabBackend.Core.Models;

namespace WebLabBackend.Persistence.Repositories;

public class DestinationRepository(WebLabBackendDbContext context) : IDestinationRepository
{
    public object GetDestinations(string search, string sort)
    {
        var destinations = context.Destinations.ToList();
        if (!string.IsNullOrEmpty(search))
        {
            destinations = destinations.Where(d => d.Name.ToLower().Trim().Contains(search.ToLower().Trim())).ToList();
        }
        if (!string.IsNullOrEmpty(sort))
        {
            destinations = sort switch
            {
                "name_asc" => destinations.OrderBy(d => d.Name).ToList(),
                "price_asc" => destinations.OrderBy(d => d.Price).ToList(),
                "price_desc" => destinations.OrderByDescending(d => d.Price).ToList(),
                "name_desc" => destinations.OrderByDescending(d => d.Name).ToList(),
                _ => destinations
            };
        }
        float price = destinations.Sum(d => d.Price);
        return new
        {
            Destinations = destinations,
            TotalPrice = price
        };
    }
    
    public void AddDestination(Destination destination)
    {
        context.Destinations.Add(destination);
        context.SaveChanges();
    }
    
    public void UpdateDestination(Destination destination)
    {
        context.Destinations.Update(destination);
        context.SaveChanges();
    }
    
    public void DeleteDestination(Destination destination)
    {
        context.Destinations.Remove(destination);
        context.SaveChanges();
    }

    public Destination GetDestination(Guid id)
    {
        var destination = context.Destinations.SingleOrDefault(d => d.Id == id);
        return destination ?? throw new Exception("Destination not found");
    }

    public bool DestinationExists(string name)
    {
        return context.Destinations.Any(d => d.Name == name);
    }
}