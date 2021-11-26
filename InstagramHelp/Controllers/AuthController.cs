using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using InstagramApiSharp.API;
using InstagramApiSharp.API.Builder;
using InstagramApiSharp.Classes;
using InstagramHelp.Models.Account;
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

        public AuthController(IInstaApi instaApi)
        {
            _instaApi = instaApi;
        }

        [HttpGet("isAuthorized")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IsAuthorizedResp))]
        public IActionResult IsAuthorized() =>
            StatusCode(StatusCodes.Status200OK, _instaApi.IsUserAuthenticated);
        
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
    }
}