using Auction.Api.Data;
using Auction.Api.DTOs;
using Auction.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Auction.Api.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly ApplicationDbContext  _context;

        public AuctionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<AuctionResponse>> GetAuctionsAsync(bool showClosedAuctions)
        {
            var auctions = await _context.Auctions
                .Include(auction => auction.User)
                .Include(auction=> auction.Bids)
                .ThenInclude(bid => bid.User)
                .Where(auction =>
                showClosedAuctions || 
                auction.EndsAt > DateTime.Now)
                .ToListAsync();

            return auctions
                .Select(MapToAuctionResponse)
                .ToList();
        }

        
        public async Task<AuctionResponse?> GetAuctionByIdAsync(string auctionId)
        {
            var auction = await _context.Auctions
                .Include(auction => auction.User)
                .Include(auction => auction.Bids)
                .ThenInclude(bid => bid.User)
                .FirstOrDefaultAsync(auction => auction.Id == auctionId);

            if (auction == null)
            {
                return null;
            }

            return MapToAuctionResponse(auction);
        }


        public async Task<AuctionResponse?> CreateAuctionAsync(CreateAuctionRequest request, string userId)
        {
            if (request.EndsAt <= DateTime.Now)
            {
                return null;
            }

            if (request.EndsAt <= request.StartsAt)
            {
                return null;
            }

            var auction = new Entities.Auction
            {
                Title = request.Title,
                Description = request.Description,
                StartingPrice = request.StartingPrice,
                StartsAt = request.StartsAt,
                EndsAt = request.EndsAt,
                UserId = userId
            };

            _context.Auctions.Add(auction);
            await _context.SaveChangesAsync();

            return MapToAuctionResponse(auction);
        }


        public async Task<List<AuctionResponse>> SearchAuctionsAsync(string title, bool showClosedAuctions)
        {
            var auctions = await _context.Auctions
                .Include(auction => auction.User)
                .Include(auction => auction.Bids)
                .ThenInclude(bid => bid.User)
                .Where(auction => 
                    auction.Title.Contains(title) && 
                    (
                        showClosedAuctions ||
                        auction.EndsAt > DateTime.Now
                    ))
                .ToListAsync();

            return auctions
                .Select(MapToAuctionResponse)
                .ToList();
        }


        private static AuctionResponse MapToAuctionResponse(Entities.Auction auction)
        {
            return new AuctionResponse
            {
                Id = auction.Id,
                Title = auction.Title,
                Description = auction.Description,
                StartingPrice = auction.StartingPrice,
                StartsAt = auction.StartsAt,
                EndsAt = auction.EndsAt,
                IsActive = auction.IsActive,
                IsOpen = auction.EndsAt > DateTime.Now,
                UserId = auction.UserId,
                UserName = auction.User?.UserName ?? string.Empty,
                Bids = auction.Bids
                    .OrderByDescending(bid => bid.Amount)
                    .Select(bid => new BidResponse
                    {
                        Id = bid.Id,
                        Amount = bid.Amount,
                        CreatedAt = bid.CreatedAt,
                        UserId = bid.UserId,
                        UserName = bid.User?.UserName ?? string.Empty,
                    })
                    .ToList()
            };
        }

    }
}
