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
        [HttpGet]

        public IActionResult CheckAdmin()
        {
            return Ok(new { message = "logged in as Admin" });
        }
    }
}
