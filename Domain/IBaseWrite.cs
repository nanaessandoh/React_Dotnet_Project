using System.Collections.Generic;

namespace Domain
{
    public interface IBaseWrite
    {
        public HashSet<string> IncludedProperties { get; set; }
    }
}