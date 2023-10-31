namespace TwitterClone_backend_.ViewModel
{
    public class UserViewModel
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; } = null!;

        public string? LastName { get; set; } = null!;

        public string? Dob { get; set; } = null!;

        public string? Email { get; set; } = null!;

        public string? Password { get; set; } = null!;

        public string? UserName { get; set; } = null!;

        public byte[]? Image { get; set; } = null!;
    }
}
