namespace TwitterClone_backend_.Models
{
    public class Tweet
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Likes { get; set; } = 0;
        public int UserId { get; set; }
    }
}
