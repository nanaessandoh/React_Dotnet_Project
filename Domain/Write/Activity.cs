using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Write
{
    public class Activity : IBaseWrite
    {
        public Activity()
        {
            IncludedProperties = new HashSet<string>();
        }

        private Guid _id;
        [JsonPropertyName("activityId")]
        public Guid Id
        {
            get => _id;
            set
            {
                _id = value;
                IncludedProperties.Add(nameof(Id));
            }
        }

        private string? _title;
        public string? Title
        {
            get => _title;
            set
            {
                _title = value;
                IncludedProperties.Add(nameof(Title));
            }
        }

        private DateTime _date;
        public DateTime Date
        {
            get => _date;
            set
            {
                _date = value;
                IncludedProperties.Add(nameof(Date));
            }
        }

        private string? _description;
        public string? Description
        {
            get => _description;
            set
            {
                _description = value;
                IncludedProperties.Add(nameof(Description));
            }
        }

        private string? _category;
        public string? Category
        {
            get => _category;
            set
            {
                _category = value;
                IncludedProperties.Add(nameof(Category));
            }
        }

        private bool _isCancelled;
        public bool IsCancelled
        {
            get => _isCancelled;
            set
            {
                _isCancelled = value;
                IncludedProperties.Add(nameof(IsCancelled));
            }
        }

        private string? _city;
        public string? City
        {
            get => _city;
            set
            {
                _city = value;
                IncludedProperties.Add(nameof(City));
            }
        }

        private string? _venue;
        public string? Venue
        {
            get => _venue;
            set
            {
                _venue = value;
                IncludedProperties.Add(nameof(Venue));
            }
        }

        private double _latitude;
        public double Latitude
        {
            get => _latitude;
            set
            {
                _latitude = value;
                IncludedProperties.Add(nameof(Latitude));
            }
        }

        private double _longitude;
        public double Longitude
        {
            get => _longitude;
            set
            {
                _longitude = value;
                IncludedProperties.Add(nameof(Longitude));
            }
        }

        public HashSet<string> IncludedProperties { get; set; }
    }
}