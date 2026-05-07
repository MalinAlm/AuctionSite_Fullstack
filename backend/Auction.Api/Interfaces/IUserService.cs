using Auction.Api.DTOs;
using Auction.Api.Entities;

namespace Auction.Api.Interfaces
{
    public interface IUserService
    {
        
        Task<User?> RegisterAsync(RegisterRequest request); 
        Task<User?> LoginAsync(LoginRequest request);

        string GenerateToken(User user);
    }
}
