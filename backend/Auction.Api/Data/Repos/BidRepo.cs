using Auction.Api.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Auction.Api.Data.Entities;

namespace Auction.Api.Data.Repos
{
    public class BidRepo: IBidRepo
    {
        private readonly ApplicationDbContext _context;

        public BidRepo(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<Entities.Auction?> GetAuctionWithBidsAsync(string auctionId)
        {
            return await _context.Auctions
                .Include(auction => auction.Bids)
                .FirstOrDefaultAsync(auction => auction.Id == auctionId);
        }


        public async Task AddBidAsync(Bid bid)
        {
            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();
        }


        public async Task<User?> GetUserByIdAsync(string userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(user => user.Id == userId);
        }


        public async Task<Entities.Auction?> GetAuctionForBidDeletionAsync(string auctionId)
        {
            return await _context.Auctions
                .Include(auction => auction.Bids)
                .FirstOrDefaultAsync(auction => auction.Id == auctionId);
        }


        public async Task DeleteBidAsync(Bid bid)
        {
            _context.Bids.Remove(bid);
            await _context.SaveChangesAsync();
        }

    }
}
