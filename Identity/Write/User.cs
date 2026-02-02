using System.ComponentModel.DataAnnotations;

namespace Identity.Write
{
    public class User
    {
        [Required]
        public string DisplayName { get; set; } = "";
        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
}