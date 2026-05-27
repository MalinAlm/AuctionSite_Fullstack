using System.ComponentModel.DataAnnotations;

namespace Auction.Api.DTOs
{
    public class CreateAuctionRequest
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Range(1, double.MaxValue)]
        public decimal StartingPrice { get; set; }

        public DateTime StartsAt { get; set; }
        public DateTime EndsAt { get; set; }

    }
}
