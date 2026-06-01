namespace Auction.Api.Data.Interfaces
{
    public interface IUserRepo
    {
        Task<Entities.User?> GetUserByEmailAsync(string email);
        Task<bool> EmailExistsAsync(string email);
        Task AddUserAsync(Entities.User user);
        Task<Entities.User?> GetUserByIdAsync(string userId);
        Task SaveChangesAsync();
    }
}
