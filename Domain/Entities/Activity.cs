using System;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Activity : IBaseEntity
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public DateTime Date { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public bool IsCancelled { get; set; }

        // Location details
        public required string City { get; set; }
        public required string Venue { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}