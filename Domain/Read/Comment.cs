using System;
using System.Text.Json.Serialization;

namespace Domain.Read
{
    public class Comment
    {
        [JsonPropertyName("commentId")]
        public required Guid Id { get; set; }
        public required string Body { get; set; }
        public DateTime CreatedTimestamp { get; set; }
        public required Guid UserId { get; set; }
        public required string DisplayName { get; set; }
        public required Guid ActivityId { get; set; }
        public string? ImageUrl { get; set; }
    }
}