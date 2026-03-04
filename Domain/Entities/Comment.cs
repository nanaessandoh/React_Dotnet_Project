using System;

namespace Domain.Entities
{
    public class Comment
    {
        public Guid Id { get; set; }
        public required string Body { get; set; }
        public DateTime CreatedTimestamp { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public required Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public required Guid ActivityId { get; set; }
        public Activity Activity { get; set; } = null!;
    }
}