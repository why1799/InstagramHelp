using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using InstagramApiSharp.API;
using Microsoft.AspNetCore.Mvc.Filters;

namespace InstagramHelp.Filters
{
    public sealed class CookieFilter : IAsyncResourceFilter
    {
        private readonly IInstaApi _instaApi;
        
        public CookieFilter(IInstaApi instaApi)
        {
            _instaApi = instaApi;
        }

        public async Task OnResourceExecutionAsync(ResourceExecutingContext context, ResourceExecutionDelegate next)
        {
            var claim = context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.UserData);

            if (claim != null)
            {
                await _instaApi.LoadStateDataFromStringAsync(claim.Value);
            }

            await next();
        }
    }
}