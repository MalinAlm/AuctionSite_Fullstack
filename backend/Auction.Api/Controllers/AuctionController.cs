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
    public class AuctionController : ControllerBase
    {

        private readonly IAuctionService _auctionService;

        public AuctionController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAuctions(
            [FromQuery] bool showClosedAuctions = false)
        {
            var auctions = await _auctionService.GetAuctionsAsync(showClosedAuctions);

            return Ok(auctions);
        }


        [HttpGet("{auctionId}")]
        public async Task<IActionResult> GetAuctionById(string auctionId)
        {
            var auction = await _auctionService.GetAuctionByIdAsync(auctionId);

            if (auction == null)
            {
                return NotFound("Auction was not found.");
            }

            return Ok(auction);
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateAuction(CreateAuctionRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized("User could not be identified.");
            }

            var createdAuction = await _auctionService.CreateAuctionAsync(request, userId);

            if (createdAuction == null)
            {
                return BadRequest("Auction could not be created.");
            }

            return CreatedAtAction(
                nameof(GetAuctionById),
                new { auctionId = createdAuction.Id },
                createdAuction
                );
        }


        [HttpGet("search")]
        public async Task<IActionResult> SearchAuctions(
            [FromQuery] string title,
            [FromQuery] bool showClosedAuctions = false)
        {
            var auctions = await _auctionService.SearchAuctionsAsync(
                title, showClosedAuctions);

            return Ok(auctions);
        }


        [Authorize]
        [HttpPut("{auctionId}")]
        public async Task<IActionResult> UpdateAuction(
            string auctionId,
            UpdateAuctionRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized("User could not be identified");
            }

            var updatedAuction = await _auctionService.UpdateAuctionAsync(
                auctionId,
                userId,
                request);

            if (updatedAuction == null)
            {
                return BadRequest("Auction could not be updated");
            }

            return Ok(updatedAuction);
        }
    }
}
