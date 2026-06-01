using Auction.Api.Core.Interfaces;
using Auction.Api.Data.Interfaces;
using Auction.Api.DTOs;

namespace Auction.Api.Core.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepo _auctionRepo;

        public AuctionService(IAuctionRepo auctionRepo)
        {
            _auctionRepo = auctionRepo;
        }

        public async Task<List<AuctionResponse>> GetAuctionsAsync(bool showClosedAuctions)
        {
            var auctions = await _auctionRepo.GetAuctionsAsync(showClosedAuctions);

            return auctions
                .Select(MapToAuctionResponse)
                .ToList();
        }


        public async Task<AuctionResponse?> GetAuctionByIdAsync(string auctionId)
        {
            var auction = await _auctionRepo.GetAuctionByIdAsync(auctionId);

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

            var auction = new Data.Entities.Auction
            {
                Title = request.Title,
                Description = request.Description,
                StartingPrice = request.StartingPrice,
                StartsAt = request.StartsAt,
                EndsAt = request.EndsAt,
                UserId = userId
            };

            await _auctionRepo.AddAuctionAsync(auction);

            return MapToAuctionResponse(auction);
        }


        public async Task<List<AuctionResponse>> SearchAuctionsAsync(string title, bool showClosedAuctions)
        {
            var auctions = await _auctionRepo.SearchAuctionsAsync(title, showClosedAuctions);

            return auctions
                .Select(MapToAuctionResponse)
                .ToList();
        }


        private static AuctionResponse MapToAuctionResponse(Data.Entities.Auction auction)
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
                Bids = auction.EndsAt <= DateTime.Now
                ? auction.Bids
                    .OrderByDescending(bid => bid.Amount)
                    .Take(1)
                    .Select(bid => new BidResponse
                    {
                        Id = bid.Id,
                        Amount = bid.Amount,
                        CreatedAt = bid.CreatedAt,
                        UserId = bid.UserId,
                        UserName = bid.User?.UserName ?? string.Empty,
                    })
                    .ToList()
                 : auction.Bids
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


        public async Task<AuctionResponse?> UpdateAuctionAsync(
            string auctionId,
            string userId,
            UpdateAuctionRequest request)
        {
            var auction = await _auctionRepo.GetAuctionForUpdateAsync(auctionId);

            if (auction == null) return null;

            if (auction.UserId != userId) return null;

            if(auction.EndsAt <= DateTime.Now) return null;

            var hasBids = auction.Bids.Any();

            if (hasBids && request.StartingPrice != auction.StartingPrice) return null;

            if(request.EndsAt <= request.StartsAt) return null;

            auction.Title = request.Title;
            auction.Description = request.Description;
            auction.StartsAt = request.StartsAt;
            auction.EndsAt = request.EndsAt;

            if (!hasBids)
            {
                auction.StartingPrice = request.StartingPrice;
            }

            await _auctionRepo.SaveChangesAsync();

            return MapToAuctionResponse(auction);
                
        }

    }
}
