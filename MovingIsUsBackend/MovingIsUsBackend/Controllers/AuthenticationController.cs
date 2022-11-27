using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using static OpenIddict.Abstractions.OpenIddictConstants;
using System.Security.Claims;
using Database;
using Microsoft.EntityFrameworkCore;
using Models;
using Utils;

namespace MovingIsUsBackend.Controllers
{
    public class AuthenticationController : ControllerBase
    {
        private readonly IOpenIddictApplicationManager _applicationManager;
        private readonly AuthenticationContext _context;
        public AuthenticationController(IOpenIddictApplicationManager applicationManager, AuthenticationContext context)
        {
            _applicationManager = applicationManager;
            _context = context;
        }

        [HttpPost("~/connect/token"), Produces("application/json")]
        public async Task<IActionResult> Exchange()
        {
            var request = HttpContext.GetOpenIddictServerRequest();
            if (request == null || request.Username == null || request.Password == null)
            {
                return Problem("Invalid user");
            }
            string username = request.Username;
            string password = PasswordHasher.CreateMD5Hash(request.Password);
            User? user = await _context.Users.FirstOrDefaultAsync
                (u => u.Name == username && u.Password == password);

            if (user == null)
            {
                return Problem("User is not found");
            }

            var identity = new ClaimsIdentity(TokenValidationParameters.DefaultAuthenticationType, Claims.Name, Claims.Role);
            identity.AddClaim
            (
                Claims.Subject,
                request.Username,
                Destinations.AccessToken, Destinations.IdentityToken
            );
            identity.AddClaim
             (
                 Claims.Role,
                 "Writer",
                 Destinations.AccessToken, Destinations.IdentityToken
             );
            identity.AddClaim(
                Claims.Name,
                request.Username,
                Destinations.AccessToken, Destinations.IdentityToken
            );

            return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }
    }
}
