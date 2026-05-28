using Auction.Api.Data;
using Auction.Api.DTOs;
using Auction.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Auction.Api.Services
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<AdminUserResponse>> GetUsersAsync(bool showInactive)
        {
            var users = await _context.Users
                .Where(user => showInactive || user.IsActive)
                .Select(user => new AdminUserResponse
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role,
                    IsActive = user.IsActive,
                })
                .ToListAsync();

            return users;
        }


        public async Task<List<AdminAuctionResponse>> GetAuctionsAsync(bool showInactive)
        {
            var auctions = await _context.Auctions
                .Include(auction => auction.User)
                .Include(auction => auction.Bids)
                .Where(auction => showInactive || auction.IsActive)
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
                .ToListAsync();

            return auctions;
        }



        public async Task<bool> SetAuctionActiveStatusAsync(string auctionId, bool isActive)
        {
            var auction = await _context.Auctions
                .FirstOrDefaultAsync(auction => auction.Id == auctionId);

            if (auction == null)
            {
                return false;
            }

            auction.IsActive = isActive;

            await _context.SaveChangesAsync();

            return true;
        }

        
        public async Task<bool> SetUserActiveStatusAsync(string userId, bool isActive)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync (user => user.Id == userId);

            if (user == null)
            {
                return false;
            }

            user.IsActive = isActive;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
