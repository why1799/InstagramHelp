using System.Threading;
using System.Threading.Tasks;
using InstagramHelp.Models.Account;
using Microsoft.AspNetCore.Mvc;

namespace InstagramHelp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public sealed class AccountController : ControllerBase
    {
        [HttpPost("login")]
        public async Task<LoginResp> Login(LoginReq req, CancellationToken cancellationToken)
        {
            await Task.Delay(5000);
            return new LoginResp();
        }
    }
}