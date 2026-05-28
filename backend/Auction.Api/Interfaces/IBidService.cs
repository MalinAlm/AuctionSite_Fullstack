using Auction.Api.DTOs;

namespace Auction.Api.Interfaces
{
    public interface IBidService
    {
        Task<CreateBidResponse> CreateBidAsync(
            string auctionId,
            string userId,
            CreateBidRequest request);

        Task<CreateBidResponse> DeleteLatestBidAsync(
            string auctionId,
            string userId);
    }
}
