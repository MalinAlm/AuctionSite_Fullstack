using Auction.Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Auction.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Entities.Auction> Auctions { get; set; }
        public DbSet<Bid> Bids { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Bid>()
                .HasOne(bid => bid.Auction)
                .WithMany(auction => auction.Bids)
                .HasForeignKey(bid => bid.AuctionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Bid>()
                .HasOne(bid => bid.User)
                .WithMany(user => user.Bids)
                .HasForeignKey(bid => bid.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
