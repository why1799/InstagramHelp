using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Schema;
using InstagramApiSharp;
using InstagramApiSharp.API;
using InstagramHelp.Models.Account;
using InstagramHelp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
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

        public AccountController(IInstaApi instaApi)
        {
            _instaApi = instaApi;
        }
        
        [HttpGet("userData")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserData))]
        public async Task<IActionResult> UserData(CancellationToken cancellationToken)
        {
            var currentUser = await _instaApi.GetCurrentUserAsync();
            var info = await _instaApi.UserProcessor.GetUserInfoByUsernameAsync(currentUser.Value.UserName);
            
            return StatusCode(StatusCodes.Status200OK, new UserData(
                currentUser.Value.UserName,
                currentUser.Value.FullName,
                info.Value.MediaCount,
                info.Value.FollowerCount,
                info.Value.FollowingCount));
        }
        
        [HttpGet("getNonMutualSubscriptions")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetNonMutualSubscriptionsResp[]))]
        public async Task<IActionResult> GetNonMutualSubscriptions(CancellationToken cancellationToken)
        {
            var currentUser = await _instaApi.GetCurrentUserAsync();
            var followers = await _instaApi.UserProcessor.GetUserFollowersAsync(currentUser.Value.UserName, PaginationParameters.Empty);
            var following = await _instaApi.UserProcessor.GetUserFollowingAsync(currentUser.Value.UserName, PaginationParameters.Empty);


            var users = following.Value
                .Where(x => !followers.Value.Select(f => f.UserName).Contains(x.UserName))
                .ToArray();

            await Task.WhenAll(users.Select(FileSaverService.DownloadPhotoAsync).ToArray());

            return StatusCode(StatusCodes.Status200OK, users.Select(x => new GetNonMutualSubscriptionsResp(x.Pk, x.UserName, x.FullName)).ToArray());
        }
        
        [HttpPost("unSubscribeFromUser")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UnSubscribeFromUser(UnSubscribeFromUserReq request, CancellationToken cancellationToken)
        {
            await _instaApi.UserProcessor.UnFollowUserAsync(request.UserId);
            return NoContent();
        }
        
        [HttpPost("subscribeOnUser")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> SubscribeOnUser(SubscribeOnUserReq request, CancellationToken cancellationToken)
        {
            await _instaApi.UserProcessor.FollowUserAsync(request.UserId);
            return NoContent();
        }
    }
}