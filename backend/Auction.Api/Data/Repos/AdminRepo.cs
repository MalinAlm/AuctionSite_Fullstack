using Auction.Api.Data.Entities;
using Auction.Api.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Auction.Api.Data.Repos
{
    public class AdminRepo: IAdminRepo
    {
        private readonly ApplicationDbContext _context;

        public AdminRepo(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<User>> GetUsersAsync(bool showInactive)
        {
            return await _context.Users
                .Where(user => showInactive || user.IsActive)
                .ToListAsync();
        }


        public async Task<List<Entities.Auction>> GetAuctionsAsync(bool showInactive)
        {
            return await _context.Auctions
                .Include(auction => auction.User)
                .Include(auction => auction.Bids)
                .Where(auction => showInactive || auction.IsActive)
                .ToListAsync();
        }


        public async Task<Entities.Auction?> GetAuctionByIdAsync(string auctionId)
        {
            return await _context.Auctions
                .FirstOrDefaultAsync(auction => auction.Id == auctionId);
        }


        public async Task<User?> GetUserByIdAsync(string userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(user => user.Id == userId);
        }


        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
