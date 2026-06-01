using Auction.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Auction.Api.Core.Interfaces;

namespace Auction.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var user = await _userService.RegisterAsync(request);

            if (user == null)
            {
                return BadRequest("Email is already registered.");

            }

            var response = new UserResponseDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role,
            };

            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await  _userService.LoginAsync(request);

            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            var token = _userService.GenerateToken(user);

            return Ok(new { token });
        }


        [Authorize]
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized("User could not be identified.");
            }

            var success = await _userService.ChangePasswordAsync(userId, request);

            if (!success)
            {
                return BadRequest("Password could not be changed. Check your current password");
            }

            return Ok("Password was changed successfully");
        }

     }
}
