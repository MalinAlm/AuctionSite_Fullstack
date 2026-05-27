namespace Auction.Api.DTOs
{
    public class BidResponse
    {
        public string Id { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;

    }
}
