using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Write
{
    public class Comment
    {
        public Comment()
        {
            IncludedProperties = new HashSet<string>();
        }

        private string _body = string.Empty;
        public required string Body
        {
            get => _body;
            set
            {
                _body = value;
                IncludedProperties.Add(nameof(Body));
            }
        }

        private Guid _activityId;
        public required Guid ActivityId
        {
            get => _activityId;
            set
            {
                _activityId = value;
                IncludedProperties.Add(nameof(ActivityId));
            }
        }
        public HashSet<string> IncludedProperties { get; set; }
    }
}