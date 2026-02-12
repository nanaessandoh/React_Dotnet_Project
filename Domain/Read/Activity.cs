using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Read
{
    public class Activity
    {
        [JsonPropertyName("activityId")]
        public required Guid Id { get; set; }
        public string? Title { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public bool IsCancelled { get; set; }
        public string? City { get; set; }
        public string? Venue { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Guid? HostUserId { get; set; }
        public string? HostDisplayName { get; set; }


        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();
    }
}