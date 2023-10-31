using TwitterClone_backend_.Models;

namespace TwitterClone_backend_.ViewModel
{
    public class TweetViewModel
    {
        public int? Id { get; set; }
        public string? Content { get; set; }

        public int? Likes { get; set; }

        public int UserId { get; set; }
    }
}
