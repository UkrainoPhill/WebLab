using WebLabBackend.Core.Models;

namespace WebLabBackend.Core.Interfaces;

public interface IDestinationRepository
{
    object GetDestinations(string search, string sort);
    void AddDestination(Destination destination);
    void UpdateDestination(Destination destination);
    void DeleteDestination(Destination destination);
    Destination GetDestination(Guid id);
    bool DestinationExists(string name);
}