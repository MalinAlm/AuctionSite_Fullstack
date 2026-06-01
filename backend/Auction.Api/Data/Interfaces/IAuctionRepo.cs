
namespace Auction.Api.Data.Interfaces
{
    public interface IAuctionRepo
    {
        Task<List<Entities.Auction>> GetAuctionsAsync(bool showClosedAuctions);
        Task<Entities.Auction?> GetAuctionByIdAsync(string auctionId);
        Task AddAuctionAsync(Entities.Auction auction);
        Task<Entities.Auction?> GetAuctionForUpdateAsync(string auctionId);
        Task<List<Entities.Auction>> SearchAuctionsAsync(string title, bool showClosedAuctions);
        Task SaveChangesAsync();
    }
}
