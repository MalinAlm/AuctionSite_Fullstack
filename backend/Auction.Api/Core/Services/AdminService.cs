using Auction.Api.Core.Interfaces;
using Auction.Api.DTOs;
using Auction.Api.Data.Interfaces;

namespace Auction.Api.Core.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepo _adminRepo;

        public AdminService(IAdminRepo adminRepo)
        {
            _adminRepo = adminRepo;
        }

        public async Task<List<AdminUserResponse>> GetUsersAsync(bool showInactive)
        {
            var users = await _adminRepo.GetUsersAsync(showInactive);

            return users
                .Select(user => new AdminUserResponse
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role,
                    IsActive = user.IsActive
                })
                .ToList();
        }


        public async Task<List<AdminAuctionResponse>> GetAuctionsAsync(bool showInactive)
        {
            var auctions = await _adminRepo.GetAuctionsAsync(showInactive);

            return auctions
                .Select(auction => new AdminAuctionResponse
                {
                    Id = auction.Id,
                    Title = auction.Title,
                    Description = auction.Description,
                    StartingPrice = auction.StartingPrice,
                    StartsAt = auction.StartsAt,
                    EndsAt = auction.EndsAt,
                    IsOpen = auction.EndsAt > DateTime.Now,
                    IsActive = auction.IsActive,
                    UserId = auction.UserId,
                    UserName = auction.User != null ? auction.User.UserName : string.Empty,
                    BidCount = auction.Bids.Count,
                    HighestBid = auction.Bids.Any()
                        ? auction.Bids.Max(bid => bid.Amount)
                        : null
                })
                .ToList();
        }


        public async Task<bool> SetAuctionActiveStatusAsync(string auctionId, bool isActive)
        {
            var auction = await _adminRepo.GetAuctionByIdAsync(auctionId);

            if (auction == null)
            {
                return false;
            }

            auction.IsActive = isActive;

            await _adminRepo.SaveChangesAsync();

            return true;
        }


        public async Task<bool> SetUserActiveStatusAsync(string userId, bool isActive)
        {
            var user = await _adminRepo.GetUserByIdAsync(userId);

            if (user == null)
            {
                return false;
            }

            user.IsActive = isActive;

            await _adminRepo.SaveChangesAsync();

            return true;
        }
    }
}
