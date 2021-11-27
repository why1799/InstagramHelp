using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using InstagramApiSharp.API;
using InstagramApiSharp.Classes.Models;

namespace InstagramHelp.Services
{
    public static class FileSaverService
    {
        private const string Root = "wwwroot/";
        private const string PhotoFolderPath = "account/photos/";
        private const string PhotoExtension = ".png";
        
        public static async Task DownloadPhotoAsync(InstaUserShort user)
        {
            var path = $"{PhotoFolderPath}{user.UserName}{PhotoExtension}";
            
            var httpClient = new HttpClient(); 
            var fileResponse = await httpClient.GetAsync(user.ProfilePicture);
            byte[] bytes = await fileResponse.Content.ReadAsByteArrayAsync();

            if (!Directory.Exists(Path.Combine(Root, PhotoFolderPath)))
            {
                Directory.CreateDirectory(Path.Combine(Root, PhotoFolderPath));
            }
            
            await System.IO.File.WriteAllBytesAsync($"{Root}{path}", bytes);
        }
    }
}