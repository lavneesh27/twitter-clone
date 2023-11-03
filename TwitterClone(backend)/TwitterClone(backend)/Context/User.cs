using System;
using System.Collections.Generic;

namespace TwitterClone_backend_.Context;

public partial class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Dob { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public byte[]? Image { get; set; }

    public virtual ICollection<Tweet> Tweets { get; set; } = new List<Tweet>();
}
