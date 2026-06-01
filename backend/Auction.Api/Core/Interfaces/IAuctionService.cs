using Auction.Api.DTOs;

namespace Auction.Api.Core.Interfaces
{
    public interface IAuctionService
    {
        Task<List<AuctionResponse>> GetAuctionsAsync(bool showClosedAuctions);
        Task<AuctionResponse?> GetAuctionByIdAsync(string auctionId);
        Task<AuctionResponse?> CreateAuctionAsync(CreateAuctionRequest request, string userId);
        Task<List<AuctionResponse>> SearchAuctionsAsync(string title, bool showClosedAuctions);
        Task<AuctionResponse?> UpdateAuctionAsync(string auctionId, string userId, UpdateAuctionRequest request);
    }
}
