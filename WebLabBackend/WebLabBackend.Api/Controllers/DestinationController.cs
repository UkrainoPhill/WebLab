using Microsoft.AspNetCore.Mvc;
using WebLabBackend.Contracts;
using WebLabBackend.Contracts.DestinationContracts;
using WebLabBackend.Core.Interfaces;
using WebLabBackend.Core.Models;

namespace WebLabBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class DestinationController(IDestinationService destinationService) : ControllerBase
{
    [HttpGet("Get")]
    public OkObjectResult GetDestinations([FromQuery]string search = "", [FromQuery]string sort = "")
    {
        return Ok(destinationService.GetDestinations(search, sort));
    }
    
    [HttpPost("Add")]
    public ActionResult AddDestination([FromBody] DestinationCreateInputDto destinationCreateInputDto)
    {
        try
        {
            destinationService.AddDestination(destinationCreateInputDto.Image,
                destinationCreateInputDto.Name, destinationCreateInputDto.Description, destinationCreateInputDto.Price);
            return Created();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [HttpPut("Update/{id:Guid}")]
    public NoContentResult UpdateDestination(Guid id, DestinationCreateInputDto destinationCreateInputDto)
    {
        destinationService.UpdateDestination(id, destinationCreateInputDto.Image, destinationCreateInputDto.Name, destinationCreateInputDto.Description, destinationCreateInputDto.Price);
        return NoContent();
    }

    [HttpDelete("Delete/{id:Guid}")]
    public NoContentResult DeleteDestination(Guid id)
    {
        destinationService.DeleteDestination(id);
        return NoContent();
    }
    
    
    [HttpGet("Get/{id:Guid}")]
    public OkObjectResult GetDestination(Guid id)
    {
        return Ok(destinationService.GetDestination(id));
    }
    
    [HttpPost("GetTotalPrice")]
    public OkObjectResult GetTotalPrice([FromBody] DestinationGetTotalPriceInputDto destinationGetTotalPriceInputDto)
    {
        return Ok(destinationService.GetTotalPrice(destinationGetTotalPriceInputDto.DestinationIds));
    }
}