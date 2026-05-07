using Auction.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Auction.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Entities.Auction> Auctions { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

    }
}
