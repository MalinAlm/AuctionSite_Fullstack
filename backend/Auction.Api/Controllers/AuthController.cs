using Auction.Api.DTOs;
using Auction.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

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

     }
}
