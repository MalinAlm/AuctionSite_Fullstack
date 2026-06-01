using Auction.Api.DTOs;

namespace Auction.Api.Core.Interfaces
{
    public interface IAdminService
    {

        Task<List<AdminUserResponse>> GetUsersAsync(bool showInactive);
        Task<List<AdminAuctionResponse>> GetAuctionsAsync(bool showInactive);

        Task<bool> SetAuctionActiveStatusAsync(string auctionId, bool isActive);
        Task<bool> SetUserActiveStatusAsync(string userId, bool isActive);
    }
}
