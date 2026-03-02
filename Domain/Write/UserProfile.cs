using System;
using System.Collections.Generic;

namespace Domain.Write
{
    public class UserProfile
    {
        public UserProfile()
        {
            IncludedProperties = new HashSet<string>();
        }

        private string _displayName = string.Empty;
        public required string DisplayName
        {
            get => _displayName;
            set
            {
                _displayName = value;
                IncludedProperties.Add(nameof(DisplayName));
            }
        }

        private string? _bio;
        public string? Bio
        {
            get => _bio;
            set
            {
                _bio = value;
                IncludedProperties.Add(nameof(Bio));
            }
        }

        public HashSet<string> IncludedProperties { get; set; }
    }
}