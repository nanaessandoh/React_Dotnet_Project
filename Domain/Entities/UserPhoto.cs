using System;

namespace Domain.Entities
{
    public class UserPhoto
    {
        public Guid Id { get; set; }
        public required string Url { get; set; }
        public required string PublicId { get; set; }
        public bool IsMain { get; set; }

        // Navigation properties
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
    }
}