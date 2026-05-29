using System.ComponentModel.DataAnnotations;

namespace Auction.Api.DTOs
{
    public class CreateBidRequest
    {
      
        [Range(1, double.MaxValue)]
        public decimal Amount { get; set; }
        
    }
}
