using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Auction.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAuctionIsActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Auctions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Auctions");
        }
    }
}
