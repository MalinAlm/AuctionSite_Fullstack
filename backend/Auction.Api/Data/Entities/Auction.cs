using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction.Api.Data.Entities
{
    public class Auction
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal StartingPrice { get; set; }
        public DateTime StartsAt { get; set; }
        public DateTime EndsAt { get; set; }
        public bool IsActive { get; set; } = true;
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }
        public ICollection<Bid> Bids { get; set; } = new List<Bid>();
    }
}
