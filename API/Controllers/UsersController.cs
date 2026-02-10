using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UsersController : BaseApiController<UsersController>
    {
        private readonly SignInManager<Identity.Models.User> _signInManager;
        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger, IMediator mediator, SignInManager<Identity.Models.User> signInManager)
        : base(logger, mediator)
        {
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] Identity.Write.User user)
        {
            return await TryAsync(async () =>
            {
                var newUser = new Identity.Models.User
                {
                    DisplayName = user.DisplayName,
                    Email = user.Email,
                    UserName = user.Email
                };

                var result = await _signInManager.UserManager.CreateAsync(newUser, user.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");
                    return Ok();
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            });
        }

        [HttpGet("user-info")]
        public async Task<IActionResult> GetUserInfo()
        {
            return await TryAsync(async () =>
            {
                if (User.Identity?.IsAuthenticated == false)
                {
                    return NoContent();
                }

                var user = await _signInManager.UserManager.GetUserAsync(User);
                if (user == null)
                {
                    return Unauthorized();
                }

                return Ok(new
                {
                    user.DisplayName,
                    user.Email,
                    user.UserName,
                    user.Id,
                    user.ImageUrl
                });
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return NoContent();
        }
    }
}