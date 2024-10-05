using System.Reflection.Metadata;
using WebLabBackend.Core.Models;

namespace WebLabBackend.Core.Interfaces;

public interface IDestinationService
{
    object GetDestinations(string search, string sort);
    void AddDestination(string image, string name, string description, int price);
    void UpdateDestination(Guid id, string image, string name, string description, int price);
    void DeleteDestination(Guid id);
    Destination GetDestination(Guid id);
    int GetTotalPrice(List<Guid> ids);
}