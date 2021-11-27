using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using InstagramApiSharp.API;
using InstagramApiSharp.Classes;
using InstagramHelp.Models.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InstagramHelp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public sealed class AuthController : ControllerBase
    {
        private readonly IInstaApi _instaApi;
        private const string Root = "wwwroot/";
        private const string PhotoFolderPath = "account/photos/";
        private const string PhotoExtension = ".png";

        public AuthController(IInstaApi instaApi)
        {
            _instaApi = instaApi;
        }

        [HttpGet("isAuthorized")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IsAuthorizedResp))]
        public IActionResult IsAuthorized() =>
            StatusCode(StatusCodes.Status200OK, new IsAuthorizedResp(_instaApi.IsUserAuthenticated, _instaApi.GetLoggedUser()?.UserName));

        [HttpGet("logOut")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> LogOut(CancellationToken cancellationToken)
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return new NoContentResult();
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoginResp))]
        [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(LoginResp))]
        public async Task<IActionResult> Login(LoginReq req, CancellationToken cancellationToken)
        {
            _instaApi.SetUser(
                new UserSessionData()
                {
                    UserName = req.UserName,
                    Password = req.Password
                });
            
            var loginResult = await _instaApi.LoginAsync();
            if (!loginResult.Succeeded)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new LoginResp(loginResult.Info.Message));
            }

            await DownloadPhotoAsync();

            var auth =  await _instaApi.GetStateDataAsStringAsync();
            
            var claims = new List<Claim> 
            {
                new (ClaimTypes.UserData,auth)
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                principal, new AuthenticationProperties { IsPersistent = true });

            return StatusCode(StatusCodes.Status200OK, new LoginResp(loginResult.Info.Message));
        }

        private async Task DownloadPhotoAsync()
        {
            var result = await _instaApi.GetCurrentUserAsync();
            var path = $"{PhotoFolderPath}{result.Value.UserName}{PhotoExtension}";
            
            var httpClient = new HttpClient(); 
            var fileResponse = await httpClient.GetAsync(result.Value.ProfilePicture);
            byte[] bytes = await fileResponse.Content.ReadAsByteArrayAsync();

            if (!Directory.Exists(Path.Combine(Root, PhotoFolderPath)))
            {
                Directory.CreateDirectory(Path.Combine(Root, PhotoFolderPath));
            }
            
            await System.IO.File.WriteAllBytesAsync($"{Root}{path}", bytes);
        }
    }
}