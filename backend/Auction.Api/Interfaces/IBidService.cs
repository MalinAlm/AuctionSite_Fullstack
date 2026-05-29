using Auction.Api.DTOs;

namespace Auction.Api.Interfaces
{
    public interface IBidService
    {
        Task<BidActionResponse> CreateBidAsync(
            string auctionId,
            string userId,
            CreateBidRequest request);

        Task<BidActionResponse> DeleteLatestBidAsync(
            string auctionId,
            string userId);
    }
}
