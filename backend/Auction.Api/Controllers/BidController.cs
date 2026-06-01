using Auction.Api.Core.Interfaces;
using Auction.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Auction.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidService _bidService;

        public BidController(IBidService bidService)
        {
            _bidService = bidService;
        }

        [Authorize]
        [HttpPost("auction/{auctionId}")]
        public async Task<IActionResult> CreateBid(
            string auctionId,
            CreateBidRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized("User could not be identified");
            }

            var result = await _bidService.CreateBidAsync(
                auctionId,
                userId,
                request
                );

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result);
        }


        [Authorize]
        [HttpDelete("auction/{auctionId}/latest")]
        public async Task<IActionResult> DeleteLatestBid(string auctionId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized("User could not be identified");
            }

            var result = await _bidService.DeleteLatestBidAsync(auctionId, userId);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result);
        }
    }
}
