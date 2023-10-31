using System;
using System.Collections.Generic;

namespace TwitterClone_backend_.Context;

public partial class Tweet
{
    public int Id { get; set; }

    public string? Content { get; set; }

    public int? Likes { get; set; }

    public int UserId { get; set; }

    public string? CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
