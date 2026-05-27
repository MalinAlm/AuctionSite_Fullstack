namespace Auction.Api.DTOs
{
    public class AuctionResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description {  get; set; } = string.Empty;
        public decimal StartingPrice { get; set; }
        public DateTime StartsAt { get; set; }
        public DateTime EndsAt { get; set; }
        public bool IsOpen { get; set; }

        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;

        public List<BidResponse> Bids { get; set; } = new();
    }
}
