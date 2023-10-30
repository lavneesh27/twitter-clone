namespace TwitterClone_backend_.Models.DataAccess
{
    public interface IAppDbContext
    {

        List<Tweet> GetTweets();

        Tweet GetTweet(int id);
        bool RemoveTweet(int id);
        bool UpdateTweet(int id);
        bool InsertUser(User user);
        bool UploadTweet(Tweet tweet);
        bool UpdateUser(User user);

        bool LikeTweet(int id);
        User GetUser(int id);
        string IsUserPresent(string email, string password);
        

    }
}
