using Auction.Api.Data.Interfaces;
using Auction.Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Auction.Api.Data.Repos
{
    public class UserRepo: IUserRepo
    {
        private readonly ApplicationDbContext _context;

        public UserRepo(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(user => user.Email == email);
        }


        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users
                .AnyAsync(user => user.Email == email);
        }


        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }


        public async Task<User?> GetUserByIdAsync(string userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(user => user.Id == userId);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
