using Auction.Api.Data.Entities;

namespace Auction.Api.Data.Interfaces
{
    public interface IAdminRepo
    {
        Task<List<User>> GetUsersAsync(bool showInactive);
        Task<List<Entities.Auction>> GetAuctionsAsync(bool showInactive);
        Task<Entities.Auction?> GetAuctionByIdAsync(string auctionId);
        Task<User?> GetUserByIdAsync(string userId);
        Task SaveChangesAsync();
    }
}
