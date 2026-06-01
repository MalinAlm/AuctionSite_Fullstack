namespace Auction.Api.Data.Interfaces
{
    public interface IBidRepo
    {
        Task<Entities.Auction?> GetAuctionWithBidsAsync(string auctionId);
        Task AddBidAsync(Entities.Bid bid);
        Task<Entities.User?> GetUserByIdAsync(string userId);
        Task<Entities.Auction?> GetAuctionForBidDeletionAsync(string auctionId);
        Task DeleteBidAsync(Entities.Bid bid);
    }
}
