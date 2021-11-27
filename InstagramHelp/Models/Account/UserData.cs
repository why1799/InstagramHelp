namespace InstagramHelp.Models.Account
{
    public sealed record UserData(
        string UserName,
        string FullName,
        long UserMediaAmount,
        long FollowersAmount,
        long FollowingAmount);
}