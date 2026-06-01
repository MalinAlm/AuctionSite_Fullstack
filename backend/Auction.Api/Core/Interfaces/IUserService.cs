using Auction.Api.Data.Entities;
using Auction.Api.DTOs;

namespace Auction.Api.Core.Interfaces
{
    public interface IUserService
    {
        
        Task<User?> RegisterAsync(RegisterRequest request); 
        Task<User?> LoginAsync(LoginRequest request);

        Task<bool> ChangePasswordAsync(string userId, ChangePasswordRequest request);

        string GenerateToken(User user);
    }
}
