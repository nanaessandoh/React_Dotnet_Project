using Microsoft.AspNetCore.Identity;

namespace Identity.Models
{
    public class User : IdentityUser<Guid>
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? ImageUrl { get; set; }
    }
}