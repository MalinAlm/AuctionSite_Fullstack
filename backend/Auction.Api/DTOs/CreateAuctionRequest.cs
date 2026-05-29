using System.ComponentModel.DataAnnotations;

namespace Auction.Api.DTOs
{
    public class CreateAuctionRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Range(1, double.MaxValue)]
        public decimal StartingPrice { get; set; }

        public DateTime StartsAt { get; set; }
        public DateTime EndsAt { get; set; }

    }
}
