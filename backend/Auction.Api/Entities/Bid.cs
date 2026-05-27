using System.ComponentModel.DataAnnotations.Schema;

namespace Auction.Api.Entities
{
    public class Bid
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string AuctionId { get; set; } = string.Empty;
        public Auction? Auction { get; set; }

        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }

    }
}
