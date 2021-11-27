using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using InstagramApiSharp;
using InstagramApiSharp.API;
using InstagramHelp.Models.Account;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InstagramHelp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public sealed class AccountController : ControllerBase
    {
        private readonly IInstaApi _instaApi;
        private const string Root = "wwwroot/";
        private const string PhotoFolderPath = "account/photos/";
        private const string PhotoExtension = ".png";

        public AccountController(IInstaApi instaApi)
        {
            _instaApi = instaApi;
        }
        
        [HttpGet("userData")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserData))]
        public async Task<IActionResult> UserData(CancellationToken cancellationToken)
        {
            var currentUser = await _instaApi.GetCurrentUserAsync();
            var followers = await _instaApi.UserProcessor.GetUserFollowersAsync(currentUser.Value.UserName, PaginationParameters.Empty);
            var following = await _instaApi.UserProcessor.GetUserFollowingAsync(currentUser.Value.UserName, PaginationParameters.Empty);
            var userMedia = await _instaApi.UserProcessor.GetUserMediaAsync(currentUser.Value.UserName, PaginationParameters.MaxPagesToLoad(5));

            
            return StatusCode(StatusCodes.Status200OK, new UserData(
                currentUser.Value.UserName,
                currentUser.Value.FullName,
                userMedia.Value.Count,
                followers.Value.Count,
                following.Value.Count));
        }
    }
}