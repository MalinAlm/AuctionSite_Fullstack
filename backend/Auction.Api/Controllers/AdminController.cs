using Auction.Api.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Auction.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }


        [HttpGet]
        public IActionResult CheckAdmin()
        {
            return Ok(new { message = "You are logged in as admin" });
        }


        [HttpGet("users")]
        public async Task<IActionResult> GetUsers([FromQuery] bool showInactive = false)
        {
            var users = await _adminService.GetUsersAsync(showInactive);

            return Ok(users);
        }


        [HttpGet("auctions")]
        public async Task<IActionResult> GetAuctions([FromQuery] bool showInactive = false)
        {
            var auctions = await _adminService.GetAuctionsAsync(showInactive);

            return Ok(auctions);
        }


        [HttpPut("auctions/{auctionId}/deactivate")]
        public async Task<IActionResult> DeactivateAuction(string auctionId)
        {
            var success = await _adminService.SetAuctionActiveStatusAsync(auctionId, false);

            if (!success)
            {
                return NotFound("Auction was not found");
            }

            return Ok("Auction was deactivated");
        }


        [HttpPut("auctions/{auctionId}/activate")]
        public async Task<IActionResult> ActivateAuction(string auctionId)
        {
            var success = await _adminService.SetAuctionActiveStatusAsync(auctionId, true);

            if (!success)
            {
                return NotFound("Auction was not found");
            }

            return Ok("Auction was activated.");
        }


        [HttpPut("users/{userId}/deactivate")]
        public async Task<IActionResult> DeactivateUer(string userId)
        {
            var success = await _adminService.SetUserActiveStatusAsync(userId, false);

            if (!success)
            {
                return NotFound("User was not found.");
            }

            return Ok("User was deactivated.");
        }


        [HttpPut("users/{userId}/activate")]
        public async Task<IActionResult> ActivateUser(string userId)
        {
            var success = await _adminService.SetUserActiveStatusAsync(userId, true);

            if (!success)
            {
                return NotFound("User was not found");
            }

            return Ok("User was activated.");
        }


    }
}
