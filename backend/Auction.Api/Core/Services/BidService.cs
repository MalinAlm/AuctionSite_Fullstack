using Auction.Api.Core.Interfaces;
using Auction.Api.Data.Interfaces;
using Auction.Api.DTOs;
using Auction.Api.Data.Entities;

namespace Auction.Api.Core.Services
{
    public class BidService : IBidService
    {
        private readonly IBidRepo _bidRepo;

        public BidService(IBidRepo bidRepo)
        {
            _bidRepo = bidRepo;
        }


        public async Task<BidActionResponse> CreateBidAsync(string auctionId, string userId, CreateBidRequest request)
        {
            var auction = await _bidRepo.GetAuctionWithBidsAsync(auctionId);


            if (auction == null)
            {
                return new BidActionResponse
                {
                    Success = false,
                    Message = "Auction was not found"
                };
            }

            if (auction.UserId == userId)
            {
                return new BidActionResponse
                {
                    Success = false,
                    Message = "You cannot place a bid on your own auction"
                };
            }

            if (auction.EndsAt <= DateTime.Now)
            {
                return new BidActionResponse
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
                return new BidActionResponse
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
                await _bidRepo.AddBidAsync(bid);

            }
            catch (Exception)
            {
                return new BidActionResponse
                {
                    Success = false,
                    Message = "Something went wrong while saving the bid."
                };
            }

            var user = await _bidRepo.GetUserByIdAsync(userId);

            return new BidActionResponse
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


        public async Task<BidActionResponse> DeleteLatestBidAsync(
            string auctionId,
            string userId)
        {
            var auction = await _bidRepo.GetAuctionForBidDeletionAsync(auctionId);

            if (auction == null)
            {
                return new BidActionResponse
                {
                    Success = false,
                    Message = "Auction was not found."
                };
            }

            if (auction.EndsAt <= DateTime.Now)
            {
                return new BidActionResponse
                {
                    Success = false,
                    Message = "You cannot delete a bid from a closed auction."
                };
            }

            var latestBid = auction.Bids
                .OrderByDescending(bid => bid.CreatedAt)
                .FirstOrDefault();

            if (latestBid == null)
            {
                return new BidActionResponse
                {
                    Success = false,
                    Message = "There are no bids to delete."
                };
            }


            if (latestBid.UserId != userId)
            {
                return new BidActionResponse
                {
                    Success = false,
                    Message = "You can only delete your own latest bid."
                };
            }

            await _bidRepo.DeleteBidAsync(latestBid);

            return new BidActionResponse
            {
                Success = true,
                Message = "Bid was deleted successfully"
            };
        }
    }
}
