namespace Auction.Api.DTOs
{
    public class AdminAuctionResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description {  get; set; } = string.Empty;
        public decimal StartingPrice { get; set; }
        public DateTime StartsAt { get; set; }
        public DateTime EndsAt { get; set; }
        public bool IsOpen { get; set; }
        public bool IsActive { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;

        public int BidCount { get; set; }
        public decimal? HighestBid { get; set; }
    }
}
