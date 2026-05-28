namespace Auction.Api.DTOs
{
    public class CreateBidResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public BidResponse? Bid { get; set; }

    }
}
