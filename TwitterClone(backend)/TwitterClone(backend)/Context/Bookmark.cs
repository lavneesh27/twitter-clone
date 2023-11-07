using System;
using System.Collections.Generic;

namespace TwitterClone_backend_.Context;

public partial class Bookmark
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int TweetId { get; set; }
}
