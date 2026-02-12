using System;

namespace Domain.Read
{
    public class ActivityAttendee
    {
        public required Guid UserId { get; set; }
        public required string DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? ImageUrl { get; set; }
    }
}