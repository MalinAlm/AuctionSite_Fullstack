using Auction.Api.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Auction.Api.Data.Repos
{
    public class AuctionRepo : IAuctionRepo
    {
        private readonly ApplicationDbContext _context;

        public AuctionRepo(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<Entities.Auction>> GetAuctionsAsync(bool showClosedAuctions)
        {
            return await _context.Auctions
                .Include(auction => auction.User)
                .Include(auction => auction.Bids)
                .ThenInclude(bid => bid.User)
                .Where(auction =>
                    auction.IsActive &&
                    (
                        showClosedAuctions
                            ? auction.EndsAt <= DateTime.Now
                            : auction.EndsAt > DateTime.Now
                    ))
                .ToListAsync();
        }


        public async Task<Entities.Auction?> GetAuctionByIdAsync(string auctionId)
        {
            return await _context.Auctions
                .Include(auction => auction.User)
                .Include(auction => auction.Bids)
                .ThenInclude(bid => bid.User)
                .FirstOrDefaultAsync(auction =>
                    auction.Id == auctionId &&
                    auction.IsActive);
        }


        public async Task AddAuctionAsync(Entities.Auction auction)
        {
            _context.Auctions.Add(auction);
            await _context.SaveChangesAsync();
        }


        public async Task<List<Entities.Auction>> SearchAuctionsAsync(string title, bool showClosedAuctions)
        {
            return await _context.Auctions
                .Include(auction => auction.User)
                .Include(auction => auction.Bids)
                .ThenInclude(bid => bid.User)
                .Where(auction =>
                    auction.IsActive &&
                    auction.Title.Contains(title) &&
                    (
                        showClosedAuctions
                            ? auction.EndsAt <= DateTime.Now
                            : auction.EndsAt > DateTime.Now
                    ))
                .ToListAsync();
        }


        public async Task<Entities.Auction?> GetAuctionForUpdateAsync(string auctionId)
        {
            return await _context.Auctions
                .Include(auction => auction.Bids)
                .Include(auction => auction.User)
                .FirstOrDefaultAsync(auction => auction.Id == auctionId);
        }


        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
