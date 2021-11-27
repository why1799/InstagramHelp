namespace InstagramHelp.Models.Account
{
    public sealed record UserData(
        string UserName,
        string FullName,
        int UserMediaAmount,
        int FollowersAmount,
        int FollowingAmount);
}