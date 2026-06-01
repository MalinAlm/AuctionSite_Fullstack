using Auction.Api.Data;
using Auction.Api.Entities;
using Auction.Api.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Auction.Api.DTOs;
using Auction.Api.Constants;

namespace Auction.Api.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserService(IConfiguration configuration, ApplicationDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _configuration = configuration;
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public string GenerateToken(User user)
        {
            List<Claim> claims  = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim(ClaimTypes.Role, user.Role));

            var secretKey = _configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("JWT key not found");

            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var signinCredentials = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signinCredentials);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);  

            return tokenString;
        }

        public async Task<User?> LoginAsync(DTOs.LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return null;
            }

            if (!user.IsActive)
            {
                return null;
            }

            var passwordResult = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password);

            if (passwordResult == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return user;
        }

        public async Task<User?> RegisterAsync(RegisterRequest request)
        {
            var emailExists = await _context.Users
                .AnyAsync(u => u.Email == request.Email);

            if (emailExists)
            {
                return null;
            }

            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                Role = UserRoles.User,
                IsActive = true
            };


            user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

            _context.Users.Add(user);  
            await _context.SaveChangesAsync();

            return user;
        }


        public async Task<bool> ChangePasswordAsync(string userId, ChangePasswordRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(user => user.Id == userId);

            if (user == null)
            {
                return false;
            }

            var passwordResult = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.CurrentPassword);

            if (passwordResult == PasswordVerificationResult.Failed)
            {
                return false;
            }

            user.PasswordHash = _passwordHasher.HashPassword(
                user,
                request.NewPassword);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
