using Auction.Api.Data;
using Auction.Api.DTOs;
using Auction.Api.Entities;
using Auction.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auction.Api.Services
{
    public class BidService : IBidService
    {
        private readonly ApplicationDbContext _context;

        public BidService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CreateBidResponse> CreateBidAsync(string auctionId, string userId, CreateBidRequest request)
        {
            var auction = await _context.Auctions
                .Include(auction => auction.Bids)
                .FirstOrDefaultAsync(auction => auction.Id == auctionId);


            if (auction == null)
            {
                return new CreateBidResponse
                {
                    Success = false,
                    Message = "Auction was not found"
                };
            }

            if (auction.UserId == userId)
            {
                return new CreateBidResponse
                {
                    Success = false,
                    Message = "You cannot place a bid on your own auction"
                };
            }

            if (auction.EndsAt <= DateTime.Now)
            {
                return new CreateBidResponse
                {
                    Success = false,
                    Message = "You cannot place a bid on a closed auction"
                };
            }


            var highestBidAmount = auction.Bids.Any()
                ? auction.Bids.Max(bid => bid.Amount)
                : auction.StartingPrice;

            if (request.Amount <= highestBidAmount)
            {
                return new CreateBidResponse
                {
                    Success = false,
                    Message = $"Your bid must be higher than {highestBidAmount}"
                };
            }


            var bid = new Bid
            {
                Amount = request.Amount,
                AuctionId = auctionId,
                UserId = userId,
                CreatedAt = DateTime.Now

            };

            try
            {
                _context.Bids.Add(bid);
                await _context.SaveChangesAsync();

            }
            catch (Exception)
            {
                return new CreateBidResponse
                {
                    Success = false,
                    Message = "Something went wrong while saving the bid."
                };
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(user => user.Id == userId);

            return new CreateBidResponse
            {
                Success = true,
                Message = "Bid was created successfully.",

                Bid = new BidResponse
                {
                    Id = bid.Id,
                    Amount = bid.Amount,
                    CreatedAt = bid.CreatedAt,
                    UserId = bid.UserId,
                    UserName = user?.UserName ?? string.Empty
                   
                }
            };
        }
    }
}
